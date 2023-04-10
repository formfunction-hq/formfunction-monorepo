import { ParsedTransactionWithMeta } from "@solana/web3.js";
import invariant from "tiny-invariant";
import {
  CurrencyNameExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import mockCandyMachineSdk from "src/__tests__/mocks/mockCandyMachineSdk";
import parseSoldGenerativeMintTx from "src/utils/solana/txs/parse/parseSoldGenerativeMintTx";
import SOLD_GENERATIVE_MINT_TX from "src/__tests__/constants/SoldGenerativeMintTx";
import mockGetConnection from "src/__tests__/mocks/mockGetConnection";
import getPriceMock from "src/__tests__/utils/getPriceMock";
import mockGetCurrencyInfoForTreasuryMint from "src/__tests__/mocks/mockGetCurrencyInfoForTreasuryMint";
import { decodeCandyMachineTransaction } from "@formfunction-hq/formfunction-candy-machine";
import loadCandyMachineSdk from "src/utils/solana/loadCandyMachineSdk";

describe("parseSoldGenerativeMintTxNew tests", () => {
  beforeAll(() => {
    mockCandyMachineSdk(100_000_000);
    mockGetConnection();
    mockGetCurrencyInfoForTreasuryMint();
  });

  it("parseSoldGenerativeMintTx", async () => {
    const creator = "9bHQcZZg778Ri9gZV253dXkeQ3RWVQEZsTseH2VNb2eT";
    const transaction =
      SOLD_GENERATIVE_MINT_TX as unknown as ParsedTransactionWithMeta;
    const decodedTransaction = decodeCandyMachineTransaction(
      loadCandyMachineSdk().candyMachineProgramId,
      transaction
    );
    const parsed = await parseSoldGenerativeMintTx(
      transaction,
      decodedTransaction
    );

    const priceMock = getPriceMock(
      100_000_000,
      CurrencyNameExpress_Enum.Solana
    );
    expect(parsed).not.toBe(null);
    invariant(parsed != null);
    const { tx: parsedTx } = parsed;
    expect(parsedTx.creatorId).toEqual(creator);
    expect(parsedTx.fromAddress).toEqual(creator);
    expect(parsedTx.toAddress).toEqual(
      "9bHQcZZg778Ri9gZV253dXkeQ3RWVQEZsTseH2VNb2eT"
    );
    expect(parsedTx.type).toEqual(
      NftTransactionTypeExpress_Enum.SoldGenerativeMint
    );
    expect(parsedTx.mint).toEqual(
      "2rP2VievkxM6sTaWAeWVhj5Z1YVQAeSbYJ6fh1XHxRA8"
    );
    expect(parsedTx.price!.amount).toEqual(priceMock.amount);
    expect(parsedTx.price!.currencyInfo.name).toEqual(
      priceMock.currencyInfo.name
    );
  });
});
