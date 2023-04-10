import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import getMintFromMasterEdition from "src/utils/solana/accounts/getMintFromMasterEdition";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";

export default async function getMasterEditionMintFromStandardEditionMint(
  mint: PublicKeyOrString
) {
  const standardEdition = await AccountLoader.loadStandardEditionAccount(mint);
  if (standardEdition == null) {
    return null;
  }

  const masterEdition = standardEdition.parent;
  return getMintFromMasterEdition(masterEdition);
}
