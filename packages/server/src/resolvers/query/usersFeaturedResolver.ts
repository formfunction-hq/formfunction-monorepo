import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import Typename from "src/types/enums/Typename";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import convertUser from "src/utils/convert/convertUser";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftStatusExpress_Enum,
  UserAndMetadataAccounts,
} from "src/__generated__/generated";

async function usersFeaturedResolver(): Promise<
  Array<UserAndMetadataAccounts>
> {
  const prisma = getPrisma();

  const featuredCreators = await getLdFlag(LaunchDarklyFlag.FeaturedCreators, [
    "Gh9es6NG8HrnLk8CURmeK8nJp1JXsa9q3Qr8UgN5pS6a",
    "6tZYmZcJQCy9MhfaiLzVKQXmdvy58Aw9SFzue8rkvrZP",
    "6sEtsFk4Vh2S4aPd8WhDxUgcZA2UK7P5qpCz3NFrgewn",
    "9wPHz2WHhJEdJtQraTfMXZA1iEqhjcwYejAggQh2hPwE",
    "2HGKPfwqp74iovUZCPFvVcBCDbCExqW1GZkS6RD8PBJj",
  ]);

  const users = await prisma.user.findMany({
    include: {
      ...CONVERT_USER_INCLUDE,
      Nft_Nft_creatorIdToUser: {
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        take: 3,
        where: {
          status: {
            not: NftStatusExpress_Enum.Burned,
          },
        },
      },
    },
    orderBy: {
      timeCreated: "desc",
    },
    where: {
      id: {
        in: featuredCreators,
      },
    },
  });

  return users.map((user) => ({
    __typename: Typename.UserAndMetadataAccounts,
    metadataAccounts: user.Nft_Nft_creatorIdToUser.map((nft) =>
      convertNftToMetadataAccount(nft)
    ),
    user: convertUser(user),
  }));
}

export default usersFeaturedResolver;
