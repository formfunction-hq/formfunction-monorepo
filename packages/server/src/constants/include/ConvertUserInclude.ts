import { Prisma } from "@prisma/client";

const CONVERT_USER_INCLUDE = {
  Photo_PhotoToUser_coverPhotoId: true,
  Photo_PhotoToUser_profilePhotoId: true,
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.UserInclude;

export default CONVERT_USER_INCLUDE;
