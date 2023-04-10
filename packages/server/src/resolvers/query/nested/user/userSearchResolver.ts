import {
  UserSearchInput,
  UserSearchResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import { Photo, Prisma, User } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import convertUser from "src/utils/convert/convertUser";
import ConvertUserType from "src/types/convert/ConvertUserType";

const DEFAULT_SIMILARITY_THRESHOLD = 0.1;

function getPrismaPhoto({
  id,
  photoUrl,
  timeCreated,
  userId,
}: {
  id: Maybe<string>;
  photoUrl: Maybe<string>;
  timeCreated: Maybe<Date>;
  userId: string;
}): Maybe<Photo> {
  if (id == null || photoUrl == null || timeCreated == null) {
    return null;
  }

  return {
    description: null,
    id,
    photoUrl,
    storagePath: null,
    timeCreated,
    title: null,
    userId,
  };
}

export default async function userSearchResolver(
  context: MyContext,
  input: UserSearchInput
): Promise<UserSearchResponse> {
  const { verifiedPublicKey } = context;
  const userId = verifiedPublicKey?.toString() ?? "";
  const prisma = getPrisma();
  const { usernameOrUserId, first } = input;
  const result: Array<
    User & {
      coverPhotoId: Maybe<string>;
      coverPhotoTimeCreated: Maybe<Date>;
      coverPhotoUrl: Maybe<string>;
      profileId: Maybe<string>;
      profilePhotoTimeCreated: Maybe<Date>;
      profilePhotoUrl: Maybe<string>;
    }
  > = await prisma.$queryRaw(
    // We use raw SQL here since Prisma doesn't support `SIMILARITY` natively
    Prisma.sql`
      SELECT
        "user".*,
        "profilePhoto"."id" as "profilePhotoId",
        "profilePhoto"."photoUrl" as "profilePhotoUrl",
        "profilePhoto"."timeCreated" as "profilePhotoTimeCreated",
        "coverPhoto"."id" as "coverPhotoId",
        "coverPhoto"."photoUrl" as "coverPhotoUrl",
        "coverPhoto"."timeCreated" as "coverPhotoTimeCreated",
        SIMILARITY("user"."username", ${usernameOrUserId}::text) as "similarity"
      FROM "User" "user"
      LEFT JOIN "Photo" "profilePhoto"
        ON "user"."profilePhotoId" = "profilePhoto".id
      LEFT JOIN "Photo" "coverPhoto"
        ON "user"."coverPhotoId" = "coverPhoto".id
      WHERE
        (
          SIMILARITY("user"."username", ${usernameOrUserId}::text) > ${DEFAULT_SIMILARITY_THRESHOLD}::float
          OR "user"."id" = ${usernameOrUserId}::text
        )
        AND "user"."id" NOT IN (${Prisma.join([userId])})
      ORDER BY "similarity" DESC
      LIMIT ${first}::int;
    `
  );

  return {
    __typename: Typename.UserSearchResponse,
    users: result.map((item) => {
      const user: ConvertUserType = {
        ...item,
        Photo_PhotoToUser_coverPhotoId: getPrismaPhoto({
          id: item.coverPhotoId,
          photoUrl: item.coverPhotoUrl,
          timeCreated: item.coverPhotoTimeCreated,
          userId: item.id,
        }),
        Photo_PhotoToUser_profilePhotoId: getPrismaPhoto({
          id: item.profilePhotoId,
          photoUrl: item.profilePhotoUrl,
          timeCreated: item.profilePhotoTimeCreated,
          userId: item.id,
        }),
      };

      return convertUser(user);
    }),
  };
}
