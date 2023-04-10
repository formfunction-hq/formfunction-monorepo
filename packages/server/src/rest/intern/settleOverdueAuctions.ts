import { PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import invariant from "tiny-invariant";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import insertNftTransaction from "src/utils/transaction/insertNftTransaction";
import {
  CurrencyNameExpress_Enum,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import getOverdueAuctions from "src/utils/auction/getOverdueAuctions";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import priceLastListedResolver from "src/resolvers/query/nested/nft/priceLastListedResolver";
import auctionWinnerIdResolver from "src/resolvers/query/nested/nft/auctionWinnerIdResolver";
import createOwnerAuctionSettledNotification from "src/utils/notifications/create/createOwnerAuctionSettledNotification";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

async function settleOverdueAuction(
  req: Request,
  mint: string,
  dryRun: boolean
) {
  const mintKey = new PublicKey(mint);
  const prisma = getPrisma();

  const nft = await prisma.nft.findUnique({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    where: { mint },
  });
  invariant(nft != null, "NFT must not be null");
  invariant(
    nft.status === NftStatusExpress_Enum.Auction,
    "NFT must be for auction"
  );
  invariant(
    dayjs(nft.NftListing!.auctionEndTime).isBefore(dayjs()),
    "NFT auction must be over"
  );
  const metadataAccount = convertNftToMetadataAccount(nft);

  const auctionWinnerId = await auctionWinnerIdResolver(metadataAccount.nft);

  const remainingAccounts = metadataAccount.data.creators?.map((creator) => ({
    isSigner: false,
    isWritable: true,
    pubkey: new PublicKey(creator.address as string),
  }));

  const [ata] = await findAta(new PublicKey(nft.ownerId), new PublicKey(mint));
  const buyerPriceInLamports = Number(nft.NftListing!.priceInLamports);
  const priceLastListed = await priceLastListedResolver(metadataAccount.nft);

  const infoToReturn = {
    buyerPriceInLamports,
    sellerPriceInLamports: priceLastListed,
    tokenAccount: ata,
    tokenMint: mintKey.toString(),
    wallet: getAuthorityKeypair().publicKey.toString(),
    walletBuyer: auctionWinnerId!,
    walletCreator: nft.creatorId,
    walletSeller: nft.ownerId,
  };

  if (dryRun) {
    return infoToReturn;
  }

  const auctionHouseSdk = getAuctionHouseSdk(
    nft.NftListing!.Currency.name as CurrencyNameExpress_Enum
  );
  const tx = await auctionHouseSdk.executeSaleV2Tx(
    {
      buyerPriceInLamports,
      sellerPriceInLamports: priceLastListed!,
      tokenAccount: ata,
      tokenMint: mintKey,
      wallet: getAuthorityKeypair().publicKey,
      walletBuyer: new PublicKey(auctionWinnerId!),
      walletCreator: new PublicKey(nft.creatorId),
      walletSeller: new PublicKey(nft.ownerId),
    },
    {},
    remainingAccounts,
    400000
  );

  const txid = await ConnectionWrapper.sendAndConfirmTransaction(tx, [
    getAuthorityKeypair(),
  ]);

  const { transaction } = await insertNftTransaction(req, {
    creatorId: nft.creatorId,
    currencyName: nft.NftListing?.Currency
      .name as Maybe<CurrencyNameExpress_Enum>,
    fromUserId: nft.ownerId,
    mint: nft.mint,
    price: Number(nft.NftListing?.priceInLamports),
    toUserId: auctionWinnerId!,
    txid,
    type: NftTransactionTypeExpress_Enum.Sold,
  });

  await createOwnerAuctionSettledNotification(
    {
      nftTransactionId: transaction.id,
    },
    nft.ownerId,
    auctionWinnerId!
  );

  return {
    ...infoToReturn,
    txid,
  };
}

/**
 * Settles auctions that are overdue.
 */
export default async function settleOverdueAuctions(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { dryRun } = req.body;

  const overdueAuctions = await getOverdueAuctions();

  const results = await Promise.all(
    overdueAuctions.map(async (nft) => {
      try {
        const result = await settleOverdueAuction(req, nft.mint, dryRun);
        return result;
      } catch (e) {
        return {
          error: e,
        };
      }
    })
  );

  const numErrors = results.filter((result) => "error" in result).length;
  if (results.length > 0) {
    logError(
      numErrors > 0
        ? AnalyticsEvent.OverdueAuctionsError
        : AnalyticsEvent.OverdueAuctions,
      `There are ${results.length} overdue auctions${
        numErrors > 0 ? ` (${numErrors} errors occurred while settling)` : ""
      }`,
      req,
      { dryRun, results }
    );
  }

  res.json({ results });
}
