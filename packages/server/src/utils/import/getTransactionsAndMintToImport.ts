import { PublicKey } from "@solana/web3.js";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import { nanoid } from "nanoid";
import DEFAULT_AUCTION_COUNT from "src/constants/DefaultAuctionCount";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import SOLD_TRANSACTION_TYPES from "src/constants/SoldTransactionTypes";
import Typename from "src/types/enums/Typename";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import convertNftTransactionOnchain from "src/utils/convert/convertNftTransactionOnchain";
import convertUser from "src/utils/convert/convertUser";
import getNftTransactionNftInfo from "src/utils/graphql/getNftTransactionNftInfo";
import getPrisma from "src/utils/prisma/getPrisma";
import getAllTransferTxs from "src/utils/solana/txs/getAllTransferTxs";
import getNftTxs from "src/utils/solana/txs/getNftTxs";
import getExchangeArtTransactionsHelius from "src/utils/solana/txs/parse/exchange-art/getExchangeArtTransactionsHelius";
import getHolaplexAuctionInfoFromMint from "src/utils/solana/txs/parse/holaplex/getHolaplexAuctionInfoFromMint";
import {
  NftTransactionExpress,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";

export default async function getTransactionsAndMintToImport(
  creatorId: string,
  mintAddress: string
): Promise<{ mint: string; txs: Array<NftTransactionExpress> }> {
  const [txsOnchain, holaplexAuctionInfo, exchangeArtTxs] = await Promise.all([
    getNftTxs(new PublicKey(mintAddress)),
    getHolaplexAuctionInfoFromMint(mintAddress, creatorId),
    getExchangeArtTransactionsHelius(creatorId, mintAddress),
  ]);
  let transfersOnchain: Array<NftTransactionOnchain> = [];
  if (holaplexAuctionInfo?.limitedEditionMint != null) {
    transfersOnchain = await getAllTransferTxs(
      new PublicKey(holaplexAuctionInfo.limitedEditionMint)
    );
  } else {
    transfersOnchain = await getAllTransferTxs(
      new PublicKey(holaplexAuctionInfo?.masterEditionMint ?? mintAddress)
    );
  }
  const [txsOnchainConverted, transfers, holaplexTxs] = await Promise.all([
    Promise.all(
      txsOnchain.map((onchainTx) => convertNftTransactionOnchain(onchainTx))
    ),
    Promise.all(
      transfersOnchain.map((onchainTx) =>
        convertNftTransactionOnchain(onchainTx)
      )
    ),
    Promise.all(
      (holaplexAuctionInfo?.transactions ?? []).map((onchainTx) =>
        convertNftTransactionOnchain(onchainTx)
      )
    ),
  ]);
  const mintToImport = holaplexAuctionInfo?.limitedEditionMint ?? mintAddress;

  const prisma = getPrisma();
  const creator = await prisma.user.findUnique({
    include: CONVERT_USER_INCLUDE,
    where: {
      id: creatorId,
    },
  });
  const importTx: NftTransactionExpress = {
    Creator: convertUser(creator!),
    From: convertUser(creator!),
    To: convertUser(creator!),
    __typename: Typename.NftTransaction,
    auctionCount: DEFAULT_AUCTION_COUNT,
    creatorId,
    fromAddress: creatorId,
    id: nanoid(),
    mint: mintToImport,
    nftInfo: getNftTransactionNftInfo(null),

    timeCreated: new Date(),
    toAddress: creatorId,
    type: NftTransactionTypeExpress_Enum.Imported,
  };

  const allTransactions = [
    importTx,
    // Ordering is important here, since we remove duplicates. Exchange Art
    // transactions should be first, since some Exchange Art transactions (e.g. Sold)
    // also count as transfers
    ...exchangeArtTxs,
    ...transfers,
    ...holaplexTxs,
    ...txsOnchainConverted,
  ];

  const allTransactionsUnique = removeDuplicatesWithComparison(
    allTransactions,
    (a, b) => a.txid === b.txid
  ).sort(getCompareByProperty("timeCreated", SortOrder.Desc));

  const transactions = allTransactionsUnique
    .map((tx, i) => ({
      ...tx,
      auctionCount: allTransactionsUnique.filter((filterTx, filterIndex) => {
        // This const is not necessary, just makes the code more understandable.
        // Note that the txs are sorted in descending order by time.
        const isSaleTxThatHappenedBeforeThisTx =
          filterIndex > i && SOLD_TRANSACTION_TYPES.includes(filterTx.type);
        return isSaleTxThatHappenedBeforeThisTx;
      }).length,
    }))
    .filter(
      (tx) =>
        // If it is a Holaplex limited edition auction, do not show txs for the master
        // edition unless the tx type is as below
        !(
          holaplexAuctionInfo?.limitedEditionMint != null &&
          tx.mint !== holaplexAuctionInfo.limitedEditionMint &&
          ![
            NftTransactionTypeExpress_Enum.Bid,
            NftTransactionTypeExpress_Enum.Minted,
            NftTransactionTypeExpress_Enum.Sold,
          ].includes(tx.type)
        )
    )
    // Needed in the case where we are importing a limited edition from Holaplex
    .map((tx) => ({ ...tx, mint: mintToImport }));

  return {
    mint: holaplexAuctionInfo?.limitedEditionMint ?? mintAddress,
    txs: transactions,
  };
}
