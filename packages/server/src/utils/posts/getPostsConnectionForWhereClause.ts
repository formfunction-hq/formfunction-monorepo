import Typename from "src/types/enums/Typename";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import { PostExpress, PostsConnection } from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import CONVERT_POST_INCLUDE from "src/constants/include/ConvertPostInclude";
import convertPost from "src/utils/convert/convertPost";

export default async function getPostsConnectionForWhereClause(
  after: Maybe<string>,
  first: number,
  where: Prisma.PostWhereInput,
  viewerId: Maybe<string>
): Promise<PostsConnection> {
  validateFirstInput(first);
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      include: CONVERT_POST_INCLUDE,
      orderBy: [{ timeCreated: "desc" }],
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.post.count({ where }),
  ]);

  const convertedPosts: Array<PostExpress> = await Promise.all(
    posts.map(async (post) => convertPost(post, viewerId))
  );

  return createOffsetPaginationConnection(
    convertedPosts,
    Typename.PostsEdge,
    Typename.PostsConnection,
    after,
    first,
    totalCount
  );
}
