import ConvertEditionsMerkleAllowlistInfoType from "src/types/convert/ConvertEditionsMerkleAllowlistInfoType";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  EditionsMerkleAllowlistInfoExpress,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";

export default async function convertEditionsMerkleAllowlistInfo(
  allowlistInfo: ConvertEditionsMerkleAllowlistInfoType,
  masterEditionMint: string,
  userId: string
): Promise<EditionsMerkleAllowlistInfoExpress> {
  const { editionPublicSaleStartTime } = allowlistInfo.Nft.NftListing!;
  const amountMinted = await getPrisma().nftTransaction.count({
    where: {
      Nft: {
        masterEditionMint,
      },
      timeCreated:
        editionPublicSaleStartTime == null
          ? undefined
          : {
              lt: editionPublicSaleStartTime,
            },
      toUserId: userId,
      type: NftTransactionTypeExpress_Enum.SoldEditionPrimary,
    },
  });

  return {
    __typename: Typename.EditionsMerkleAllowlistInfo,
    amountAllowed: allowlistInfo.amountAllowed,
    amountMinted,
    id: allowlistInfo.id,
    proof: allowlistInfo.proof,
    rootIndex: allowlistInfo.rootIndex,
  };
}
