import graphql from "babel-plugin-relay/macro";
import CampaignGridFullWidth from "components/campaign/CampaignGridFullWidth";
import ExploreCampaignCardForCampaignV2WithNftAssets from "components/pages/explore/ExploreCampaignCardForCampaignV2WithNftAssets";
import ExploreCampaignCardSkeleton from "components/pages/explore/skeletons/ExploreCampaignCardSkeleton";
import { NUM_SKELETON_ROWS } from "components/pages/profile/ProfileCampaigns";
import ProfileCampaignsEmptyContent from "components/pages/profile/ProfileCampaignsEmptyContent";
import { ProfileCampaignsWhereUserIsActiveSupporterPaginationQuery } from "components/pages/profile/__generated__/ProfileCampaignsWhereUserIsActiveSupporterPaginationQuery.graphql";
import { ProfileCampaignsWhereUserIsActiveSupporter_Query$key } from "components/pages/profile/__generated__/ProfileCampaignsWhereUserIsActiveSupporter_Query.graphql";
import { PROFILE_CAMPAIGNS_PAGE_SIZE } from "constants/PageSizes";
import { range } from "formfn-shared/dist/utils/range";
import useCampaignGridFullWidthColumnCount from "hooks/grids/useCampaignGridFullWidthColumnCount";
import { profilePageCampaignsWhereUserIsActiveSupporterQuery } from "hooks/profile-page/useProfilePageCampaignsWhereUserIsActiveSupporter";
import { useProfilePageCampaignsWhereUserIsActiveSupporterQuery } from "hooks/profile-page/__generated__/useProfilePageCampaignsWhereUserIsActiveSupporterQuery.graphql";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import getImgixUrl from "utils/getImgixUrl";

const fragment = graphql`
  fragment ProfileCampaignsWhereUserIsActiveSupporter_Query on query_root
  @refetchable(
    queryName: "ProfileCampaignsWhereUserIsActiveSupporterPaginationQuery"
  ) {
    CampaignsNamespace {
      campaignsWhereUserIsActiveSupporter(input: $input) {
        campaigns(after: $after, first: $first, input: $input)
          @connection(
            key: "ProfileCampaignsWhereUserIsActiveSupporter_Query_campaigns"
          ) {
          edges {
            node {
              id
              ...ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2
            }
          }
        }
      }
    }
  }
`;

function Inner({
  gridQuery,
  isViewingOwnProfile,
  profileUsername,
}: {
  gridQuery: ProfileCampaignsWhereUserIsActiveSupporter_Query$key;
  isViewingOwnProfile: boolean;
  profileUsername: string;
}) {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment<
    ProfileCampaignsWhereUserIsActiveSupporterPaginationQuery,
    ProfileCampaignsWhereUserIsActiveSupporter_Query$key
  >(fragment, gridQuery);
  const columnsPerRow = useCampaignGridFullWidthColumnCount();

  useLoadNextOnBottomScroll(
    hasNext && !isLoadingNext,
    loadNext,
    PROFILE_CAMPAIGNS_PAGE_SIZE
  );
  const campaigns =
    data.CampaignsNamespace.campaignsWhereUserIsActiveSupporter.campaigns
      ?.edges ?? [];

  if (campaigns.length === 0) {
    const description = isViewingOwnProfile
      ? "You're not a supporter of any campaigns. Help bring a creative project to life by discovering new campaigns!"
      : `@${profileUsername} isn't a supporter of any campaigns. Help bring a creative project to life by discovering new campaigns!`;
    const buttonHref = "/explore?tab=Campaigns";
    const buttonText = "Explore campaigns";
    const imageSrc = getImgixUrl("illustrations/empty-communities.png");

    return (
      <ProfileCampaignsEmptyContent
        buttonHref={buttonHref}
        buttonText={buttonText}
        description={description}
        imageSrc={imageSrc}
      />
    );
  }

  return (
    <CampaignGridFullWidth>
      {campaigns.map(({ node }) => (
        <ExploreCampaignCardForCampaignV2WithNftAssets
          campaign={node}
          key={node.id}
        />
      ))}
      {isLoadingNext &&
        range(columnsPerRow * NUM_SKELETON_ROWS).map((val) => (
          <ExploreCampaignCardSkeleton key={val} />
        ))}
    </CampaignGridFullWidth>
  );
}

type Props = {
  isViewingOwnProfile: boolean;
  profileUsername: string;
  supportedCampaignsQueryRef: PreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>;
};

export default function ProfileCampaignsWhereUserIsActiveSupporter({
  supportedCampaignsQueryRef,
  isViewingOwnProfile,
  profileUsername,
}: Props) {
  const data =
    usePreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>(
      profilePageCampaignsWhereUserIsActiveSupporterQuery,
      supportedCampaignsQueryRef
    );

  return (
    <Inner
      gridQuery={data}
      isViewingOwnProfile={isViewingOwnProfile}
      profileUsername={profileUsername}
    />
  );
}
