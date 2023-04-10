import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  ParsedInstruction,
  PublicKey,
  PartiallyDecodedInstruction,
  ParsedTransactionWithMeta,
} from "@solana/web3.js";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import getParsedTransactionsForAddress from "src/utils/solana/getParsedTransactionsForAddress";
import getNftMintTokenAccountAddress from "src/utils/solana/getNftMintTokenAccountAddress";
import findIxWithIndices from "src/utils/solana/txs/parse/findIxWithIndices";

function isSetAuthorityIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  tokenAccount?: string,
  authority?: string,
  newAuthority?: string
) {
  return (
    ix.programId.equals(TOKEN_PROGRAM_ID) &&
    "parsed" in ix &&
    ix.parsed?.type === "setAuthority" &&
    (tokenAccount == null || ix.parsed?.info?.account === tokenAccount) &&
    (authority == null ||
      ix.parsed?.info?.authority === authority ||
      ix.parsed?.info?.multisigAuthority === authority) &&
    (newAuthority == null || ix.parsed?.info?.newAuthority === newAuthority)
  );
}

/**
 * Attempts to fetch most recent tx with a SetAuthority ix for the token
 * account that currently holds the NFT associated with the given mint.
 *
 * This is primarily used for the areNftsSynced endpoint where we try
 * to correct NFTs that have a different owner onchain when compared to our db.
 */
export default async function getMostRecentSetAuthorityTxForMint(
  mint: PublicKey,
  authority?: string,
  newAuthority?: string
): Promise<
  MaybeUndef<{
    ix: ParsedInstruction | PartiallyDecodedInstruction;
    ixIndex: number;
    ixInnerIndex: MaybeUndef<number>;
    tx: ParsedTransactionWithMeta;
  }>
> {
  const tokenAccountAddress = await getNftMintTokenAccountAddress(mint);

  if (tokenAccountAddress == null) {
    return null;
  }

  const txs = (
    await getParsedTransactionsForAddress(tokenAccountAddress)
  )?.sort(getCompareByProperty("blockTime", SortOrder.Desc));
  if (txs == null) {
    return null;
  }

  return txs
    .map((tx) => {
      const setAuthorityIx = findIxWithIndices(tx, (ix) =>
        isSetAuthorityIx(
          ix,
          tokenAccountAddress.toString(),
          authority,
          newAuthority
        )
      );
      return setAuthorityIx != null
        ? {
            ...setAuthorityIx,
            tx,
          }
        : null;
    })
    .find((item) => item != null);
}
