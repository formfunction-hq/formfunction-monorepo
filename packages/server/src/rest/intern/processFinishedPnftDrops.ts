import pLimit from "p-limit";
import { Nft, NftListing, NftMetadata, User } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import { Request } from "express";
import groupBy from "formfn-shared/dist/utils/array/groupBy";
import getGumdropConfigAuthority from "src/utils/keypairs/getGumdropConfigAuthority";
import getPrisma from "src/utils/prisma/getPrisma";
import loadGumdropSdk from "src/utils/solana/loadGumdropSdk";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import isPnftDropExpired from "formfn-shared/dist/utils/isPnftDropExpired";
import getPnftDropTimes from "src/utils/getPnftDropTimes";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import invariant from "tiny-invariant";
import SlackWebhook from "src/types/enums/SlackWebhook";
import sendSlackNotification from "src/utils/tooling/sendSlackNotification";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import createPnftDropClosedNotification from "src/utils/notifications/create/createPnftDropClosedNotification";
import getErrorPropertiesToLog from "formfn-shared/dist/utils/analytics/getErrorPropertiesToLog";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import { findDistributorPda } from "@formfunction-hq/formfunction-gumdrop";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";

const limit = pLimit(3);

async function isDropExpired(startTime: Date) {
  const dropTimes = await getPnftDropTimes();
  return isPnftDropExpired(startTime, dropTimes.dropDuration);
}

type DropInfo = { auctionMint: Maybe<string>; isDropActive: boolean };

/**
 * There are some race conditions which may occur here if this runs before
 * either the AuctionWon or Sold transactions exist for an auction, but
 * after the auction has ended.
 *
 * To deal with this we check for both transaction types, and if neither are
 * found just return a DropInfo which is consistent with the current NFT
 * isPnftDropActive field. This avoids prematurely closing drops.
 */
async function getPnftDropInfo(
  nft: Nft & {
    NftListing: Maybe<
      NftListing & {
        Nft_NftToNftListing_pnftIdForAuction: Maybe<
          Nft & {
            Creator: User;
          }
        >;
      }
    >;
  }
): Promise<DropInfo> {
  const prisma = getPrisma();

  const auctionWonTx = await prisma.nftTransaction.findFirst({
    where: {
      Nft: { mint: nft.mint },
      auctionCount: 0,
      type: NftTransactionTypeExpress_Enum.AuctionWon,
    },
  });

  if (auctionWonTx != null) {
    const isExpired = await isDropExpired(auctionWonTx.timeCreated);
    return {
      auctionMint: nft.mint,
      isDropActive: !isExpired,
    };
  }

  const soldTx = await prisma.nftTransaction.findFirst({
    where: {
      Nft: { mint: nft.mint },
      auctionCount: 0,
      type: NftTransactionTypeExpress_Enum.Sold,
    },
  });

  if (soldTx != null) {
    const isExpired = await isDropExpired(soldTx.timeCreated);
    return {
      auctionMint: nft.mint,
      isDropActive: !isExpired,
    };
  }

  return {
    auctionMint: nft.mint,
    isDropActive: nft.NftListing?.isPnftDropActive === true,
  };
}

async function updateIsPnftDropActive(
  req: Maybe<Request>,
  dropsToClose: Array<DropInfo>
) {
  const prisma = getPrisma();

  await Promise.all(
    dropsToClose.map(async ({ auctionMint, isDropActive }) => {
      if (auctionMint != null && isDropActive === false) {
        await prisma.nftListing.update({
          data: {
            isPnftDropActive: false,
          },
          where: { nftId: auctionMint },
        });
      }
    })
  );
}

async function emailCreatorWhenDropIsClosed({
  creatorId,
  pnftId,
}: {
  creatorId: string;
  pnftId: string;
}) {
  const prisma = getPrisma();

  const [user, pnft] = await Promise.all([
    prisma.user.findUnique({ where: { id: creatorId } }),
    prisma.nft.findUnique({
      include: {
        NftMetadata: true,
        Owner: true,
      },
      where: { id: pnftId },
    }),
  ]);

  if (pnft != null && user != null && user.email != null) {
    await createPnftDropClosedNotification(
      {
        pnftMint: pnft.mint,
      },
      user.id
    );
  }
}

async function sendPnftDropClosedSlackAlert(
  pnft: Nft & {
    Creator: User;
    NftMetadata: NftMetadata;
  }
) {
  const content =
    `The drop for participation NFT #${pnft.NftMetadata.name} has been` +
    ` closed and the master edition mint has been returned to ${pnft.Creator.username}.` +
    ` View it here: ${getNftLinkRelative(
      pnft.Creator.username,
      pnft.mint,
      pnft.NftMetadata.assetWidth,
      pnft.NftMetadata.assetHeight
    )}`;

  await sendSlackNotification(SlackWebhook.PnftAlertChannel, content);
}

type HandleCloseDistributorArgs = {
  creatorId: string;
  pnftId: string;
};

async function handleCloseDistributor({
  pnftId,
  creatorId,
}: HandleCloseDistributorArgs) {
  const gumdropSdk = loadGumdropSdk();
  const gumdropConfigAuthority = getGumdropConfigAuthority();
  const mint = new PublicKey(pnftId);

  const creatorPublicKey = new PublicKey(creatorId);
  const transaction = await gumdropSdk.closeDistributorTx({
    configAuthority: gumdropConfigAuthority.publicKey,
    configCreatorAuthority: gumdropSdk.gumdropConfigCreator,
    creatorAuthority: creatorPublicKey,
    mint,
    rentReceiver: creatorPublicKey,
    tokenReceiver: creatorPublicKey,
    wallet: gumdropConfigAuthority.publicKey,
  });

  try {
    return await ConnectionWrapper.sendAndConfirmTransaction(transaction, [
      gumdropConfigAuthority,
    ]);
  } catch (err) {
    const [distributor] = findDistributorPda(
      mint,
      creatorPublicKey,
      gumdropSdk.programId
    );
    const distributorAccount = await ConnectionWrapper.getAccountInfo(
      distributor
    );
    // If it doesn't exist we assume it was closed in a previous transaction.
    if (distributorAccount == null) {
      const signatures =
        await ConnectionWrapper.getConfirmedSignaturesForAddress2(distributor, {
          limit: 5,
        });

      // Assume the most recent signature is the close transaction.
      const txid = signatures[0].signature;

      await logError(AnalyticsEvent.UpdatePnftDropFail, err as any, undefined, {
        customErrorRecovery: true,
        distributor,
        signatures,
        txid,
      });

      return txid;
    }

    throw err;
  }
}

type CloseDistributorResult = HandleCloseDistributorArgs & {
  err?: any;
  txid?: string;
};

export default async function processFinishedPnftDrops(
  req: Maybe<Request>
): Promise<Array<Maybe<CloseDistributorResult>>> {
  const prisma = getPrisma();

  const nftsWithActivePnftDrops = await prisma.nft.findMany({
    include: {
      NftListing: {
        include: {
          Nft_NftToNftListing_pnftIdForAuction: {
            include: {
              ...CONVERT_NFT_TO_METADATA_INCLUDE,
              Creator: true,
            },
          },
        },
      },
    },
    where: {
      NftListing: { isPnftDropActive: true },
    },
  });

  const groupedByPnft = groupBy(
    nftsWithActivePnftDrops,
    (nft) => nft.NftListing!.pnftIdForAuction
  );

  return Promise.all(
    Object.entries(groupedByPnft).map(async ([pnftId, auctionNfts]) =>
      limit(async () => {
        const dropInfo = await Promise.all(
          auctionNfts.map(async (auctionNft) => getPnftDropInfo(auctionNft))
        );

        // If any drop is still active the distributor should not be closed yet.
        if (dropInfo.some((drop) => drop.isDropActive)) {
          return null;
        }

        const pnft =
          auctionNfts[0].NftListing?.Nft_NftToNftListing_pnftIdForAuction;
        invariant(pnft != null);

        const creatorId = pnft.Creator.id;
        try {
          const txid = await handleCloseDistributor({ creatorId, pnftId });

          await updateIsPnftDropActive(req, dropInfo);

          await emailCreatorWhenDropIsClosed({ creatorId, pnftId });
          await sendPnftDropClosedSlackAlert(pnft);

          return { creatorId, pnftId, txid };
        } catch (err) {
          return {
            creatorId,
            err: getErrorPropertiesToLog(err as Error),
            pnftId,
          };
        }
      })
    )
  );
}
