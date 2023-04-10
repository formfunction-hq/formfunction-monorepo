import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  ParsedTransactionWithMeta,
  ParsedInstruction,
  PartiallyDecodedInstruction,
  PublicKey,
} from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import dayjs from "src/utils/dates/dayjsex";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import findIxWithIndices from "src/utils/solana/txs/parse/findIxWithIndices";

function isBurnIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  tokenMint?: PublicKey
): boolean {
  return (
    ix.programId.equals(TOKEN_PROGRAM_ID) &&
    ["burn"].includes((ix as ParsedInstruction).parsed?.type) &&
    (tokenMint == null ||
      arePublicKeysEqual(
        (ix as ParsedInstruction).parsed?.info?.mint ?? "",
        tokenMint
      ))
  );
}

export default async function parseBurnTx(
  tx: ParsedTransactionWithMeta,
  tokenMint?: PublicKey
): Promise<Maybe<NftTransactionOnchain>> {
  const ixWithIndices = findIxWithIndices(tx, (ix) => isBurnIx(ix, tokenMint));
  if (ixWithIndices == null) {
    return null;
  }
  const { ix: burnIx, ixIndex, ixInnerIndex } = ixWithIndices;
  const burnIxParsed = burnIx as ParsedInstruction;

  const fromAndTo = (
    burnIxParsed.parsed.info.authority ??
    burnIxParsed.parsed.info.multisigAuthority
  ).toString();

  const tokenMintForIx = new PublicKey(burnIxParsed.parsed.info.mint);

  if (tokenMint != null && !tokenMint.equals(tokenMintForIx)) {
    return null;
  }

  const creator = await getNftCreatorFromMint(tokenMintForIx);

  return {
    creatorId: creator.creatorAddress ?? "",
    fromAddress: fromAndTo,
    id: tx.transaction.signatures[0],
    ixIndex,
    ixInnerIndex,
    mint: tokenMintForIx.toString(),
    timeCreated: dayjs.unix(tx.blockTime!).toDate(),
    toAddress: fromAndTo,
    txid: tx.transaction.signatures[0],
    type: NftTransactionTypeExpress_Enum.Burned,
  };
}
