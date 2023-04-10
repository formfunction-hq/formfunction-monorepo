import { PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getTokenAccountOwner from "src/utils/solana/accounts/getTokenAccountOwner";
import getNftMintTokenAccountAddress from "src/utils/solana/getNftMintTokenAccountAddress";

/**
 * Returns the owner of the mint's token account.
 *
 * Mint should correspond to an NFT.
 */
export default async function getNftMintOwner(
  mintAddress: PublicKey
): Promise<Maybe<PublicKey>> {
  const tokenAccountAddress = await getNftMintTokenAccountAddress(mintAddress);

  if (tokenAccountAddress == null) {
    return null;
  }

  const owner = await getTokenAccountOwner(tokenAccountAddress);
  return owner == null ? null : new PublicKey(owner);
}
