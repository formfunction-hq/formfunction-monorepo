import invariant from "tiny-invariant";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import refreshMetadata from "src/utils/nft/refreshMetadata";
import {
  MetadataAccount,
  RefreshMetadataInput,
} from "src/__generated__/generated";
import syncNftMetadata, {
  SYNC_NFT_METADATA_INCLUDE,
} from "src/rest/intern/nfts/syncNftMetadata";

export default async function refreshMetadataResolver(
  context: MyContext,
  input: RefreshMetadataInput
): Promise<MetadataAccount> {
  const prisma = getPrisma();
  const [nft, nftMetadata] = await Promise.all([
    prisma.nft.findUnique({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      where: {
        mint: input.mint,
      },
    }),
    prisma.nftMetadata.findUnique({
      include: SYNC_NFT_METADATA_INCLUDE,
      where: {
        mint: input.mint,
      },
    }),
  ]);

  invariant(nft != null, `Nft for mint ${input.mint} does not exit`);
  invariant(
    nftMetadata != null,
    `NftMetadata for mint ${input.mint} does not exit`
  );
  // This name is a bit misleading, it actually just makes sure we've inserted
  // all relevant transactions for the NFT
  const { metadataAccount } = await refreshMetadata(nft, context.req);

  // This actually updates the metadata (if needed)
  await syncNftMetadata(nftMetadata, false);

  return metadataAccount;
}
