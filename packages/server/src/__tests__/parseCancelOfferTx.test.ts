import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";
import parseCancelOfferTx from "src/utils/solana/txs/parse/parseCancelOfferTx";
import {
  CurrencyNameExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import CANCEL_OFFER_TX_SOL from "src/__tests__/constants/CancelOfferTxSol";
import CANCEL_OFFER_TX_USDC from "src/__tests__/constants/CancelOfferTxUsdc";
import mockGetAuctionHouseInfo from "src/__tests__/mocks/mockGetAuctionHouseInfo";
import mockGetCurrencyInfoForAuctionHouse from "src/__tests__/mocks/mockGetCurrencyInfoForAuctionHouse";
import mockGetNftCreatorFromMint from "src/__tests__/mocks/mockGetNftCreatorFromMint";
import mockGetTokenAccountInfo from "src/__tests__/mocks/mockGetTokenAccountInfo";
import getPriceMock from "src/__tests__/utils/getPriceMock";
import invariant from "tiny-invariant";

type TestCaseName = string;
type TestCase = [
  TestCaseName,
  {
    currency: CurrencyNameExpress_Enum;
    nftCreatorAddress: string;
    offerMakerAddress: string;
    ownerAddress: string;
    price: number;
    transaction: ParsedTransactionWithMeta;
  }
];

const TEST_CASES: Array<TestCase> = [
  [
    "cancel offer SOL",
    {
      currency: CurrencyNameExpress_Enum.Solana,
      nftCreatorAddress: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
      offerMakerAddress: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
      ownerAddress: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
      price: 1_000_000_000,
      transaction: CANCEL_OFFER_TX_SOL as unknown as ParsedTransactionWithMeta,
    },
  ],
  [
    "cancel offer USDC",
    {
      currency: CurrencyNameExpress_Enum.UsdCoin,
      nftCreatorAddress: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
      offerMakerAddress: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
      ownerAddress: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
      price: 3_000_000,
      transaction: CANCEL_OFFER_TX_USDC as unknown as ParsedTransactionWithMeta,
    },
  ],
];

describe("parseCancelOfferTx tests", () => {
  beforeAll(() => {
    mockGetAuctionHouseInfo();
    mockGetCurrencyInfoForAuctionHouse();
  });

  it.each(TEST_CASES)("parse (%s)", async (_, args) => {
    const {
      offerMakerAddress,
      ownerAddress,
      currency,
      nftCreatorAddress,
      price,
      transaction,
    } = args;
    mockGetNftCreatorFromMint(nftCreatorAddress);
    mockGetTokenAccountInfo({ owner: ownerAddress });

    const decodedTransaction = decodeAuctionHouseTransaction(
      getAuctionHouseConstants().programId,
      transaction
    );
    const parsed = await parseCancelOfferTx(transaction, decodedTransaction);
    const priceMock = getPriceMock(price, currency);
    expect(parsed).not.toBe(null);
    invariant(parsed != null);

    expect(parsed.creatorId).toEqual(nftCreatorAddress);
    expect(parsed.fromAddress).toEqual(offerMakerAddress);
    expect(parsed.toAddress).toEqual(ownerAddress);
    expect(parsed.type).toEqual(NftTransactionTypeExpress_Enum.OfferCancelled);
    expect(parsed.priceInLamports).toEqual(priceMock.amount);
    expect(parsed.price!.amount).toEqual(priceMock.amount);
    expect(parsed.price!.currencyInfo.mint).toEqual(
      priceMock.currencyInfo.mint
    );
  });
});
