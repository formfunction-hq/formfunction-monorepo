import { PublicKey } from "@solana/web3.js";
import { writeFileSync } from "fs";
import logIfNotProd from "src/utils/logIfNotProd";
import findNftTxs from "src/utils/solana/txs/findNftTxs";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import getPrisma from "src/utils/prisma/getPrisma";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import convertNftTransaction from "src/utils/convert/convertNftTransaction";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import CONVERT_NFT_TRANSACTION_INCLUDE from "src/constants/include/ConvertNftTransactionInclude";

export default async function getNftTxs(
  tokenMint: PublicKey,
  confirmedSignaturesLimit = 100,
  waitMs?: number,
  parsedTxsOutput?: string
): Promise<Array<NftTransactionOnchain>> {
  if (waitMs != null) {
    logIfNotProd("waiting...");
    await new Promise<void>((resolve) => setTimeout(() => resolve(), waitMs));
  }

  /**
   * There are two reasons we need to do this.
   *
   * The FIRST reason why we need to do this is because not all transfers are associated with
   * the token mint (e.g. txid = 2VBE7ues76rT9UEqivvNmXu5fww9NZv4YH2XsPq8HHYkY9LkixKnZtD6e1R1JkVgWZN5x1tUepQjcPw6HjtksQz5,
   * mint = D2VKeBfRqPvjt7PGAGKgjVezQ3ekbb4oNdPKH11ATox2).
   *
   * We insert these transfers into our DB when we find out-of-sync NFTs in areNftsSyncedEndpoint.
   *
   * However, if we do not query for these txs here, then areNftsSyncedEndpoint will think the corresponding
   * NFTs are out of sync.
   *
   * Thus, in order to avoid false positives when running areNftsSyncedEndpoint, we check for transfer txs that we've inserted
   * into our DB here.
   *
   * The SECOND reason is that for imported NFTs, not all the txs may be directly associated with the mint.
   */
  const prisma = getPrisma();
  const [nftTxsIgnoreList, prismaTxs] = await Promise.all([
    getLdFlag<Array<string>>(LaunchDarklyFlag.NftTxsIgnoreList, []),
    prisma.nftTransaction.findMany({
      include: CONVERT_NFT_TRANSACTION_INCLUDE,
      where: {
        OR: [
          {
            mint: tokenMint.toString(),
            type: {
              // TODO: change to include all by default, and then we specify which to exclude?
              in: [
                NftTransactionTypeExpress_Enum.Bid,
                NftTransactionTypeExpress_Enum.ChangePriceForEditions,
                NftTransactionTypeExpress_Enum.Imported,
                NftTransactionTypeExpress_Enum.Listed,
                NftTransactionTypeExpress_Enum.ListingCancelled,
                NftTransactionTypeExpress_Enum.ListedEditions,
                NftTransactionTypeExpress_Enum.ListedInstantSale,
                NftTransactionTypeExpress_Enum.Minted,
                NftTransactionTypeExpress_Enum.Sold,
                NftTransactionTypeExpress_Enum.SoldAcceptedOffer,
                NftTransactionTypeExpress_Enum.SoldEditionPrimary,
                NftTransactionTypeExpress_Enum.SoldInstantSale,
                NftTransactionTypeExpress_Enum.StoppedMintingForEditions,
                NftTransactionTypeExpress_Enum.Transferred,
              ],
            },
          },
          {
            Nft: {
              masterEditionMint: tokenMint.toString(),
            },
            // This transaction type's mint is the standard edition mint, not the master edition mint.
            // But we still want to include these txs for the master edition NFT in order properly derive
            // things like price and status
            type: NftTransactionTypeExpress_Enum.SoldEditionPrimary,
          },
        ],
      },
    }),
  ]);

  const txs = await ConnectionWrapper.getConfirmedSignaturesForAddress2(
    tokenMint,
    { limit: confirmedSignaturesLimit },
    "confirmed"
  );

  const signatures = removeDuplicatesWithSet(txs.map((tx) => tx.signature));

  const parsedTxs = await ConnectionWrapper.getParsedTransactions(
    signatures,
    "confirmed"
  );

  if (parsedTxsOutput != null) {
    logIfNotProd(
      `found ${parsedTxs.length} txs for mint ${tokenMint.toString()}`
    );
    writeFileSync(parsedTxsOutput, JSON.stringify(parsedTxs, null, 2));
  }

  const nftTxs = await findNftTxs(parsedTxs, tokenMint);
  const prismaTxsConverted = prismaTxs.map((tx) => convertNftTransaction(tx));
  const allTxs = removeDuplicatesWithComparison(
    // Order matters! We want to prioritize
    // 1) The txs that are already in our DB
    // 2) Onchain txs
    //
    // Example where this matters:
    // 59BpcoQMmSt7vuLiJNrhjBCKmFgcNoe7Ay4y5SrjC5VNMpqTG5GXswoYoB2sjQrXo6i4GLzHfR2LCtGhKUk5DEeS is an Exchange Art
    // sale, but also gets parsed as a transfer tx
    [...prismaTxsConverted, ...nftTxs],
    (a, b) => a.txid === b.txid
  );

  return allTxs
    .filter((tx) => !nftTxsIgnoreList.includes(tx.txid ?? ""))
    .sort(getCompareByProperty("timeCreated", SortOrder.Desc));
}
