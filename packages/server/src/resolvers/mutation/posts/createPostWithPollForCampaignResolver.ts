import MyContext from "src/types/MyContext";
import {
  CreatePostWithPollForCampaignInput,
  CreatePostWithPollForCampaignResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import createPost from "src/utils/posts/createPost";
import canCreatePost from "src/utils/posts/canCreatePost";
import invariant from "tiny-invariant";

export default async function createPostWithPollForCampaignResolver(
  context: MyContext,
  input: CreatePostWithPollForCampaignInput
): Promise<CreatePostWithPollForCampaignResponse> {
  const { campaignSlug, creatorId, creatorUsername, postInput, pollInput } =
    input;
  invariant(postInput.title.length > 0, "Please fill out the title");

  const filteredEmptyOptions = pollInput.pollOptions.filter(
    ({ text }) => text.length > 0
  );

  invariant(
    filteredEmptyOptions.length >= 2,
    "Please fill out at least two options"
  );

  const { viewerId, creatorUserId } = await canCreatePost({
    campaignSlug,
    context,
    creatorId,
    creatorUsername,
  });

  const convertedPost = await createPost(
    postInput,
    {
      campaign: {
        creatorId_slug: { creatorId: creatorUserId!, slug: campaignSlug },
      },
      poll: {
        PollOption: {
          createMany: {
            data: filteredEmptyOptions.map(({ text }) => ({
              text,
            })),
          },
        },
        isMultiSelect: pollInput.isMultiSelect,
      },
      user: { id: viewerId },
    },
    viewerId
  );

  return {
    __typename: Typename.CreatePostWithPollForCampaignResponse,
    post: convertedPost,
  };
}
