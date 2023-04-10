import getOnPlatformMetadataAccounts from "src/utils/prisma/getOnPlatformMetadataAccounts";
import { MetadataAccount } from "src/__generated__/generated";

/**
 * Fetches on-platform NFT. Avoids RPC calls for perf issues—assumes DB is accurate.
 */
export default async function getOnPlatformMetadataAccount(
  mint: string
): Promise<MetadataAccount> {
  const accounts = await getOnPlatformMetadataAccounts([mint]);
  return accounts[0];
}
