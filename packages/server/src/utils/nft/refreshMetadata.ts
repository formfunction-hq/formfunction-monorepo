/* eslint-disable no-continue */
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import convertNft from "src/utils/convert/convertNft";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CurrencyNameExpress_Enum,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import { Request } from "express";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import insertMissingTransactions from "src/utils/nft/insertMissingTransactions";
import { PublicKey } from "@solana/web3.js";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import getParsedTransactionsForAddress from "src/utils/solana/getParsedTransactionsForAddress";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import dayjs from "src/utils/dates/dayjsex";
import updateNftOwner from "src/utils/nft/updateNftOwner";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import areOwnersSynced from "src/utils/solana/areOwnersSynced";
import getNftMintOwner from "src/utils/solana/getNftMintOwner";

export enum RefreshMetadataOperation {
  SyncOwners = "SyncOwners",
  SyncTransactions = "SyncTransactions",
}

/**
 * We perform this relatively quick check before proceeding with the rest of refreshMetadata
 * to avoid unnecessary computations.
 *
 * The heuristic we use is:
 * - If the onchain owner of the NFT is different than the owner in our DB, we should try inserting missing txs
 * - If getConfirmedSignaturesForAddress2 returns at least one tx that is not in our DB, we should try inserting missing txs
 * - Otherwise, we can skip it
 */
async function getRequiredRefreshMetadataOperations(
  prismaNft: ConvertNftToMetadataAccountType
): Promise<Array<RefreshMetadataOperation>> {
  const { mint } = prismaNft;
  const [onchainTxsOriginal, onchainOwnerId] = await Promise.all([
    getParsedTransactionsForAddress(new PublicKey(mint)),
    getNftMintOwner(new PublicKey(mint)),
  ]);
  const areOwnersOutOfSync = !(await areOwnersSynced(
    mint,
    prismaNft.ownerId,
    onchainOwnerId?.toString() ?? null,
    getAuctionHouseSdk(
      (prismaNft.NftListing!.Currency
        .name as Maybe<CurrencyNameExpress_Enum>) ??
        CurrencyNameExpress_Enum.Solana
    )
  ));

  const authorityKeypair = getAuthorityKeypair();
  const onchainTxids = onchainTxsOriginal
    .filter((tx) => {
      const isAuthoritySigner = tx.transaction.message.accountKeys.some(
        (accountKey) =>
          accountKey.signer &&
          accountKey.pubkey.equals(authorityKeypair.publicKey)
      );

      if (
        isAuthoritySigner ||
        tx.blockTime == null ||
        // Don't sync old txs
        dayjs().diff(dayjs.unix(tx.blockTime), "days") > 5
      ) {
        return false;
      }

      return true;
    })
    .map((tx) => tx.transaction.signatures[0]);

  const prisma = getPrisma();
  const [dbRawTxs, dbTxs] = await Promise.all([
    prisma.nftTransactionRaw.findMany({
      select: { txid: true },
      where: {
        mint,
      },
    }),
    prisma.nftTransaction.findMany({
      select: { txid: true },
      where: {
        mint,
      },
    }),
  ]);
  const dbTxids = new Set(
    filterNulls([...dbRawTxs, ...dbTxs].map((tx) => tx.txid))
  );
  const missingTxids = onchainTxids.filter(
    (signature) => !dbTxids.has(signature)
  );
  const dbIsMissingTx = missingTxids.length > 0;

  return filterNulls([
    areOwnersOutOfSync ? RefreshMetadataOperation.SyncOwners : null,
    dbIsMissingTx ? RefreshMetadataOperation.SyncTransactions : null,
  ]);
}

/**
 * Syncs DB with current on-chain data for NFT.
 */
export default async function refreshMetadata(
  prismaNft: ConvertNftToMetadataAccountType,
  req?: Request
) {
  const shortCircuitReturn = {
    insertedTxs: [],
    metadataAccount: convertNftToMetadataAccount(prismaNft),
    shortCircuited: true,
  };

  if (prismaNft.status === NftStatusExpress_Enum.Burned) {
    return shortCircuitReturn;
  }

  const requiredOperations = await getRequiredRefreshMetadataOperations(
    prismaNft
  );
  if (requiredOperations.length === 0) {
    return shortCircuitReturn;
  }

  // Now that we've done a quick check to see if we may be missing some txids,
  // continue to do the more time-intensive stuff
  const { nft: convertedNft, transactions: onchainTxs } = await convertNft(
    prismaNft
  );

  const insertedTxs = requiredOperations.includes(
    RefreshMetadataOperation.SyncTransactions
  )
    ? await insertMissingTransactions(
        prismaNft.mint,
        onchainTxs,
        prismaNft.isImported,
        convertedNft,
        req
      )
    : [];
  if (requiredOperations.includes(RefreshMetadataOperation.SyncOwners)) {
    await updateNftOwner(prismaNft.mint, convertedNft.ownerId);
  }

  const prisma = getPrisma();
  const reloadedNft = await prisma.nft.findUnique({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    where: { mint: prismaNft.mint },
  });

  return {
    insertedTxs,
    metadataAccount: convertNftToMetadataAccount(reloadedNft!),
    requiredOperations,
    shortCircuited: false,
  };
}
