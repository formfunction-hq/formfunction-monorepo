import { ParsedTransactionWithMeta } from "@solana/web3.js";
import invariant from "tiny-invariant";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import mockGetNftCreatorFromMint from "src/__tests__/mocks/mockGetNftCreatorFromMint";
import parseCloseEditionDistributorTokenAccountTx from "src/utils/solana/txs/parse/editions/parseCloseEditionDistributorTokenAccountTx";
import CLOSE_EDITION_DISTRIBUTOR_TOKEN_ACCOUNT_TX_BY_CREATOR from "src/__tests__/constants/CloseEditionDistributorTokenAccountTxByCreator";
import mockGetAuctionHouseInfo from "src/__tests__/mocks/mockGetAuctionHouseInfo";
import CLOSE_EDITION_DISTRIBUTOR_TOKEN_ACCOUNT_TX_BY_AUTHORITY from "src/__tests__/constants/CloseEditionDistributorTokenAccountTxByAuthority";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

type TestCaseName = string;
type TestCase = [
  TestCaseName,
  {
    buyerAddress: string;
    mint: string;
    ownerAndCreator: string;
    price: number;
    transaction: ParsedTransactionWithMeta;
  }
];

const TEST_CASES: Array<TestCase> = [
  [
    "closed by creator",
    {
      buyerAddress: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
      mint: "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
      ownerAndCreator: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
      price: 100_000_000,
      transaction:
        CLOSE_EDITION_DISTRIBUTOR_TOKEN_ACCOUNT_TX_BY_CREATOR as unknown as ParsedTransactionWithMeta,
    },
  ],
];

describe("parseCloseEditionDistributorTokenAccountTx tests", () => {
  beforeAll(() => {
    mockGetAuctionHouseInfo();
  });

  it.each(TEST_CASES)("parse (%s)", async (_, args) => {
    const { ownerAndCreator, transaction } = args;
    mockGetNftCreatorFromMint(ownerAndCreator);

    const { programId } = getAuctionHouseConstants();
    const decodedTransaction = decodeAuctionHouseTransaction(
      programId,
      transaction
    );
    expect(decodedTransaction).not.toBe(null);
    invariant(decodedTransaction != null);

    const parsed = await parseCloseEditionDistributorTokenAccountTx(
      transaction,
      decodedTransaction
    );

    expect(parsed).not.toBe(null);
    invariant(parsed != null);
    invariant(parsed !== "ignore");
    const { tx } = parsed;
    expect(tx.creatorId).toEqual(ownerAndCreator);
    expect(tx.fromAddress).toEqual(ownerAndCreator);
    expect(tx.toAddress).toEqual(ownerAndCreator);
    expect(tx.type).toEqual(
      NftTransactionTypeExpress_Enum.StoppedMintingForEditions
    );
  });

  it("CloseEditionDistributorTokenAccount by authority should be ignored", async () => {
    const transaction =
      CLOSE_EDITION_DISTRIBUTOR_TOKEN_ACCOUNT_TX_BY_AUTHORITY as unknown as ParsedTransactionWithMeta;
    const { programId } = getAuctionHouseConstants();
    const decodedTransaction = decodeAuctionHouseTransaction(
      programId,
      transaction
    );
    expect(decodedTransaction).not.toBe(null);
    invariant(decodedTransaction != null);

    const parsed = await parseCloseEditionDistributorTokenAccountTx(
      transaction,
      decodedTransaction
    );
    expect(parsed).toBe("ignore");
  });
});
