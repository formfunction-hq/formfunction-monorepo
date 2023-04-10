import graphql from "babel-plugin-relay/macro";
import CampaignGridFullWidth from "components/campaign/CampaignGridFullWidth";
import ExploreCampaignCardSkeleton from "components/pages/explore/skeletons/ExploreCampaignCardSkeleton";
import { ProfileCampaignsPaginationQuery } from "components/pages/profile/__generated__/ProfileCampaignsPaginationQuery.graphql";
import { ProfileCampaigns_Query$key } from "components/pages/profile/__generated__/ProfileCampaigns_Query.graphql";
import { PROFILE_CAMPAIGNS_PAGE_SIZE } from "constants/PageSizes";
import { range } from "formfn-shared/dist/utils/range";
import useCampaignGridFullWidthColumnCount from "hooks/grids/useCampaignGridFullWidthColumnCount";
import { profilePageCreatedCampaignsQuery } from "hooks/profile-page/useProfilePageCreatedCampaigns";
import { useProfilePageCreatedCampaignsQuery } from "hooks/profile-page/__generated__/useProfilePageCreatedCampaignsQuery.graphql";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import getImgixUrl from "utils/getImgixUrl";
import ProfileCampaignsEmptyContent from "components/pages/profile/ProfileCampaignsEmptyContent";
import ExploreCampaignCardForCampaignV2WithNftAssets from "components/pages/explore/ExploreCampaignCardForCampaignV2WithNftAssets";

export const NUM_SKELETON_ROWS = 3;

const fragment = graphql`
  fragment ProfileCampaigns_Query on query_root
  @refetchable(queryName: "ProfileCampaignsPaginationQuery") {
    CampaignsNamespace {
      campaignsForUser(input: $input) {
        campaigns(after: $after, first: $first, input: $input)
          @connection(key: "ProfileCampaigns_Query_campaigns") {
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
  gridQuery: ProfileCampaigns_Query$key;
  isViewingOwnProfile: boolean;
  profileUsername: string;
}) {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment<
    ProfileCampaignsPaginationQuery,
    ProfileCampaigns_Query$key
  >(fragment, gridQuery);
  const columnsPerRow = useCampaignGridFullWidthColumnCount();

  useLoadNextOnBottomScroll(
    hasNext && !isLoadingNext,
    loadNext,
    PROFILE_CAMPAIGNS_PAGE_SIZE
  );
  const campaigns =
    data.CampaignsNamespace.campaignsForUser.campaigns?.edges ?? [];

  if (campaigns.length === 0) {
    const description = isViewingOwnProfile
      ? "You haven't published a campaign yet! Bring your dream creative project to life by running a campaign."
      : `@${profileUsername} hasn't created any campaigns yet! Help bring a creative project to life by discovering new campaigns.`;
    const buttonHref = isViewingOwnProfile
      ? `/@${profileUsername}/campaigns`
      : "/explore?tab=Campaigns";
    const buttonText = isViewingOwnProfile
      ? "Manage campaigns"
      : "Explore campaigns";
    const imageSrc = getImgixUrl("illustrations/empty-campaigns.png");

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
  createdCampaignsQueryRef: PreloadedQuery<useProfilePageCreatedCampaignsQuery>;
  isViewingOwnProfile: boolean;
  profileUsername: string;
};

export default function ProfileCampaigns({
  createdCampaignsQueryRef,
  isViewingOwnProfile,
  profileUsername,
}: Props) {
  const data = usePreloadedQuery<useProfilePageCreatedCampaignsQuery>(
    profilePageCreatedCampaignsQuery,
    createdCampaignsQueryRef
  );

  return (
    <Inner
      gridQuery={data}
      isViewingOwnProfile={isViewingOwnProfile}
      profileUsername={profileUsername}
    />
  );
}
