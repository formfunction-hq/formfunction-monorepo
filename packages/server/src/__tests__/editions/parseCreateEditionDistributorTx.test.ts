import { LAMPORTS_PER_SOL, ParsedTransactionWithMeta } from "@solana/web3.js";
import invariant from "tiny-invariant";
import {
  CurrencyNameExpress_Enum,
  NftTransactionTypeExpress_Enum,
  PriceFunctionTypeExpress_Enum,
} from "src/__generated__/generated";
import CREATE_EDITION_DISTRIBUTOR_TX from "src/__tests__/constants/CreateEditionDistributorTx";
import mockGetNftCreatorFromMint from "src/__tests__/mocks/mockGetNftCreatorFromMint";
import mockGetAuctionHouseInfo from "src/__tests__/mocks/mockGetAuctionHouseInfo";
import mockGetCurrencyInfoForTreasuryMint from "src/__tests__/mocks/mockGetCurrencyInfoForTreasuryMint";
import getPriceMock from "src/__tests__/utils/getPriceMock";
import CREATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_SOL from "src/__tests__/constants/CreateEditionDistributorWithTreasuryMintTxSol";
import CREATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_USDC from "src/__tests__/constants/CreateEditionDistributorWithTreasuryMintTxUsdc";
import parseCreateEditionDistributorTx from "src/utils/solana/txs/parse/editions/parseCreateEditionDistributorTx";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

type TestCaseName = string;
type TestCase = [
  TestCaseName,
  {
    currency: CurrencyNameExpress_Enum;
    listerAndCreator: string;
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
      listerAndCreator: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
      price: 0.1 * LAMPORTS_PER_SOL,
      priceFunctionType: PriceFunctionTypeExpress_Enum.Linear,
      priceParams: [1e8, 3e8],
      transaction:
        CREATE_EDITION_DISTRIBUTOR_TX as unknown as ParsedTransactionWithMeta,
    },
  ],
  [
    "parse SOL (after adding treasury mint)",
    {
      currency: CurrencyNameExpress_Enum.Solana,
      listerAndCreator: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
      price: 0.1 * LAMPORTS_PER_SOL,
      priceFunctionType: PriceFunctionTypeExpress_Enum.Constant,
      priceParams: [],
      transaction:
        CREATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_SOL as unknown as ParsedTransactionWithMeta,
    },
  ],
  [
    "parse USDC (after adding treasury mint)",
    {
      currency: CurrencyNameExpress_Enum.UsdCoin,
      listerAndCreator: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
      price: 1_000_000,
      priceFunctionType: PriceFunctionTypeExpress_Enum.Constant,
      priceParams: [],
      transaction:
        CREATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_USDC as unknown as ParsedTransactionWithMeta,
    },
  ],
];

describe("parseCreateEditionDistributorTx tests", () => {
  beforeAll(() => {
    mockGetAuctionHouseInfo();
    mockGetCurrencyInfoForTreasuryMint();
  });

  it.each(TEST_CASES)("parse (%s)", async (_, args) => {
    const {
      currency,
      listerAndCreator,
      price,
      priceFunctionType,
      priceParams,
      transaction,
    } = args;
    mockGetNftCreatorFromMint(listerAndCreator);

    const { programId } = getAuctionHouseConstants();
    const decodedTransaction = decodeAuctionHouseTransaction(
      programId,
      transaction
    );
    expect(decodedTransaction).not.toBe(null);
    invariant(decodedTransaction != null);

    const parsed = await parseCreateEditionDistributorTx(
      transaction,
      decodedTransaction
    );

    const priceMock = getPriceMock(price, currency);
    expect(parsed).not.toBe(null);
    invariant(parsed != null);
    const { createEditionDistributorInfo, tx } = parsed;
    expect(tx.creatorId).toEqual(listerAndCreator);
    expect(tx.fromAddress).toEqual(listerAndCreator);
    expect(tx.toAddress).toEqual(listerAndCreator);
    expect(tx.type).toEqual(NftTransactionTypeExpress_Enum.ListedEditions);
    expect(tx.priceInLamports).toEqual(priceMock.amount);
    expect(tx.price!.amount).toEqual(priceMock.amount);
    expect(tx.price!.currencyInfo.name).toEqual(priceMock.currencyInfo.name);

    expect(createEditionDistributorInfo.priceParams).toEqual(priceParams);
    expect(createEditionDistributorInfo.priceFunctionType).toEqual(
      priceFunctionType
    );
    expect(createEditionDistributorInfo.startingPriceLamports).toEqual(
      priceMock.amount
    );
  });
});
