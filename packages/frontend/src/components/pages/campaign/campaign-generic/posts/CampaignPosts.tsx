import graphql from "babel-plugin-relay/macro";
import FlexBox from "components/layout/FlexBox";
import { CampaignPosts_Query$key } from "components/pages/campaign/campaign-generic/posts/__generated__/CampaignPosts_Query.graphql";
import PostForPostTextOnly from "components/posts/PostForPostTextOnly";
import PostForPostWithAirdrop from "components/posts/PostForPostWithAirdrop";
import PostForPostWithPoll from "components/posts/PostForPostWithPoll";
import PostForPostWithSingleAsset from "components/posts/PostForPostWithSingleAsset";
import PostSkeleton from "components/posts/skeletons/PostSkeleton";
import ArtName from "components/text/ArtName";
import Body2 from "components/text/Body2";
import { CAMPAIGN_POSTS_PAGE_SIZE } from "constants/PageSizes";
import RELAY_FUTURE_UNION_VALUE from "constants/RelayFutureUnionValue";
import { RelayConnectionIdsProvider } from "context/RelayConnectionIdsContext";
import { FlexboxProps } from "flexbox-react";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { postsForCampaignQuery } from "hooks/campaign/usePostsForCampaign";
import { usePostsForCampaignQuery } from "hooks/campaign/__generated__/usePostsForCampaignQuery.graphql";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import { useCommentsForPostQuery } from "hooks/__generated__/useCommentsForPostQuery.graphql";
import { Suspense, useEffect } from "react";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import ColorClass from "types/enums/ColorClass";

const fragment = graphql`
  fragment CampaignPosts_Query on query_root
  @refetchable(queryName: "CampaignCommunityPostsPaginationQuery") {
    PostsNamespace {
      postsForCampaign {
        posts(input: $input, after: $after, first: $first)
          @connection(key: "CampaignCommunityPosts_Query_posts") {
          __id
          edges {
            node {
              ... on PostTextOnly {
                __typename
                id
                ...PostForPostTextOnly_PostTextOnly
              }
              ... on PostWithSingleAsset {
                __typename
                id
                ...PostForPostWithSingleAsset_PostWithSingleAsset
              }
              ... on PostWithPoll {
                __typename
                id
                ...PostForPostWithPoll_PostWithPoll
              }
              ... on PostWithAirdrop {
                __typename
                id
                ...PostForPostWithAirdrop_PostWithAirdrop
              }
            }
          }
        }
      }
    }
  }
`;

function Layout({
  alignItems,
  children,
}: {
  alignItems: FlexboxProps["alignItems"];
  children: any;
}) {
  return (
    <FlexBox
      flexDirection="column"
      gap={32}
      alignItems={alignItems}
      width="100%"
    >
      {children}
    </FlexBox>
  );
}

function Content({
  alignItems,
  postsForCampaign,
}: {
  alignItems: FlexboxProps["alignItems"];
  postsForCampaign: CampaignPosts_Query$key;
}) {
  const {
    data: postsData,
    hasNext,
    isLoadingNext,
    loadNext,
  } = usePaginationFragment<useCommentsForPostQuery, CampaignPosts_Query$key>(
    fragment,
    postsForCampaign
  );
  const {
    CampaignPosts: { setConnectionId: setCampaignPostsConnectionId },
  } = useRelayConnectionIdsContext();

  useLoadNextOnBottomScroll(
    hasNext && !isLoadingNext,
    loadNext,
    CAMPAIGN_POSTS_PAGE_SIZE
  );

  useEffect(() => {
    setCampaignPostsConnectionId(
      postsData?.PostsNamespace?.postsForCampaign?.posts.__id ?? ""
    );
  }, [
    postsData?.PostsNamespace?.postsForCampaign?.posts.__id,
    setCampaignPostsConnectionId,
  ]);

  const postNodes = postsData.PostsNamespace?.postsForCampaign?.posts.edges.map(
    ({ node }) => node
  );
  if (postNodes == null) {
    return null;
  }

  const posts = postNodes.map((postNode) => {
    const postType = postNode.__typename;
    switch (postType) {
      case "PostTextOnly":
        return <PostForPostTextOnly key={postNode.id} post={postNode} />;
      case "PostWithSingleAsset":
        return <PostForPostWithSingleAsset key={postNode.id} post={postNode} />;
      case "PostWithPoll":
        return <PostForPostWithPoll key={postNode.id} post={postNode} />;
      case "PostWithAirdrop":
        return <PostForPostWithAirdrop key={postNode.id} post={postNode} />;
      case RELAY_FUTURE_UNION_VALUE:
        return null;
      default:
        return assertUnreachable(postType);
    }
  });

  return (
    <Layout alignItems={alignItems}>
      {posts.length > 0 ? (
        posts
      ) : (
        <FlexBox flexDirection="column" gap={8} width="100%">
          <ArtName colorClass={ColorClass.Primary}>
            No updates here yet!
          </ArtName>
          <Body2 colorClass={ColorClass.Secondary}>
            You&apos;ll be able to see new updates for this project once
            they&apos;re posted.
          </Body2>
        </FlexBox>
      )}
      {isLoadingNext && <PostSkeleton />}
    </Layout>
  );
}

function DataLoader({
  alignItems,
  postsForCampaignQueryRef,
}: {
  alignItems: FlexboxProps["alignItems"];
  postsForCampaignQueryRef: PreloadedQuery<usePostsForCampaignQuery>;
}) {
  const data = usePreloadedQuery<usePostsForCampaignQuery>(
    postsForCampaignQuery,
    postsForCampaignQueryRef
  );

  return <Content alignItems={alignItems} postsForCampaign={data} />;
}

type Props = {
  alignItems?: FlexboxProps["alignItems"];
  hasRelayConnectionIdsProvider?: boolean;
  postsForCampaignQueryRef: PreloadedQuery<usePostsForCampaignQuery>;
};

export default function CampaignPosts({
  alignItems = "flex-start",
  hasRelayConnectionIdsProvider = true,
  postsForCampaignQueryRef,
}: Props) {
  return (
    <Suspense
      fallback={
        <Layout alignItems={alignItems}>
          <PostSkeleton />
        </Layout>
      }
    >
      {hasRelayConnectionIdsProvider === true ? (
        <RelayConnectionIdsProvider>
          <DataLoader
            alignItems={alignItems}
            postsForCampaignQueryRef={postsForCampaignQueryRef}
          />
        </RelayConnectionIdsProvider>
      ) : (
        <DataLoader
          alignItems={alignItems}
          postsForCampaignQueryRef={postsForCampaignQueryRef}
        />
      )}
    </Suspense>
  );
}
