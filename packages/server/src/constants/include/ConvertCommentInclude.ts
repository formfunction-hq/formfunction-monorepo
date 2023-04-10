import { Prisma } from "@prisma/client";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

const CONVERT_COMMENT_INCLUDE = {
  Commenter: { include: CONVERT_USER_INCLUDE },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.CommentInclude;

export default CONVERT_COMMENT_INCLUDE;
