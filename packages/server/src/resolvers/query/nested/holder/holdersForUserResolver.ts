import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  HoldersForUserInput,
  HoldersForUserResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import convertUser from "src/utils/convert/convertUser";

export default async function holdersForUserResolver(
  context: MyContext,
  input: HoldersForUserInput
): Promise<HoldersForUserResponse> {
  const { verifiedPublicKey } = context;
  const { userId } = input;
  const viewerId = verifiedPublicKey?.toString();
  if (verifiedPublicKey == null || userId !== viewerId) {
    // Can't see holders if you're logged out or not looking
    // at your own holders
    return {
      __typename: Typename.HoldersForUserResponse,
      holders: null,
    };
  }

  const nfts = await getPrisma().nft.findMany({
    include: {
      Owner: { include: CONVERT_USER_INCLUDE },
    },
    where: {
      Creator: { id: userId },
      Owner: { id: { not: { equals: userId } } },
    },
  });
  const nftsDedupedByOwner = removeDuplicatesWithComparison(
    nfts,
    (a, b) => a.Owner.id === b.Owner.id
  );

  return {
    __typename: Typename.HoldersForUserResponse as const,
    holders: nftsDedupedByOwner
      .map((nft) => nft.Owner)
      .map((user) => ({
        __typename: Typename.Holder as const,
        user: convertUser(user),
      })),
  };
}
