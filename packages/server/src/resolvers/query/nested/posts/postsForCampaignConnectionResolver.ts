import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import {
  PostsConnection,
  PostsForCampaignInput,
} from "src/__generated__/generated";
import getPostsConnectionForWhereClause from "src/utils/posts/getPostsConnectionForWhereClause";
import invariant from "tiny-invariant";
import getPostsForCampaignWhereClause from "src/utils/campaigns/getPostsForCampaignWhereClause";
import getViewerId from "src/utils/auth/getViewerId";

export default async function postsForCampaignConnectionResolver(
  context: MyContext,
  after: Maybe<string>,
  first: number,
  input: PostsForCampaignInput
): Promise<PostsConnection> {
  const { creatorId, creatorUsername } = input;
  invariant(
    creatorId != null || creatorUsername != null,
    "One of creator ID or creator username must be non-null!"
  );
  const viewerId = getViewerId(context, input.viewerId);
  const where = await getPostsForCampaignWhereClause(input, viewerId ?? "");

  return getPostsConnectionForWhereClause(after, first, where, viewerId);
}
