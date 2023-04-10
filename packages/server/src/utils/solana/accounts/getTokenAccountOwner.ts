import { ParsedInstruction, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getTokenAccountInfo from "src/utils/solana/getTokenAccountInfo";
import getAllInnerIxs from "src/utils/solana/getAllInnerIxs";
import isInitializeAccountIx from "src/utils/solana/txs/parse/ix/isInitializeAccountIx";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

export default async function getTokenAccountOwner(
  tokenAccount: PublicKey
): Promise<Maybe<string>> {
  // First, try to get the token account info. May return null if account has been closed.
  const tokenAccountInfo = await getTokenAccountInfo(tokenAccount);
  if (tokenAccountInfo != null) {
    return tokenAccountInfo.owner;
  }

  const signatures = await ConnectionWrapper.getConfirmedSignaturesForAddress2(
    tokenAccount
  );

  if (signatures.length === 0) {
    return null;
  }

  // Parse the first tx, which should have created the token account
  const firstSignature = signatures[signatures.length - 1];
  const parsedTx = await ConnectionWrapper.getParsedTransaction(
    firstSignature.signature,
    "confirmed"
  );

  if (parsedTx == null) {
    return null;
  }

  const ixs = parsedTx.transaction.message.instructions;
  const allInnerIxs = getAllInnerIxs(parsedTx) ?? [];

  const initializeAccountIx = [...ixs, ...allInnerIxs].find((ix) =>
    isInitializeAccountIx(ix, tokenAccount.toString())
  );

  if (initializeAccountIx == null) {
    return null;
  }

  return (
    initializeAccountIx as ParsedInstruction
  ).parsed?.info?.owner?.toString();
}
