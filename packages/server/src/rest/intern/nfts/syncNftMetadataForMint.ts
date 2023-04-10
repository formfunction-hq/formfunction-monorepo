import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";
import syncNftMetadata, {
  SyncNftResult,
  SYNC_NFT_METADATA_INCLUDE,
} from "src/rest/intern/nfts/syncNftMetadata";

export default async function syncNftMetadataForMint(
  mint: string,
  dryRun: boolean
): Promise<SyncNftResult> {
  const prisma = getPrisma();
  const nftMetadata = await prisma.nftMetadata.findUnique({
    include: SYNC_NFT_METADATA_INCLUDE,
    where: {
      mint,
    },
  });

  invariant(nftMetadata != null, `NftMetadata for mint ${mint} does not exit`);

  return syncNftMetadata(nftMetadata, dryRun);
}
