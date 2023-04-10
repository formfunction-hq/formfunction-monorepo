import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import pLimit from "p-limit";
import { Airdrop, Nft, User } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import getTransferTxidForAirdrop from "src/utils/airdrop/getTransferTxidForAirdrop";
import insertAirdroppedNftAndNotify, {
  getMintTxid,
} from "src/utils/airdrop/insertAirdroppedNftAndNotify";
import invariant from "tiny-invariant";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import toObject from "formfn-shared/dist/utils/toObject";
import {
  CurrencyNameExpress_Enum,
  InsertNftTransactionInput,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import insertNftTransaction from "src/utils/transaction/insertNftTransaction";
import createAirdropGiftReceivedNotification from "src/utils/notifications/create/createAirdropGiftReceivedNotification";
import getErrorPropertiesToLog from "formfn-shared/dist/utils/analytics/getErrorPropertiesToLog";
import dayjs from "src/utils/dates/dayjsex";

const limit = pLimit(5);

type CheckAirdropStatus = "error" | "processed";

async function retryAirdrop(
  req: Request,
  airdrop: Airdrop & { ToUser: User },
  masterEditionNft: Nft
) {
  const standardEditionMintKey = new PublicKey(airdrop.standardEditionMintRaw!);
  const transferTxid = await getTransferTxidForAirdrop(
    req,
    airdrop,
    standardEditionMintKey,
    false // shouldLog = false, caller will log exception
  );

  await insertAirdroppedNftAndNotify(
    req,
    masterEditionNft,
    new PublicKey(masterEditionNft.mint),
    standardEditionMintKey,
    airdrop
  );

  return transferTxid;
}

async function checkAirdrop(
  req: Request,
  airdrop: Airdrop & { MasterEditionNft: Nft; ToUser: User }
): Promise<{
  airdrop: Airdrop & { MasterEditionNft: Nft; ToUser: User };
  error: any;
  status: CheckAirdropStatus;
}> {
  invariant(
    airdrop.standardEditionMint == null &&
      airdrop.standardEditionMintRaw != null
  );

  const prisma = getPrisma();
  const standardEditionNft = await prisma.nft.findUnique({
    where: { id: airdrop.standardEditionMintRaw },
  });

  if (standardEditionNft == null) {
    // If the standard edition NFT does not exist in the DB, the airdrop
    // may have failed for some reason so we retry
    try {
      await retryAirdrop(req, airdrop, airdrop.MasterEditionNft);
    } catch (e: any) {
      return {
        airdrop,
        error: getErrorPropertiesToLog(e),
        status: "error",
      };
    }

    return { airdrop, error: null, status: "processed" };
  }

  // Otherwise, the standard edition NFT is in the DB and has successfully been
  // airdropped so we simply backfill the airdrop object
  const mintedTx = await prisma.nftTransaction.findFirst({
    where: {
      NftTransactionType: { value: NftTransactionTypeExpress_Enum.Minted },
      mint: standardEditionNft.id,
    },
  });
  if (mintedTx == null) {
    // We had some legacy cases where the standard edition NFT was inserted
    // but the minted tx was not inserted due to `insertNftTransaction` not
    // being fully atomic.

    // TODO[@bryancho]: remove after backfilling these legacy cases and making
    // insertNftTransaction fully atomic
    const mintTxid = await getMintTxid(new PublicKey(standardEditionNft.mint));
    const insertMintedNftTransactionInput: InsertNftTransactionInput = {
      creatorId: standardEditionNft.creatorId,
      currencyName: CurrencyNameExpress_Enum.Solana,
      fromUserId: standardEditionNft.creatorId,
      mint: standardEditionNft.mint,
      toUserId: airdrop.ToUser.id,
      txid: mintTxid!,
      type: NftTransactionTypeExpress_Enum.Minted,
    };

    try {
      await insertNftTransaction(req, insertMintedNftTransactionInput);
      await createAirdropGiftReceivedNotification(
        { airdropId: airdrop.id },
        airdrop.ToUser.id,
        airdrop.fromAddress
      );
    } catch (e: any) {
      return {
        airdrop,
        error: getErrorPropertiesToLog(e),
        status: "error",
      };
    }
  }
  await prisma.airdrop.update({
    data: {
      standardEditionMint: standardEditionNft.id,
    },
    where: { id: airdrop.id },
  });
  return { airdrop, error: null, status: "processed" };
}

/**
 * When minting and transferring airdrops, it's possible that
 * the mint succeeded but the transfer or the insertion of the
 * NFT and transaction may have failed. This job helps ensure
 * that those latter steps are completed successfully.
 */
export default async function checkAirdropsHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const airdropsToCheck = await prisma.airdrop.findMany({
    include: { MasterEditionNft: true, ToUser: true },
    where: {
      standardEditionMint: null,
      standardEditionMintRaw: { not: null },
    },
  });
  const processedAirdrops = await Promise.all(
    airdropsToCheck.map((airdrop) => limit(() => checkAirdrop(req, airdrop)))
  );
  const successfulCheckedAirdrops = processedAirdrops.filter(
    (result) => result.error == null
  );
  const fiveMinutesAgo = dayjs().subtract(dayjs.duration({ minutes: 5 }));
  const failedCheckedAirdrops = processedAirdrops.filter(
    (result) =>
      result.error != null &&
      // Only log errors for airdrops that have been consistently failing for over 5 minutes
      // since a lot of the times the errors are happening since the edition was
      // minted too recently
      dayjs(result.airdrop.timeCreated).isBefore(fiveMinutesAgo)
  );
  if (failedCheckedAirdrops.length > 0) {
    logError(
      AnalyticsEvent.AirdropFail,
      `${failedCheckedAirdrops.length} airdrops failed to complete`,
      req,
      {
        airdrops: failedCheckedAirdrops.map((a) => toObject(a)),
      }
    );
  }

  res.json({
    failedCheckedAirdrops,
    queriedAirdrops: airdropsToCheck.map(({ id }) => id),
    successfulCheckedAirdrops,
  });
}
