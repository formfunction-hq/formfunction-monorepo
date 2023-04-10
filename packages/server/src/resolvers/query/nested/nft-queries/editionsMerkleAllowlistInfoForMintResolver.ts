import MyContext from "src/types/MyContext";
import {
  EditionsMerkleAllowlistInfoForMintInput,
  EditionsMerkleAllowlistInfoForMintResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import convertEditionsMerkleAllowlistInfo from "src/utils/convert/convertEditionsMerkleAllowlistInfo";
import CONVERT_EDITIONS_MERKLE_ALLOWLIST_INFO_INCLUDE from "src/constants/include/ConvertEditionsMerkleAllowlistInfoInclude";
import getViewerId from "src/utils/auth/getViewerId";

const EMPTY_RESPONSE = {
  __typename: Typename.EditionsMerkleAllowlistInfoForMintResponse,
} as const;

export default async function editionsMerkleAllowlistInfoForMintResolver(
  context: MyContext,
  input: EditionsMerkleAllowlistInfoForMintInput
): Promise<EditionsMerkleAllowlistInfoForMintResponse> {
  const viewerId = getViewerId(context, input.viewerId);
  if (viewerId == null) {
    return EMPTY_RESPONSE;
  }

  const prisma = getPrisma();
  const allowlistInfo = await prisma.editionsMerkleAllowlistInfo.findUnique({
    include: CONVERT_EDITIONS_MERKLE_ALLOWLIST_INFO_INCLUDE,
    where: {
      userId_nftId: {
        nftId: input.mint,
        userId: viewerId,
      },
    },
  });
  if (allowlistInfo == null) {
    return EMPTY_RESPONSE;
  }

  return {
    __typename: Typename.EditionsMerkleAllowlistInfoForMintResponse,
    merkleAllowlistInfo: await convertEditionsMerkleAllowlistInfo(
      allowlistInfo,
      input.mint,
      viewerId
    ),
  };
}
