import { Prisma } from "@prisma/client";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import WHERE_NOT_BURNED from "src/constants/WhereNotBurned";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import convertUser from "src/utils/convert/convertUser";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  ExploreCreatorsSortOrder,
  UserAndMetadataAccountsConnection,
  UsersForExploreInput,
} from "src/__generated__/generated";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import validateFirstInput from "src/utils/validation/validateFirstInput";

const NUM_NFTS = 3;

function getOrderBy(
  sortOrder: ExploreCreatorsSortOrder
): Undef<Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>> {
  switch (sortOrder) {
    case ExploreCreatorsSortOrder.Oldest: {
      return {
        timeCreated: "asc",
      };
    }
    case ExploreCreatorsSortOrder.Newest:
      return {
        timeCreated: "desc",
      };
    default:
      return assertUnreachable(sortOrder);
  }
}

async function usersForExploreConnectionResolver(
  context: MyContext,
  after: Maybe<string>,
  first: number,
  input: UsersForExploreInput
): Promise<UserAndMetadataAccountsConnection> {
  validateFirstInput(first);
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();

  const where: Prisma.UserWhereInput = {
    // User should have created at least one NFT that is not burned. See https://github.com/prisma/prisma/discussions/2772
    Nft_Nft_creatorIdToUser: {
      some: {
        status: {
          not: "Burned",
        },
      },
    },
    isWhitelisted: true,
  };

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      include: {
        ...CONVERT_USER_INCLUDE,
        Nft_Nft_creatorIdToUser: {
          include: CONVERT_NFT_TO_METADATA_INCLUDE,
          orderBy: {
            status: "asc",
          },
          take: NUM_NFTS,
          where: WHERE_NOT_BURNED,
        },
      },
      orderBy: getOrderBy(input.orderBy ?? ExploreCreatorsSortOrder.Newest),
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.user.count({ where }),
  ]);

  const converted = users.map((user) => ({
    __typename:
      Typename.UserAndMetadataAccounts as Typename.UserAndMetadataAccounts,
    metadataAccounts: user.Nft_Nft_creatorIdToUser.map((nft) =>
      convertNftToMetadataAccount(nft)
    ),
    user: convertUser(user),
  }));

  return createOffsetPaginationConnection(
    converted,
    Typename.UserAndMetadataAccountsEdge,
    Typename.UserAndMetadataAccountsConnection,
    after,
    first,
    totalCount
  );
}

export default usersForExploreConnectionResolver;
