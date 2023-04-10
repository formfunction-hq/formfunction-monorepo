import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import MyContext from "src/types/MyContext";
import {
  EditionBuyerInfoInput,
  EditionBuyerInfoResponse,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import convertEditionsMerkleAllowlistInfo from "src/utils/convert/convertEditionsMerkleAllowlistInfo";
import CONVERT_EDITIONS_MERKLE_ALLOWLIST_INFO_INCLUDE from "src/constants/include/ConvertEditionsMerkleAllowlistInfoInclude";
import getViewerId from "src/utils/auth/getViewerId";

async function editionBuyerInfoResolver(
  context: MyContext,
  input: EditionBuyerInfoInput
): Promise<Maybe<EditionBuyerInfoResponse>> {
  const viewerId = getViewerId(context, input.viewerId);

  if (viewerId == null) {
    return {
      __typename: Typename.EditionBuyerInfoResponse,
      numberBought: 0,
    };
  }

  const prisma = getPrisma();
  const [numberBought, allowlistInfo] = await Promise.all([
    prisma.nftTransaction.count({
      where: {
        Nft: {
          masterEditionMint: input.mint,
        },
        toUserId: viewerId,
        type: NftTransactionTypeExpress_Enum.SoldEditionPrimary,
      },
    }),
    prisma.editionsMerkleAllowlistInfo.findUnique({
      include: CONVERT_EDITIONS_MERKLE_ALLOWLIST_INFO_INCLUDE,
      where: {
        userId_nftId: {
          nftId: input.mint,
          userId: viewerId,
        },
      },
    }),
  ]);

  return {
    __typename: Typename.EditionBuyerInfoResponse,
    merkleAllowlistInfo:
      allowlistInfo == null
        ? null
        : await convertEditionsMerkleAllowlistInfo(
            allowlistInfo,
            input.mint,
            viewerId
          ),
    numberBought,
  };
}

export default editionBuyerInfoResolver;
