import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import Typename from "src/types/enums/Typename";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  PnftAuctionNftsInput,
  PnftAuctionNftsResponse,
} from "src/__generated__/generated";

export default async function pnftAuctionNftsResolver(
  input: PnftAuctionNftsInput
): Promise<PnftAuctionNftsResponse> {
  const prisma = getPrisma();

  const auctionNfts = await prisma.nft.findMany({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    where: {
      NftListing: {
        pnftIdForAuction: input.masterEditionPnftId,
      },
    },
  });

  const metadataAccounts = auctionNfts.map((nft) =>
    convertNftToMetadataAccount(nft)
  );

  return {
    __typename: Typename.PnftAuctionNftsResponse,
    metadataAccounts,
  };
}
