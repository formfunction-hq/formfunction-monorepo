import MyContext from "src/types/MyContext";
import {
  CreatePostBaseForCampaignInput,
  CreatePostBaseForCampaignResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import createPost from "src/utils/posts/createPost";
import canCreatePost from "src/utils/posts/canCreatePost";

export default async function createPostBaseForCampaignResolver(
  context: MyContext,
  input: CreatePostBaseForCampaignInput
): Promise<CreatePostBaseForCampaignResponse> {
  const {
    campaignSlug,
    creatorId,
    creatorUsername,
    postInput,
    airdropMasterEditionMint,
  } = input;
  const { viewerId, creatorUserId } = await canCreatePost({
    campaignSlug,
    context,
    creatorId,
    creatorUsername,
  });

  return {
    __typename: Typename.CreatePostBaseForCampaignResponse,
    post: await createPost(
      postInput,
      {
        airdropMasterEdition:
          airdropMasterEditionMint != null
            ? { id: airdropMasterEditionMint }
            : undefined,
        campaign: {
          creatorId_slug: { creatorId: creatorUserId!, slug: campaignSlug },
        },
        user: { id: viewerId },
      },
      viewerId
    ),
  };
}
