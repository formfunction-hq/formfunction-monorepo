import Typename from "src/types/enums/Typename";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CommentExpress,
  CommentsConnection,
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import CONVERT_COMMENT_INCLUDE from "src/constants/include/ConvertCommentInclude";
import convertComment from "src/utils/convert/convertComment";

export default async function getCommentsConnectionForWhereClause(
  after: Maybe<string>,
  first: number,
  where: Prisma.CommentWhereInput,
  _viewerId: Maybe<string>
): Promise<CommentsConnection> {
  // TODO: add visibility and permission controls
  validateFirstInput(first);
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();

  const [comments, totalCount] = await Promise.all([
    prisma.comment.findMany({
      include: CONVERT_COMMENT_INCLUDE,
      orderBy: [{ timeCreated: "asc" }],
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.comment.count({ where }),
  ]);

  const convertedComments: Array<CommentExpress> = comments.map((comment) =>
    convertComment(comment)
  );

  return createOffsetPaginationConnection(
    convertedComments,
    Typename.CommentsEdge,
    Typename.CommentsConnection,
    after,
    first,
    totalCount
  );
}
