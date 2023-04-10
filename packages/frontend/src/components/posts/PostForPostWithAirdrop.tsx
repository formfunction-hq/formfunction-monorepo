import graphql from "babel-plugin-relay/macro";
import Post from "components/posts/Post";
import PostHeaderForPostExpress from "components/posts/PostHeaderForPostExpress";
import { useFragment } from "react-relay";
import PostLink from "components/posts/PostLink";
import PostPreviewComments from "components/posts/PostPreviewComments";
import { useState } from "react";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import HideIfEmpty from "components/containers/HideIfEmpty";
import { PostForPostWithAirdrop_PostWithAirdrop$key } from "components/posts/__generated__/PostForPostWithAirdrop_PostWithAirdrop.graphql";
import AssetForNftAsset from "components/assets/AssetForNftAsset";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ColorValue from "types/enums/ColorValue";
import FlexBox from "components/layout/FlexBox";
import IconWithCircleBackground from "components/misc/IconWithCircleBackground";
import GiftIcon from "components/icons/GiftIcon";
import ArtName from "components/text/ArtName";

const fragment = graphql`
  fragment PostForPostWithAirdrop_PostWithAirdrop on PostWithAirdrop {
    id

    nftAsset {
      ...AssetForNftAsset_NftAsset
    }

    reactions {
      totalCount
      viewerReactionType
    }

    comments {
      totalCount
      ...PostPreviewComments_PostComments
    }

    visibilityFundingTiers {
      ... on ICampaignFundingTier {
        title
      }
    }

    ...PostHeaderForPostExpress_PostExpress
    ...PostLink_IPost
  }
`;

type Props = {
  post: PostForPostWithAirdrop_PostWithAirdrop$key;
};

export default function PostForPostWithAirdrop({ post }: Props) {
  const postData = useFragment(fragment, post);
  const {
    nftAsset,
    id,
    reactions: { totalCount, viewerReactionType },
    comments,
    visibilityFundingTiers,
  } = postData;
  const { totalCount: commentCount } = comments;
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const postComments = (
    <PostPreviewComments
      comments={comments}
      onClickSeeMore={() => setIsCommentModalOpen(true)}
    />
  );
  const fundingTierTitles = visibilityFundingTiers?.map(({ title: t }) => t!);

  return (
    <Post
      asset={
        <AssetForNftAsset
          showShimmer={false}
          asset={nftAsset}
          height="100%"
          width="100%"
          objectFit="contain"
        />
      }
      body={null}
      commentInfo={{ comments: postComments, totalCount: commentCount }}
      topSection={
        <FlexBox gap={12} alignItems="flex-start">
          <IconWithCircleBackground
            backgroundColorValue={ColorValue.Shader}
            icon={<GiftIcon colorValue={ColorValue.BrightPurple} size={24} />}
          />
          <FlexBox flexDirection="column" gap={8}>
            <ArtName colorClass={ColorClass.Primary}>Airdrop</ArtName>
            <Body1 colorClass={ColorClass.Secondary}>{`Sent to ${
              fundingTierTitles != null && fundingTierTitles.length > 0
                ? `supporters of ${fundingTierTitles.join(", ")}`
                : "all supporters"
            }`}</Body1>
          </FlexBox>
        </FlexBox>
      }
      isCommentModalOpen={isCommentModalOpen}
      bottomLink={
        <HideIfEmpty>
          <PostLink
            icon={
              <ArrowRightIcon colorValue={ColorValue.BrightPurple} size={24} />
            }
            iconPosition="right"
            post={postData}
          />
        </HideIfEmpty>
      }
      postHeader={<PostHeaderForPostExpress post={postData} />}
      postId={id}
      reactionInfo={{ totalCount, viewerReactionType }}
      setIsCommentModalOpen={setIsCommentModalOpen}
      title=""
    />
  );
}
