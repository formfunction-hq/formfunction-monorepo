import graphql from "babel-plugin-relay/macro";
import FlexBox from "components/layout/FlexBox";
import { CampaignHolders_Query$key } from "components/pages/campaign/campaign-generic/holders/__generated__/CampaignHolders_Query.graphql";
import ProfileLinkSkeleton from "components/pages/common/nft/skeleton/ProfileLinkSkeleton";
import ProfileLinkForUserExpress from "components/user/ProfileLinkForUserExpress";
import { CAMPAIGN_HOLDERS_PAGE_SIZE } from "constants/PageSizes";
import { range } from "formfn-shared/dist/utils/range";
import { campaignHoldersQuery } from "hooks/campaign/useCampaignHoldersForSlug";
import { useCampaignHoldersForSlugQuery } from "hooks/campaign/__generated__/useCampaignHoldersForSlugQuery.graphql";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";
import { Suspense } from "react";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";

const fragment = graphql`
  fragment CampaignHolders_Query on query_root
  @refetchable(queryName: "CampaignHoldersPaginationQuery") {
    CampaignsNamespace {
      campaignHoldersForSlug {
        holders(input: $input, after: $after, first: $first)
          @connection(key: "CampaignHolders_holders") {
          edges {
            node {
              user {
                id
                ...ProfileLinkForUserExpress_UserExpress
              }
            }
          }
        }
      }
    }
  }
`;

const SKELETON_COUNT = 5;

function Content({
  campaignHolders,
}: {
  campaignHolders: CampaignHolders_Query$key;
}) {
  const {
    data: holdersData,
    hasNext,
    isLoadingNext,
    loadNext,
  } = usePaginationFragment<
    useCampaignHoldersForSlugQuery,
    CampaignHolders_Query$key
  >(fragment, campaignHolders);

  useLoadNextOnBottomScroll(
    hasNext && !isLoadingNext,
    loadNext,
    CAMPAIGN_HOLDERS_PAGE_SIZE
  );

  const holders =
    holdersData.CampaignsNamespace.campaignHoldersForSlug?.holders.edges.map(
      ({ node }) => (
        <ProfileLinkForUserExpress key={node.user.id} user={node.user} />
      )
    );
  if (holders == null) {
    return null;
  }

  return (
    <FlexBox flexDirection="column" gap={24} width="100%">
      {holders}
      {isLoadingNext &&
        range(SKELETON_COUNT).map((index) => (
          <ProfileLinkSkeleton key={index} />
        ))}
    </FlexBox>
  );
}

type Props = {
  campaignHoldersQueryRef: PreloadedQuery<useCampaignHoldersForSlugQuery>;
};

function DataLoader({ campaignHoldersQueryRef }: Props) {
  const data = usePreloadedQuery<useCampaignHoldersForSlugQuery>(
    campaignHoldersQuery,
    campaignHoldersQueryRef
  );

  return <Content campaignHolders={data} />;
}

export default function CampaignHolders({ campaignHoldersQueryRef }: Props) {
  return (
    <Suspense
      fallback={range(SKELETON_COUNT).map((index) => (
        <ProfileLinkSkeleton key={index} />
      ))}
    >
      <DataLoader campaignHoldersQueryRef={campaignHoldersQueryRef} />
    </Suspense>
  );
}
