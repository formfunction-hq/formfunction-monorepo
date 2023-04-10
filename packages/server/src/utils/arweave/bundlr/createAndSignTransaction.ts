import { createData, signers, DataItem } from "arbundles";
import nullthrows from "nullthrows";

/**
 * Create a transaction by directly using arbundles.
 * This is done to ensure that the txid is identical
 * for identical input data. The Bundlr JS Client
 * intentionally randomizes txids for ALL currencies
 * to match the Arweave behavior (from Bundlr team).
 */
export default async function createAndSignTransaction(
  data: string | Uint8Array,
  tags: Array<{
    name: string;
    value: string;
  }>
): Promise<DataItem> {
  const solanaSigner = signers.SolanaSigner;
  // eslint-disable-next-line new-cap
  const signer = new solanaSigner(
    nullthrows(process.env.SOLANA_KEY, "Solana wallet pkey is not set!")
  );
  const tx = createData(data, signer, { tags });
  await tx.sign(signer);

  return tx;
}
