import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import CampaignProgressTowardsGoalForCampaignV2 from "components/pages/campaign/campaign-v2/hero/goals/CampaignProgressTowardsGoalForCampaignV2";
import { CampaignV2ContextProvider } from "context/CampaignV2Context";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import ArtistPillButtonForUserExpress from "components/buttons/ArtistPillButtonForUserExpress";
import ExploreCampaignCard from "components/pages/explore/ExploreCampaignCard";
import useCampaignLinkForCampaignV2 from "hooks/campaign/useCampaignLinkForCampaignV2";
import { Dayjs } from "dayjs";
import Body2Medium from "components/text/Body2Medium";
import ColorClass from "types/enums/ColorClass";
import dayjs from "utils/dates/dayjsex";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { ExploreCampaignCardForCampaignV2_CampaignV2$key } from "components/pages/explore/__generated__/ExploreCampaignCardForCampaignV2_CampaignV2.graphql";

const fragment = graphql`
  fragment ExploreCampaignCardForCampaignV2_CampaignV2 on CampaignV2 {
    creator {
      ...ArtistPillButtonForUserExpress_UserExpress
    }

    colorScheme

    previewAsset {
      ...AssetForAssetExpress_AssetExpress
    }

    tagline
    teamMembers {
      member {
        ProfilePhoto {
          photoUrl
        }
      }
    }
    title

    ...CampaignProgressTowardsGoalForCampaignV2_CampaignV2
    ...useCampaignLinkForCampaignV2_CampaignV2
  }
`;

type Props = {
  campaign: ExploreCampaignCardForCampaignV2_CampaignV2$key;
  hasShadow?: boolean;
  launchDate?: Dayjs | string;
  nftAssets?: MaybeUndef<Array<JSX.Element>>;
};

// If we don't want to display the NFT assets, we shouldn't bother fetching them
// by including them in the fragment (to improve performance).
export default function ExploreCampaignCardForCampaignV2({
  campaign,
  hasShadow,
  launchDate,
  nftAssets,
}: Props) {
  const campaignData = useFragment(fragment, campaign);
  const campaignLink = useCampaignLinkForCampaignV2(campaignData, true);
  const collabSrcs = campaignData.teamMembers?.map(
    ({ member }) => member.ProfilePhoto?.photoUrl ?? null
  );

  const artistPillButton = (
    <ArtistPillButtonForUserExpress
      collabSrcs={collabSrcs}
      user={campaignData.creator}
    />
  );
  const asset = (
    <AssetForAssetExpress
      asset={campaignData.previewAsset}
      borderRadius={16}
      imgixWidth={1000}
      objectFit="cover"
      height="100%"
      showDropShadow
      width="100%"
    />
  );
  const progressTowardsGoal = (
    <CampaignProgressTowardsGoalForCampaignV2
      campaign={campaignData}
      descriptionOverride={
        launchDate == null ||
        (typeof launchDate !== "string" &&
          launchDate.isBefore(dayjs())) ? undefined : (
          <Body2Medium colorClass={ColorClass.Secondary}>
            Launching{" "}
            {typeof launchDate === "string"
              ? launchDate
              : launchDate.format("MMMM D")}
          </Body2Medium>
        )
      }
      displayType="compact"
    />
  );

  return (
    <CampaignV2ContextProvider defaultColorScheme={campaignData.colorScheme}>
      <ExploreCampaignCard
        artistPillButton={artistPillButton}
        asset={asset}
        campaignHref={campaignLink}
        description={campaignData.tagline}
        hasShadow={hasShadow}
        nftAssets={nftAssets ?? null}
        progressTowardsGoal={progressTowardsGoal}
        title={campaignData.title}
      />
    </CampaignV2ContextProvider>
  );
}
