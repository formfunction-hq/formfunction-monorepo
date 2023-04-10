import {
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { TOKEN_METADATA_PROGRAM_ID } from "formfn-shared/dist/constants/SolanaConstants";
import base58ToHex from "src/utils/base58ToHex";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";

const LIMITED_EDITION_MINT_INDEX = 3;

function isMintNewEditionFromMasterEditionViaTokenIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction
): boolean {
  // @ts-ignore
  const data = ix.data ?? "";
  return (
    arePublicKeysEqual(ix.programId, TOKEN_METADATA_PROGRAM_ID) &&
    // First byte of ix data is the ix discriminator
    base58ToHex(data).startsWith("0b")
  );
}

export default function parseMintNewEditionFromMasterEditionViaTokenTx(
  tx: ParsedTransactionWithMeta
) {
  const { instructions } = tx.transaction.message;
  const innerInstructions = (tx.meta?.innerInstructions ?? [])
    .map((innerIx) => innerIx.instructions)
    .flat();
  const mintNewEditionIx = [...instructions, ...innerInstructions].find((ix) =>
    isMintNewEditionFromMasterEditionViaTokenIx(ix)
  ) as Maybe<PartiallyDecodedInstruction>;

  if (mintNewEditionIx == null) {
    return null;
  }

  return {
    limitedEditionMint: mintNewEditionIx.accounts[LIMITED_EDITION_MINT_INDEX],
  };
}
