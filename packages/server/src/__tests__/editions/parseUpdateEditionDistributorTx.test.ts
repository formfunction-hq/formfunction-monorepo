import { LAMPORTS_PER_SOL, ParsedTransactionWithMeta } from "@solana/web3.js";
import invariant from "tiny-invariant";
import {
  CurrencyNameExpress_Enum,
  NftTransactionTypeExpress_Enum,
  PriceFunctionTypeExpress_Enum,
} from "src/__generated__/generated";
import mockGetNftCreatorFromMint from "src/__tests__/mocks/mockGetNftCreatorFromMint";
import parseUpdateEditionDistributorTx from "src/utils/solana/txs/parse/editions/parseUpdateEditionDistributorTx";
import UPDATE_EDITION_DISTRIBUTOR_TX from "src/__tests__/constants/UpdateEditionDistributorTx";
import mockGetAuctionHouseInfo from "src/__tests__/mocks/mockGetAuctionHouseInfo";
import getPriceMock from "src/__tests__/utils/getPriceMock";
import mockGetCurrencyInfoForTreasuryMint from "src/__tests__/mocks/mockGetCurrencyInfoForTreasuryMint";
import UPDATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_SOL from "src/__tests__/constants/UpdateEditionDistributorWithTreasuryMintTxSol";
import UPDATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_USDC from "src/__tests__/constants/UpdateEditionDistributorWithTreasuryMintTxUsdc";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

type TestCaseName = string;
type TestCase = [
  TestCaseName,
  {
    currency: CurrencyNameExpress_Enum;
    ownerAndCreator: string;
    price: number;
    priceFunctionType: PriceFunctionTypeExpress_Enum;
    priceParams: Array<number>;
    transaction: ParsedTransactionWithMeta;
  }
];

const TEST_CASES: Array<TestCase> = [
  [
    "parse SOL (prior to adding treasury mint)",
    {
      currency: CurrencyNameExpress_Enum.Solana,
      ownerAndCreator: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
      price: 20_000_000,
      priceFunctionType: PriceFunctionTypeExpress_Enum.Linear,
      priceParams: [100_000_000, 500_000_000],
      transaction:
        UPDATE_EDITION_DISTRIBUTOR_TX as unknown as ParsedTransactionWithMeta,
    },
  ],
  [
    "parse SOL (after adding treasury mint)",
    {
      currency: CurrencyNameExpress_Enum.Solana,
      ownerAndCreator: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
      price: 0.2 * LAMPORTS_PER_SOL,
      priceFunctionType: PriceFunctionTypeExpress_Enum.Constant,
      priceParams: [],
      transaction:
        UPDATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_SOL as unknown as ParsedTransactionWithMeta,
    },
  ],
  [
    "parse USDC (after adding treasury mint)",
    {
      currency: CurrencyNameExpress_Enum.UsdCoin,
      ownerAndCreator: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
      price: 2_000_000,
      priceFunctionType: PriceFunctionTypeExpress_Enum.Constant,
      priceParams: [],
      transaction:
        UPDATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_USDC as unknown as ParsedTransactionWithMeta,
    },
  ],
];

describe("parseUpdateEditionDistributorTx tests", () => {
  beforeAll(() => {
    mockGetAuctionHouseInfo();
    mockGetCurrencyInfoForTreasuryMint();
  });

  it.each(TEST_CASES)("parse (%s)", async (_, args) => {
    const {
      currency,
      ownerAndCreator,
      price,
      priceFunctionType,
      priceParams,
      transaction,
    } = args;
    mockGetNftCreatorFromMint(ownerAndCreator);

    const { programId } = getAuctionHouseConstants();
    const decodedTransaction = decodeAuctionHouseTransaction(
      programId,
      transaction
    );
    expect(decodedTransaction).not.toBe(null);
    invariant(decodedTransaction != null);

    const parsed = await parseUpdateEditionDistributorTx(
      transaction,
      decodedTransaction
    );
    const priceMock = getPriceMock(price, currency);

    expect(parsed).not.toBe(null);
    invariant(parsed != null);

    // Make sure tx fields are correct
    const { tx, updateEditionDistributorInfo } = parsed;
    expect(tx.creatorId).toEqual(ownerAndCreator);
    expect(tx.fromAddress).toEqual(ownerAndCreator);
    expect(tx.toAddress).toEqual(ownerAndCreator);
    expect(tx.type).toEqual(
      NftTransactionTypeExpress_Enum.ChangePriceForEditions
    );
    expect(tx.priceInLamports).toEqual(priceMock.amount);
    expect(tx.price!.amount).toEqual(priceMock.amount);
    expect(tx.price!.currencyInfo.name).toEqual(priceMock.currencyInfo.name);

    // Make sure update edition distributor fields are correct
    expect(updateEditionDistributorInfo.endTime).toBe(null);
    expect(updateEditionDistributorInfo.newOwner).toBe(null);
    expect(updateEditionDistributorInfo.startTime).toBe(null);

    expect(updateEditionDistributorInfo.priceFunctionType).toEqual(
      priceFunctionType
    );
    expect(updateEditionDistributorInfo.priceParams).toEqual(priceParams);
    expect(updateEditionDistributorInfo.startingPriceLamports).toEqual(
      priceMock.amount
    );
  });
});
