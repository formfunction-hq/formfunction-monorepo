import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";
import parseCancelTx from "src/utils/solana/txs/parse/parseCancelTx";
import {
  CurrencyNameExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import CANCEL_LISTING_TX from "src/__tests__/constants/CancelListingTx";
import mockGetAuctionHouseInfo from "src/__tests__/mocks/mockGetAuctionHouseInfo";
import mockGetCurrencyInfoForAuctionHouse from "src/__tests__/mocks/mockGetCurrencyInfoForAuctionHouse";
import mockGetNftCreatorFromMint from "src/__tests__/mocks/mockGetNftCreatorFromMint";
import mockGetTokenAccountInfo from "src/__tests__/mocks/mockGetTokenAccountInfo";
import invariant from "tiny-invariant";

type TestCaseName = string;
type TestCase = [
  TestCaseName,
  {
    currency: CurrencyNameExpress_Enum;
    lister: string;
    nftCreatorAddress: string;
    ownerAddress: string;
    price: number;
    transaction: ParsedTransactionWithMeta;
  }
];

const TEST_CASES: Array<TestCase> = [
  [
    "cancel listing",
    {
      currency: CurrencyNameExpress_Enum.Solana,
      lister: "qM7joxSFSGPG4exosa42UQxvdEesq9KV18wiY4bi9HQ",
      nftCreatorAddress: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
      ownerAddress: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
      price: 1_000_000_000,
      transaction: CANCEL_LISTING_TX as unknown as ParsedTransactionWithMeta,
    },
  ],
];

describe("parseCancelTx tests", () => {
  beforeAll(() => {
    mockGetAuctionHouseInfo();
    mockGetCurrencyInfoForAuctionHouse();
  });

  it.each(TEST_CASES)("parse (%s)", async (_, args) => {
    const { lister, ownerAddress, nftCreatorAddress, transaction } = args;
    mockGetNftCreatorFromMint(nftCreatorAddress);
    mockGetTokenAccountInfo({ owner: ownerAddress });

    const { programId } = getAuctionHouseConstants();
    const decodedTransaction = decodeAuctionHouseTransaction(
      programId,
      transaction
    );
    expect(decodedTransaction).not.toBe(null);
    invariant(decodedTransaction != null);

    const parsed = await parseCancelTx(transaction, decodedTransaction);

    expect(parsed).not.toBe(null);
    invariant(parsed != null);

    expect(parsed.tx.creatorId).toEqual(nftCreatorAddress);
    expect(parsed.tx.fromAddress).toEqual(lister);
    expect(parsed.tx.toAddress).toEqual(lister);
    expect(parsed.tx.type).toEqual(
      NftTransactionTypeExpress_Enum.ListingCancelled
    );
  });
});
