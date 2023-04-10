import Typename from "src/types/enums/Typename";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import getPrisma from "src/utils/prisma/getPrisma";
import { PnftInfoInput, PnftInfoResponse } from "src/__generated__/generated";

export default async function pnftInfoResolver(
  input: PnftInfoInput
): Promise<PnftInfoResponse> {
  const prisma = getPrisma();

  const result = await prisma.nft.findUnique({
    include: {
      NftListing: {
        include: {
          Nft_NftToNftListing_pnftIdForAuction: {
            include: CONVERT_NFT_TO_METADATA_INCLUDE,
          },
        },
      },
    },
    where: {
      id: input.auctionNftMint,
    },
  });

  const pnft = result?.NftListing?.Nft_NftToNftListing_pnftIdForAuction;
  if (result == null || pnft == null) {
    return {
      __typename: Typename.PnftInfoResponse,
      metadataAccount: null,
    };
  }
  return {
    __typename: Typename.PnftInfoResponse,
    metadataAccount: convertNftToMetadataAccount(pnft),
  };
}
