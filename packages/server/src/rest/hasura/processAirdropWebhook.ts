import { Keypair, PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import getPrisma from "src/utils/prisma/getPrisma";
import loadAuctionHouseSdk from "src/utils/solana/loadAuctionHouseSdk";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import getCreatorsForExecuteSale from "formfn-shared/dist/utils/sale/getCreatorsForExecuteSale";
import invariant from "tiny-invariant";
import getNftCreators from "src/utils/nft/getNftCreators";
import parseCreatorsMetadataString from "src/utils/nft/parseCreatorsMetadataString";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import toObject from "formfn-shared/dist/utils/toObject";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import sleepMs from "formfn-shared/dist/utils/sleepMs";
import insertAirdroppedNftAndNotify from "src/utils/airdrop/insertAirdroppedNftAndNotify";
import getTransferTxidForAirdrop from "src/utils/airdrop/getTransferTxidForAirdrop";
import isLastRetry from "src/utils/hasura/isLastRetry";

export default async function processAirdropWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  // Sleep for 10 seconds since if we do this too soon the MasterEdition
  // doesn't load.
  await sleepMs(10000);
  const shouldLog = isLastRetry(req);
  const { id } = req.body.event.data.new;
  const prisma = getPrisma();
  const airdrop = await prisma.airdrop.findUnique({
    include: {
      MasterEditionNft: {
        include: {
          NftMetadata: true,
          NftToCollaborator: {
            include: { Request: true, User: { include: CONVERT_USER_INCLUDE } },
          },
        },
      },
      StandardEditionNft: true,
      ToUser: true,
    },
    where: { id },
  });
  invariant(
    airdrop != null && airdrop.MasterEditionNft != null,
    "airdrop and MasterEditionNft must not be null"
  );
  if (airdrop.StandardEditionNft != null) {
    // If `standardEditionMint` is non-null it means the NFT has already been
    // inserted into our DB
    res.sendStatus(200);
    return;
  }

  const { MasterEditionNft } = airdrop;
  const { mint, NftMetadata } = MasterEditionNft;
  const masterEditionMintKey = new PublicKey(mint);

  if (airdrop.standardEditionMintRaw != null) {
    const standardEditionAccountInfo = await ConnectionWrapper.getAccountInfo(
      new PublicKey(airdrop.standardEditionMintRaw)
    );
    if (standardEditionAccountInfo != null) {
      // If the account for standardEditionMintRaw is non-null but standardEditionMint is null,
      // it likely means that we are retrying this job after the mint step has succeeded but other
      // steps may have failed. In this case, we have a separate job that checks for these airdrops
      // so we return success.
      res.json({ message: "To be processed by checkAirdrops", success: true });
      return;
    }
    // Otherwise, just continue since the previous airdrop attempt did not go through
  }

  const auctionHouseSdk = loadAuctionHouseSdk(CurrencyNameExpress_Enum.Solana);
  const authorityKeypair = getAuthorityKeypair();
  const standardEditionMint = Keypair.generate();
  const remainingAccounts = getCreatorsForExecuteSale(
    getNftCreators(
      parseCreatorsMetadataString(NftMetadata.creators as any) ?? [],
      MasterEditionNft.NftToCollaborator
    )
  );
  const standardEditionMintKey = standardEditionMint.publicKey;
  // Mark the standard edition mint key in our DB to prevent cases
  // where the tx throws but it actually went through (since otherwise
  // we may end up minting two editions for the same recipient)
  await prisma.airdrop.update({
    data: { standardEditionMintRaw: standardEditionMintKey.toString() },
    where: { id: airdrop.id },
  });

  let mintTxid;
  try {
    const mintTx = await auctionHouseSdk.buyEditionV2Tx(
      {
        buyer: authorityKeypair.publicKey,
        mint: masterEditionMintKey,
        newMint: standardEditionMint.publicKey,
      },
      { buyerWithAllowlistProofData: null, priceInLamports: 0 },
      remainingAccounts ?? []
    );
    mintTxid = await ConnectionWrapper.sendAndConfirmTransaction(
      mintTx,
      [authorityKeypair, standardEditionMint],
      { commitment: "finalized" }
    );
  } catch (e: any) {
    if (shouldLog) {
      logError(AnalyticsEvent.AirdropFail, e, req, {
        airdrop: toObject(airdrop),
        description: `Could not buy edition for airdrop ${id}`,
      });
    }
    res.sendStatus(500);
    return;
  }

  try {
    const transferTxid = await getTransferTxidForAirdrop(
      req,
      airdrop,
      standardEditionMintKey,
      shouldLog
    );
    await insertAirdroppedNftAndNotify(
      req,
      MasterEditionNft,
      masterEditionMintKey,
      standardEditionMintKey,
      airdrop,
      mintTxid
    );

    res.json({ mintTxid, success: true, transferTxid });
  } catch (e: any) {
    if (shouldLog) {
      logError(AnalyticsEvent.AirdropFail, e, req, {
        airdrop: toObject(airdrop),
        description: `Could not insert airdropped nft for ${id}`,
      });
    }

    res.sendStatus(500);
  }
}
