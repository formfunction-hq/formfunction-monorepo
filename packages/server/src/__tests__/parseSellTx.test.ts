import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import SaleType from "@formfunction-hq/formfunction-auction-house/dist/types/enum/SaleType";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";
import parseSellTx from "src/utils/solana/txs/parse/parseSellTx";
import {
  CurrencyNameExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import LIST_FOR_AUCTION_TX_SOL from "src/__tests__/constants/ListForAuctionTxSol";
import LIST_FOR_AUCTION_TX_USDC from "src/__tests__/constants/ListForAuctionTxUsdc";
import LIST_FOR_INSTANT_SALE_TX_SOL from "src/__tests__/constants/ListForInstantSaleTxSol";
import LIST_FOR_INSTANT_SALE_TX_USDC from "src/__tests__/constants/ListForInstantSaleTxUsdc";
import mockGetAuctionHouseInfo from "src/__tests__/mocks/mockGetAuctionHouseInfo";
import mockGetCurrencyInfoForAuctionHouse from "src/__tests__/mocks/mockGetCurrencyInfoForAuctionHouse";
import mockGetNftCreatorFromMint from "src/__tests__/mocks/mockGetNftCreatorFromMint";
import mockGetSaleTypeFromTradeState from "src/__tests__/mocks/mockGetSaleTypeFromTradeState";
import getPriceMock from "src/__tests__/utils/getPriceMock";
import invariant from "tiny-invariant";

type TestCaseName = string;
type TestCase = [
  TestCaseName,
  {
    currency: CurrencyNameExpress_Enum;
    nftCreatorAddress: string;
    price: number;
    transaction: ParsedTransactionWithMeta;
    txType: NftTransactionTypeExpress_Enum;
  }
];

const TEST_CASES: Array<TestCase> = [
  [
    "auction SOL",
    {
      currency: CurrencyNameExpress_Enum.Solana,
      nftCreatorAddress: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
      price: 100_000_000,
      transaction:
        LIST_FOR_AUCTION_TX_SOL as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.Listed,
    },
  ],
  [
    "auction USDC",
    {
      currency: CurrencyNameExpress_Enum.UsdCoin,
      nftCreatorAddress: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
      price: 100_000,
      transaction:
        LIST_FOR_AUCTION_TX_USDC as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.Listed,
    },
  ],
  [
    "instantSale SOL",
    {
      currency: CurrencyNameExpress_Enum.Solana,
      nftCreatorAddress: "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
      price: 10_000_000,
      transaction:
        LIST_FOR_INSTANT_SALE_TX_SOL as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.ListedInstantSale,
    },
  ],
  [
    "instantSale USDC",
    {
      currency: CurrencyNameExpress_Enum.UsdCoin,
      nftCreatorAddress: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
      price: 1_000_000,
      transaction:
        LIST_FOR_INSTANT_SALE_TX_USDC as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.ListedInstantSale,
    },
  ],
];

describe("parseSellTx tests", () => {
  beforeAll(() => {
    mockGetAuctionHouseInfo();
    mockGetCurrencyInfoForAuctionHouse();
  });

  it.each(TEST_CASES)("parse (%s)", async (_, args) => {
    const { currency, nftCreatorAddress, price, transaction, txType } = args;
    mockGetNftCreatorFromMint(nftCreatorAddress);
    mockGetSaleTypeFromTradeState(SaleType.Auction);

    const { programId } = getAuctionHouseConstants();
    const decodedTransaction = decodeAuctionHouseTransaction(
      programId,
      transaction
    );
    expect(decodedTransaction).not.toBe(null);
    invariant(decodedTransaction != null);

    const parsed = await parseSellTx(transaction, decodedTransaction);
    const priceMock = getPriceMock(price, currency);
    expect(parsed).not.toBe(null);
    invariant(parsed != null);
    const { tx } = parsed;

    expect(tx.creatorId).toEqual(nftCreatorAddress);
    expect(tx.fromAddress).toEqual(nftCreatorAddress);
    expect(tx.toAddress).toEqual(nftCreatorAddress);
    expect(tx.type).toEqual(txType);
    expect(tx.priceInLamports).toEqual(priceMock.amount);
    expect(tx.price!.amount).toEqual(priceMock.amount);
    expect(tx.price!.currencyInfo.mint).toEqual(priceMock.currencyInfo.mint);
  });
});
