import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { UserExpress } from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import convertUser from "src/utils/convert/convertUser";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import { Nft } from "@metaplex-foundation/js";

export default async function getMetadataAccountFirstCreator(
  metadataAccount: Nft
): Promise<{ creator: Maybe<UserExpress>; creatorAddress: Maybe<string> }> {
  const { creators } = metadataAccount;
  const creatorAddress =
    creators == null || creators.length === 0 ? null : creators[0].address;

  if (creatorAddress == null) {
    return { creator: null, creatorAddress };
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    include: CONVERT_USER_INCLUDE,
    where: { id: creatorAddress.toString() },
  });

  return {
    creator: user == null ? null : convertUser(user),
    creatorAddress: creatorAddress.toString(),
  };
}
