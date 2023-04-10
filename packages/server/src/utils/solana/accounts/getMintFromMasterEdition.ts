import { PublicKey } from "@solana/web3.js";
import getParsedTransactionsForAddress from "src/utils/solana/getParsedTransactionsForAddress";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import parseCreateMasterEditionTx from "src/utils/solana/txs/parse/metaplex/parseCreateMasterEditionTx";
import { getMint } from "@solana/spl-token";
import getConnection from "src/utils/solana/getConnection";

export default async function getMintFromMasterEdition(
  masterEdition: PublicKeyOrString
) {
  const txs = await getParsedTransactionsForAddress(
    new PublicKey(masterEdition),
    // Just in case the address has a ton of txs (which we've encountered, e.g. 4tiXz58RhKG9AXx8hLTcpAVkRttux1VazB25FcqbyJv7)
    10000
  );

  const createMasterEditionTx = txs.find(
    (tx) => parseCreateMasterEditionTx(tx) != null
  );

  if (createMasterEditionTx == null) {
    return null;
  }

  const parsed = parseCreateMasterEditionTx(createMasterEditionTx);

  return getMint(getConnection(), parsed!.mint);
}
