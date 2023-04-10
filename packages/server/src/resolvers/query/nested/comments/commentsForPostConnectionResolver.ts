import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import {
  CommentsConnection,
  CommentsForPostInput,
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import getCommentsConnectionForWhereClause from "src/utils/comments/getCommentsConnectionForWhereClause";

export default async function commentsForPostConnectionResolver(
  context: MyContext,
  after: Maybe<string>,
  first: number,
  input: CommentsForPostInput
): Promise<CommentsConnection> {
  const { verifiedPublicKey } = context;
  const { postId } = input;
  const where: Prisma.CommentWhereInput = {
    Post: { id: postId },
  };

  return getCommentsConnectionForWhereClause(
    after,
    first,
    where,
    verifiedPublicKey?.toString() ?? null
  );
}
