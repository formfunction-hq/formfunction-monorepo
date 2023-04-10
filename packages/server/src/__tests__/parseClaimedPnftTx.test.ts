import { decodeGumdropTransaction } from "@formfunction-hq/formfunction-gumdrop";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import getGumdropInfo from "src/utils/solana/getGumdropInfo";
import parseClaimedPnftTx from "src/utils/solana/txs/parse/gumdrop/parseClaimedPnftTx";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import CLAIMED_PNFT_TX from "src/__tests__/constants/ClaimedPnftTx";
import mockGetNftCreatorFromMint from "src/__tests__/mocks/mockGetNftCreatorFromMint";
import invariant from "tiny-invariant";

describe("parseClaimedPnftTx tests", () => {
  it("parse", async () => {
    mockGetNftCreatorFromMint("7B24ixFVAsgciqvfyBEnUvDsZPB9Q4UKyNj795rF7XTU");

    const transaction = CLAIMED_PNFT_TX as unknown as ParsedTransactionWithMeta;
    const decodedTransaction = decodeGumdropTransaction(
      getGumdropInfo().gumdropProgramId,
      transaction
    );
    const parsed = await parseClaimedPnftTx(transaction, decodedTransaction);
    expect(parsed).not.toBe(null);
    invariant(parsed != null);
    const { tx } = parsed;

    expect(tx.creatorId).toEqual(
      "7B24ixFVAsgciqvfyBEnUvDsZPB9Q4UKyNj795rF7XTU"
      // @bonham000
    );
    expect(tx.fromAddress).toEqual(
      "7B24ixFVAsgciqvfyBEnUvDsZPB9Q4UKyNj795rF7XTU"
      // @bonham000
    );
    expect(tx.toAddress).toEqual(
      "5BNvH7hxxeMfJkBYpFArEAy5iaYCypjxVFb1KtbZSLk4"
      // @petrichorate
    );
    expect(tx.type).toEqual(NftTransactionTypeExpress_Enum.ClaimedPnft);
  });
});
