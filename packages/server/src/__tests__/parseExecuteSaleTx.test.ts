import SaleType from "@formfunction-hq/formfunction-auction-house/dist/types/enum/SaleType";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import parseExecuteSaleTx from "src/utils/solana/txs/parse/parseExecuteSaleTx";
import {
  CurrencyNameExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import INSTANT_SALE_TX_SOL from "src/__tests__/constants/InstantSaleTxSol";
import INSTANT_SALE_TX_USDC from "src/__tests__/constants/InstantSaleTxUsdc";
import SETTLE_AUCTION_TX_SOL from "src/__tests__/constants/SettleAuctionTxSol";
import SETTLE_AUCTION_TX_USDC from "src/__tests__/constants/SettleAuctionTxUsdc";
import INSTANT_SALE_TX_LEGACY from "src/__tests__/constants/InstantSaleTxLegacy";
import mockGetAuctionHouseInfo from "src/__tests__/mocks/mockGetAuctionHouseInfo";
import mockGetCurrencyInfoForAuctionHouse from "src/__tests__/mocks/mockGetCurrencyInfoForAuctionHouse";
import mockGetNftCreatorFromMint from "src/__tests__/mocks/mockGetNftCreatorFromMint";
import mockGetSaleTypeFromTradeState from "src/__tests__/mocks/mockGetSaleTypeFromTradeState";
import getPriceMock from "src/__tests__/utils/getPriceMock";
import invariant from "tiny-invariant";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

type TestCaseName = string;
type TestCase = [
  TestCaseName,
  {
    buyerAddress: string;
    currency: CurrencyNameExpress_Enum;
    nftCreatorAddress: string;
    price: number;
    saleType: SaleType;
    transaction: ParsedTransactionWithMeta;
    txType: NftTransactionTypeExpress_Enum;
  }
];

const TEST_CASES: Array<TestCase> = [
  [
    "settle auction (SOL)",
    {
      buyerAddress: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
      currency: CurrencyNameExpress_Enum.Solana,
      nftCreatorAddress: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
      price: 200_000_000,
      saleType: SaleType.Auction,
      transaction:
        SETTLE_AUCTION_TX_SOL as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.Sold,
    },
  ],
  [
    "settle auction (USDC)",
    {
      buyerAddress: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
      currency: CurrencyNameExpress_Enum.UsdCoin,
      nftCreatorAddress: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
      price: 200_000,
      saleType: SaleType.Auction,
      transaction:
        SETTLE_AUCTION_TX_USDC as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.Sold,
    },
  ],
  [
    "settle instant sale (SOL)",
    {
      buyerAddress: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
      currency: CurrencyNameExpress_Enum.Solana,
      nftCreatorAddress: "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
      price: 10_000_000,
      saleType: SaleType.InstantSale,
      transaction: INSTANT_SALE_TX_SOL as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.SoldInstantSale,
    },
  ],
  [
    "settle instant sale (USDC)",
    {
      buyerAddress: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
      currency: CurrencyNameExpress_Enum.UsdCoin,
      nftCreatorAddress: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
      price: 1_000_000,
      saleType: SaleType.InstantSale,
      transaction: INSTANT_SALE_TX_USDC as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.SoldInstantSale,
    },
  ],
  [
    "settle instant sale (legacy)",
    {
      buyerAddress: "2ZhSpVKaeXjSoRbiHXTzDa4Uzt88YRMiTD3m4uWt54A4",
      currency: CurrencyNameExpress_Enum.Solana,
      nftCreatorAddress: "69p3beg7VzMgg9zMyQud2gH9JNnatirBgxcsAULarXTs",
      price: 2_000_000_000,
      saleType: SaleType.InstantSale,
      transaction:
        INSTANT_SALE_TX_LEGACY as unknown as ParsedTransactionWithMeta,
      txType: NftTransactionTypeExpress_Enum.SoldInstantSale,
    },
  ],
];

describe("parseExecuteSaleTx tests", () => {
  beforeAll(async () => {
    mockGetAuctionHouseInfo();
    mockGetCurrencyInfoForAuctionHouse();
  });

  it.each(TEST_CASES)("parse (%s)", async (_, args) => {
    const {
      buyerAddress,
      currency,
      nftCreatorAddress,
      price,
      saleType,
      transaction,
      txType,
    } = args;
    mockGetNftCreatorFromMint(nftCreatorAddress);
    mockGetSaleTypeFromTradeState(saleType);

    const { programId } = getAuctionHouseConstants();
    const decodedTransaction = decodeAuctionHouseTransaction(
      programId,
      transaction
    );
    expect(decodedTransaction).not.toBe(null);
    invariant(decodedTransaction != null);

    const parsed = await parseExecuteSaleTx(transaction, decodedTransaction);
    const priceMock = getPriceMock(price, currency);
    expect(parsed).not.toBe(null);
    invariant(parsed != null);
    const { tx } = parsed;

    expect(tx.creatorId).toEqual(nftCreatorAddress);
    expect(tx.fromAddress).toEqual(nftCreatorAddress);
    expect(tx.toAddress).toEqual(buyerAddress);
    expect(tx.type).toEqual(txType);
    expect(tx.priceInLamports).toEqual(priceMock.amount);
    expect(tx.price!.amount).toEqual(priceMock.amount);
    expect(tx.price!.currencyInfo.mint).toEqual(priceMock.currencyInfo.mint);
  });
});
