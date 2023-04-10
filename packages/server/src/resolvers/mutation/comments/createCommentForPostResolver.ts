import MyContext from "src/types/MyContext";
import {
  CreateCommentForPostInput,
  CreateCommentForPostResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import CONVERT_COMMENT_INCLUDE from "src/constants/include/ConvertCommentInclude";
import convertComment from "src/utils/convert/convertComment";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import getViewerIsHolderInclude from "src/utils/campaigns/getViewerIsHolderInclude";
import invariant from "tiny-invariant";
import getPostsForCampaignWhereClause from "src/utils/campaigns/getPostsForCampaignWhereClause";

async function assertViewerCanCommentOnPost(
  input: CreateCommentForPostInput,
  viewerId: string
) {
  const prisma = getPrisma();
  const { postId } = input;
  const post = await prisma.post.findUnique({
    include: {
      Campaign: {
        include: {
          ...CONVERT_CAMPAIGN_INCLUDE,
          CampaignToHolder: getViewerIsHolderInclude(viewerId ?? ""),
        },
      },
    },
    where: { id: postId },
  });
  invariant(post != null, "Post cannot be null");
  if (post.Campaign == null) {
    // If campaign is null, no further validation is needed.
    return;
  }

  const where = await getPostsForCampaignWhereClause(
    {},
    viewerId,
    post.Campaign
  );
  // Although it is a bit redundant to re-query for the post, the intention
  // was to keep the logic as similar as possible to the post visibility restrictions
  // we use when querying for posts in postForCampaignConnectionResolver
  const campaignPost = await prisma.post.findFirst({
    where: { ...where, id: post.id },
  });

  if (campaignPost == null) {
    throw new Error("You do not have permissions to comment on this post!");
  }
}

export default async function createCommentForPostResolver(
  context: MyContext,
  input: CreateCommentForPostInput
): Promise<CreateCommentForPostResponse> {
  const verifiedPublicKey = assertUserSignedRequest(
    context,
    "Please sign in to comment on this post"
  );
  const viewerId = verifiedPublicKey.toString();
  const { postId, comment: inputComment } = input;

  await assertViewerCanCommentOnPost(input, viewerId);

  const createdComment = await getPrisma().comment.create({
    data: {
      Commenter: { connect: { id: verifiedPublicKey.toString() } },
      Post: { connect: { id: postId } },
      comment: inputComment,
    },
    include: CONVERT_COMMENT_INCLUDE,
  });

  return {
    __typename: Typename.CreateCommentForPostResponse,
    comment: convertComment(createdComment),
  };
}
