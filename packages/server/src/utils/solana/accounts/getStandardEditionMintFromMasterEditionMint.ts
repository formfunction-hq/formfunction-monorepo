import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import getParsedTransactionsForAddress from "src/utils/solana/getParsedTransactionsForAddress";
import parseMintNewEditionFromMasterEditionViaTokenTx from "src/utils/solana/txs/parse/metaplex/parseMintNewEditionFromMasterEditionViaTokenTx";
import parseMintNewEditionFromMasterEditionViaVaultProxyTx from "src/utils/solana/txs/parse/metaplex/parseMintNewEditionFromMasterEditionViaVaultProxyTx";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";
import { getMint } from "@solana/spl-token";
import getConnection from "src/utils/solana/getConnection";

/**
 * We will jump from:
 *
 * Master edition mint ->
 * master edition ->
 * Mint New Edition from Master Edition Via Token tx -> limited edition mint
 */
export default async function getStandardEditionMintFromMasterEditionMint(
  mint: PublicKeyOrString
) {
  const masterEdition = await AccountLoader.loadMasterEditionAccount(mint);
  if (masterEdition == null) {
    return null;
  }

  const txs = await getParsedTransactionsForAddress(masterEdition?.address);
  const mintNewEditionTx = txs
    .map(
      (tx) =>
        parseMintNewEditionFromMasterEditionViaTokenTx(tx) ??
        parseMintNewEditionFromMasterEditionViaVaultProxyTx(tx)
    )
    .find((tx) => tx != null);

  if (mintNewEditionTx == null) {
    return null;
  }

  return getMint(getConnection(), mintNewEditionTx.limitedEditionMint);
}
