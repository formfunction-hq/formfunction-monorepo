import graphql from "babel-plugin-relay/macro";
import Post from "components/posts/Post";
import PostHeaderForPostExpress from "components/posts/PostHeaderForPostExpress";
import PostPreviewComments from "components/posts/PostPreviewComments";
import { PostForPostWithPoll_PostWithPoll$key } from "components/posts/__generated__/PostForPostWithPoll_PostWithPoll.graphql";
import { useState } from "react";
import { useFragment } from "react-relay";
import PollOptionForPollOptionExpress from "components/posts/PollOptionForPollOptionExpress";
import FlexBox from "components/layout/FlexBox";
import { nanoid } from "nanoid";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import styles from "css/posts/PostForPostWithPoll.module.css";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import pluralize from "formfn-shared/dist/utils/pluralize";

const fragment = graphql`
  fragment PostForPostWithPoll_PostWithPoll on PostWithPoll {
    id
    title
    reactions {
      totalCount
      viewerReactionType
    }

    comments {
      totalCount
      ...PostPreviewComments_PostComments
    }

    poll {
      id
      options {
        ...PollOptionForPollOptionExpress_PollOptionExpress
      }
      totalResponses
      viewerRespondedToPoll
      ...PollOptionForPollOptionExpress_PollExpress
    }

    pollAsset: asset {
      ...AssetForAssetExpress_AssetExpress
    }

    ...PostHeaderForPostExpress_PostExpress
  }
`;

type Props = {
  post: PostForPostWithPoll_PostWithPoll$key;
};

export default function PostForPostWithPoll({ post }: Props) {
  const postData = useFragment(fragment, post);

  const { id, title, reactions, comments, poll, pollAsset } = postData;

  const { totalCount, viewerReactionType } = reactions ?? {};
  const { totalCount: commentCount } = comments ?? {};
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const postComments = (
    <PostPreviewComments
      comments={comments}
      onClickSeeMore={() => setIsCommentModalOpen(true)}
    />
  );

  const pollBody = (
    <FlexBox gap={24} flexDirection="column">
      {poll.options.map((pollOption) => (
        <PollOptionForPollOptionExpress
          key={nanoid()}
          poll={poll}
          pollOption={pollOption}
        />
      ))}
      <Body2 colorClass={ColorClass.Secondary}>
        {poll.viewerRespondedToPoll
          ? `${poll.totalResponses} ${pluralize("vote", poll.totalResponses)}`
          : "Vote to see the results"}
      </Body2>
    </FlexBox>
  );

  return (
    <Post
      asset={
        pollAsset && (
          <AssetForAssetExpress
            className={styles.assetContainer}
            showOverlay
            showShimmer={false}
            asset={pollAsset}
            height="100%"
            width="100%"
            objectFit="contain"
          />
        )
      }
      body={pollBody}
      commentInfo={{ comments: postComments, totalCount: commentCount }}
      isCommentModalOpen={isCommentModalOpen}
      postHeader={<PostHeaderForPostExpress post={postData} />}
      postId={id}
      reactionInfo={{ totalCount, viewerReactionType }}
      setIsCommentModalOpen={setIsCommentModalOpen}
      title={`Poll: ${title}`}
    />
  );
}
