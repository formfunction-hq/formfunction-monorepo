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

function isCreateMintIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  tokenMint?: PublicKey
): boolean {
  return (
    ix.programId.equals(TOKEN_PROGRAM_ID) &&
    (ix as ParsedInstruction).parsed.type === "initializeMint" &&
    (tokenMint == null ||
      arePublicKeysEqual((ix as ParsedInstruction).parsed.info.mint, tokenMint))
  );
}

export default async function parseCreateMintTx(
  tx: ParsedTransactionWithMeta,
  tokenMint?: PublicKey
): Promise<Maybe<NftTransactionOnchain>> {
  const ixs = tx.transaction.message.instructions;
  const createMintIx = ixs.find((ix) => isCreateMintIx(ix, tokenMint));

  if (createMintIx == null) {
    return null;
  }

  const { mint, mintAuthority } = (createMintIx as ParsedInstruction).parsed
    .info;

  const creatorAndAddress = await getNftCreatorFromMint(new PublicKey(mint));

  return {
    creatorId: creatorAndAddress.creatorAddress ?? "",
    fromAddress: mintAuthority,
    id: tx.transaction.signatures[0],
    mint,
    timeCreated: dayjs.unix(tx.blockTime!).toDate(),
    toAddress: mintAuthority,
    txid: tx.transaction.signatures[0],
    type: NftTransactionTypeExpress_Enum.Minted,
  };
}
