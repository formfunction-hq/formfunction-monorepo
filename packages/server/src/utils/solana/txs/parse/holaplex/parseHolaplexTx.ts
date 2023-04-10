import { ParsedTransactionWithMeta } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import parseHolaplexBidTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexBidTx";
import parseHolaplexClaimBidTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexClaimBidTx";
import parseHolaplexRedeemFullRightsTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexRedeemFullRightsTx";
import parseHolaplexRedeemPrintingTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexRedeemPrintingTx";
import parseHolaplexRedeemTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexRedeemTx";

/**
 * See https://github.com/metaplex-foundation/metaplex-program-library/blob/master/auction/program/src/instruction.rs
 * for more info about Holaplex instructions (they use the Metaplex auction program).
 *
 * Currently we only support parsing bid and claim bid txs (the latter we parse as a "sold" tx).
 * There are more txs, but Holaplex doesn't display them in their UI.
 */
export default function parseHolaplexTx(
  tx: Maybe<ParsedTransactionWithMeta>,
  // Cannot (easily) get this info from txs
  mint: PublicKeyOrString,
  // Cannot (easily) get this info from txs
  creatorId: PublicKeyOrString
): Maybe<NftTransactionOnchain> {
  if (tx == null || tx.meta?.err != null) {
    return null;
  }

  const bidTx = parseHolaplexBidTx(tx, mint, creatorId);
  if (bidTx != null) {
    return bidTx;
  }

  const claimBidTx = parseHolaplexClaimBidTx(tx, mint, creatorId);
  if (claimBidTx != null) {
    return claimBidTx;
  }

  const redeemTx = parseHolaplexRedeemTx(tx, mint);
  if (redeemTx != null) {
    return redeemTx[0];
  }

  const redeemPrintingTx = parseHolaplexRedeemPrintingTx(tx, mint);
  if (redeemPrintingTx != null) {
    return redeemPrintingTx[0];
  }

  const redeemFullRightsTx = parseHolaplexRedeemFullRightsTx(tx, mint);
  if (redeemFullRightsTx != null) {
    return redeemFullRightsTx[0];
  }

  return null;
}
