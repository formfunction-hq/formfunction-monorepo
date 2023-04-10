import { Request } from "express";
import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import getPrisma from "src/utils/prisma/getPrisma";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import parseNftTx from "src/utils/solana/txs/parse/parseNftTx";
import {
  InsertNftTransactionEditionsInput,
  InsertStandardEditionInput,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import insertNftTransaction from "src/utils/transaction/insertNftTransaction";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getMasterEditionMintFromStandardEditionMint from "src/utils/solana/accounts/getMasterEditionMintFromStandardEditionMint";
import getNftMintOwner from "src/utils/solana/getNftMintOwner";
import parseCreateEditionDistributorTx from "src/utils/solana/txs/parse/editions/parseCreateEditionDistributorTx";
import invariant from "tiny-invariant";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

async function getAuctionCount(txExpress: NftTransactionOnchain) {
  const prisma = getPrisma();
  const previousTx = await prisma.nftTransaction.findFirst({
    where: {
      timeCreated: {
        lte: txExpress.timeCreated,
      },
    },
  });

  if (previousTx == null) {
    return 0;
  }

  const previousTxType = previousTx.type as NftTransactionTypeExpress_Enum;
  switch (previousTxType) {
    case NftTransactionTypeExpress_Enum.AuctionWon:
    case NftTransactionTypeExpress_Enum.Bid:
    case NftTransactionTypeExpress_Enum.ChangePriceForEditions:
    case NftTransactionTypeExpress_Enum.ClaimedPnft:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid:
    case NftTransactionTypeExpress_Enum.Imported:
    case NftTransactionTypeExpress_Enum.Listed:
    case NftTransactionTypeExpress_Enum.ListedEditions:
    case NftTransactionTypeExpress_Enum.ListedInstantSale:
    case NftTransactionTypeExpress_Enum.ListingCancelled:
    case NftTransactionTypeExpress_Enum.Minted:
    case NftTransactionTypeExpress_Enum.Offer:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary:
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint:
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions:
    case NftTransactionTypeExpress_Enum.Transferred:
      return previousTx.auctionCount;
    case NftTransactionTypeExpress_Enum.Sold:
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
    case NftTransactionTypeExpress_Enum.SoldInstantSale:
      return previousTx.auctionCount + 1;
    case NftTransactionTypeExpress_Enum.Burned:
      return -1;
    default:
      return assertUnreachable(previousTxType);
  }
}

async function getEditionsInput(
  tx: NftTransactionOnchain,
  parsedTxWithMeta: ParsedTransactionWithMeta
): Promise<Maybe<InsertNftTransactionEditionsInput>> {
  if (tx.type !== NftTransactionTypeExpress_Enum.ListedEditions) {
    return null;
  }

  const decodedTransaction = decodeAuctionHouseTransaction(
    getAuctionHouseConstants().programId,
    parsedTxWithMeta
  );
  const parsedAgain = await parseCreateEditionDistributorTx(
    parsedTxWithMeta,
    decodedTransaction,
    new PublicKey(tx.mint)
  );

  invariant(parsedAgain != null);
  const {
    createEditionDistributorInfo: {
      priceFunctionType,
      priceParams,
      startingPriceLamports,
    },
  } = parsedAgain;

  return {
    priceFunctionType,
    priceParams,
    startingPriceInLamports: startingPriceLamports!,
  };
}

async function getInsertStandardEditionInput(
  tx: NftTransactionOnchain
): Promise<Maybe<InsertStandardEditionInput>> {
  if (tx.type !== NftTransactionTypeExpress_Enum.SoldEditionPrimary) {
    return null;
  }

  const masterEditionMint = await getMasterEditionMintFromStandardEditionMint(
    tx.mint
  );
  const owner = await getNftMintOwner(new PublicKey(tx.mint));
  return {
    masterEditionMint: masterEditionMint!.address.toString(),
    ownerId: owner!.toString(),
    standardEditionMint: tx.mint,
  };
}

export default async function parseAndInsertTransaction({
  insertRaw = false,
  isCrossmint,
  mint,
  overrides,
  req,
  txid,
  updateMasterEditionNft,
  updateNft,
}: {
  insertRaw?: boolean;
  isCrossmint?: boolean;
  mint: string;
  overrides?: {
    toUserId?: string;
  };
  req?: Request;
  txid: string;
  updateMasterEditionNft?: boolean;
  updateNft?: boolean;
}) {
  const prisma = getPrisma();

  const parsedTx = await ConnectionWrapper.getParsedTransaction(txid);
  invariant(parsedTx != null);
  const onchainTx = await parseNftTx(parsedTx, new PublicKey(mint));

  if (onchainTx == null) {
    throw new Error("failed to parse tx");
  }

  const nftTransactions = await prisma.nftTransaction.findMany({
    where: {
      ixIndex: onchainTx.ixIndex ?? undefined,
      ixInnerIndex: onchainTx.ixInnerIndex ?? undefined,
      txid,
    },
  });
  if (nftTransactions.length > 0) {
    throw new Error("tx already exists");
  }

  let createdTx;
  const {
    creatorId,
    fromAddress: fromUserId,
    priceInLamports,
    timeCreated,
    toAddress: toUserId,
    type,
  } = onchainTx;
  if (insertRaw) {
    try {
      createdTx = await prisma.nftTransaction.create({
        data: {
          Creator: { connect: { id: creatorId } },
          Currency:
            onchainTx.price != null
              ? { connect: { name: onchainTx.price.currencyInfo.name } }
              : undefined,
          From: { connect: { id: fromUserId } },
          Nft: { connect: { id: onchainTx.mint } },
          NftTransactionType: { connect: { value: type } },
          To: { connect: { id: overrides?.toUserId ?? toUserId } },
          auctionCount: await getAuctionCount(onchainTx),
          price: priceInLamports == null ? null : Number(priceInLamports),
          timeCreated,
          txid: onchainTx.txid,
        },
      });

      await logEvent(AnalyticsEvent.InternTransactionCreatedSuccess, null, {
        createdTx,
        onchainTx,
      });
    } catch (e) {
      await logError(
        AnalyticsEvent.InternTransactionCreatedError,
        e as Error,
        null
      );

      throw e;
    }
  } else {
    const offerTransaction =
      type !== NftTransactionTypeExpress_Enum.SoldAcceptedOffer
        ? null
        : await prisma.nftTransaction.findFirst({
            where: {
              fromUserId: overrides?.toUserId ?? toUserId!,
              mint: onchainTx.mint,
              price: priceInLamports,
              toUserId: fromUserId!,
              type: NftTransactionTypeExpress_Enum.Offer,
            },
          });

    const { transaction: createdTxInner } = await insertNftTransaction(
      req,
      {
        creatorId: creatorId!,
        currencyName: onchainTx.price?.currencyInfo.name,
        editionsInput: await getEditionsInput(onchainTx, parsedTx),
        fromUserId: fromUserId!,
        insertStandardEditionInput: await getInsertStandardEditionInput(
          onchainTx
        ),
        ixIndex: onchainTx.ixIndex,
        ixInnerIndex: onchainTx.ixInnerIndex,
        mint: onchainTx.mint,
        offerTransactionId: offerTransaction?.id,
        price: priceInLamports,
        toUserId: overrides?.toUserId ?? toUserId!,
        txid: onchainTx.txid!,
        type,
      },
      { isCrossmint, updateMasterEditionNft, updateNft }
    );
    createdTx = createdTxInner;
  }

  return createdTx;
}
