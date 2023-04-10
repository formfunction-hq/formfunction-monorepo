import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";
import parseBuyTx from "src/utils/solana/txs/parse/parseBuyTx";
import {
  CurrencyNameExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import BID_TX_SOL from "src/__tests__/constants/BidTxSol";
import BID_TX_USDC from "src/__tests__/constants/BidTxUsdc";
import OFFER_TX_SOL from "src/__tests__/constants/OfferTxSol";
import OFFER_TX_USDC from "src/__tests__/constants/OfferTxUsdc";
import mockGetAuctionHouseInfo from "src/__tests__/mocks/mockGetAuctionHouseInfo";
import mockGetCurrencyInfoForAuctionHouse from "src/__tests__/mocks/mockGetCurrencyInfoForAuctionHouse";
import mockGetNftCreatorFromMint from "src/__tests__/mocks/mockGetNftCreatorFromMint";
import mockGetTokenAccountOwner from "src/__tests__/mocks/mockGetTokenAccountOwner";
import getPriceMock from "src/__tests__/utils/getPriceMock";
import invariant from "tiny-invariant";

type TestCaseName = string;
type TestCase = [
  TestCaseName,
  {
    buyerAddress: string;
    currency: CurrencyNameExpress_Enum;
    nftCreatorAddress: string;
    price: number;
    transaction: ParsedTransactionWithMeta;
    txType: NftTransactionTypeExpress_Enum;
  }
];

const TEST_CASES: Array<TestCase> = [
  [
    "bid SOL",
    {
      buyerAddress: "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
      currency: CurrencyNameExpress_Enum.Solana,
      nftCreatorAddress: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
      price: 100_000_000,
      transaction: BID_TX_SOL as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.Bid,
    },
  ],
  [
    "bid USDC",
    {
      buyerAddress: "8KUU21MBhtJBXnPMEpq7HZ3egoymHopizCydw12uNKfC",
      currency: CurrencyNameExpress_Enum.UsdCoin,
      nftCreatorAddress: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
      price: 350_000_000,
      transaction: BID_TX_USDC as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.Bid,
    },
  ],
  [
    "offer SOL",
    {
      buyerAddress: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
      currency: CurrencyNameExpress_Enum.Solana,
      nftCreatorAddress: "5BNvH7hxxeMfJkBYpFArEAy5iaYCypjxVFb1KtbZSLk4",
      price: 1_000_000_000,
      transaction: OFFER_TX_SOL as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.Offer,
    },
  ],
  [
    "offer USDC",
    {
      buyerAddress: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
      currency: CurrencyNameExpress_Enum.UsdCoin,
      nftCreatorAddress: "5BNvH7hxxeMfJkBYpFArEAy5iaYCypjxVFb1KtbZSLk4",
      price: 100_000_000,
      transaction: OFFER_TX_USDC as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.Offer,
    },
  ],
];

describe("parseBuyTx tests", () => {
  beforeAll(() => {
    mockGetAuctionHouseInfo();
    mockGetCurrencyInfoForAuctionHouse();
  });

  it.each(TEST_CASES)("parse (%s)", async (_, args) => {
    const {
      txType,
      buyerAddress,
      currency,
      nftCreatorAddress,
      price,
      transaction,
    } = args;
    mockGetNftCreatorFromMint(nftCreatorAddress);
    mockGetTokenAccountOwner(nftCreatorAddress);

    const { programId } = getAuctionHouseConstants();
    const decodedTransaction = decodeAuctionHouseTransaction(
      programId,
      transaction
    );
    expect(decodedTransaction).not.toBe(null);
    invariant(decodedTransaction != null);

    const parsed = await parseBuyTx(transaction, decodedTransaction);
    const priceMock = getPriceMock(price, currency);
    expect(parsed).not.toBe(null);
    invariant(parsed != null);
    const { tx } = parsed;

    expect(tx.creatorId).toEqual(nftCreatorAddress);
    expect(tx.fromAddress).toEqual(buyerAddress);
    expect(tx.toAddress).toEqual(nftCreatorAddress);
    expect(tx.type).toEqual(txType);
    expect(tx.priceInLamports).toEqual(priceMock.amount);
    expect(tx.price!.amount).toEqual(priceMock.amount);
    expect(tx.price!.currencyInfo.mint).toEqual(priceMock.currencyInfo.mint);
  });
});
