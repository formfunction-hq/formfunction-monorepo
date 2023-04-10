import {
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { TOKEN_METADATA_PROGRAM_ID } from "formfn-shared/dist/constants/SolanaConstants";
import base58ToHex from "src/utils/base58ToHex";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";

const MINT_INDEX = 1;

function isCreateMasterEditionIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction
): boolean {
  // @ts-ignore
  const data = ix.data ?? "";
  return (
    arePublicKeysEqual(ix.programId, TOKEN_METADATA_PROGRAM_ID) &&
    // First byte of ix data is the ix discriminator
    base58ToHex(data).startsWith("0a")
  );
}

export default function parseCreateMasterEditionTx(
  tx: ParsedTransactionWithMeta
) {
  const { instructions } = tx.transaction.message;
  const createIx = instructions.find((ix) =>
    isCreateMasterEditionIx(ix)
  ) as Maybe<PartiallyDecodedInstruction>;

  if (createIx == null) {
    return null;
  }

  return {
    mint: createIx.accounts[MINT_INDEX],
  };
}
