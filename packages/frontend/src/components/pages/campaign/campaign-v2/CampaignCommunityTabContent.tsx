import styles from "css/pages/campaign/campaign-v2/CampaignCommunityTabContent.module.css";
import FlexBox from "components/layout/FlexBox";
import Divider from "components/misc/Divider";
import CampaignHolders from "components/pages/campaign/campaign-generic/holders/CampaignHolders";
import CampaignPosts from "components/pages/campaign/campaign-generic/posts/CampaignPosts";
import Price from "components/text/Price";
import { useCampaignHoldersForSlugQuery } from "hooks/campaign/__generated__/useCampaignHoldersForSlugQuery.graphql";
import { usePostsForCampaignQuery } from "hooks/campaign/__generated__/usePostsForCampaignQuery.graphql";
import useBreakpoint from "hooks/useBreakpoint";
import graphql from "babel-plugin-relay/macro";
import { PreloadedQuery, useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";
import Body1 from "components/text/Body1";
import TextButton from "components/buttons/TextButton";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import { CampaignCommunityTabContent_CampaignV2$key } from "components/pages/campaign/campaign-v2/__generated__/CampaignCommunityTabContent_CampaignV2.graphql";
import useIsViewerCampaignCreatorOrTeamMember from "hooks/campaign/useIsViewerCampaignCreatorOrTeamMember";

const fragment = graphql`
  fragment CampaignCommunityTabContent_CampaignV2 on CampaignV2 {
    slug
    creator {
      username
    }

    ...useIsViewerCampaignCreatorOrTeamMember_CampaignV2
  }
`;

function GoToDashboardPill({
  creatorUsername,
  campaignSlug,
}: {
  campaignSlug: string;
  creatorUsername: string;
}) {
  return (
    <FlexBox className={styles.goToDashboardPill}>
      <Body1 colorClass={ColorClass.Primary}>
        Post updates, airdrop NFTs, and more on your campaign dashboard
      </Body1>
      <div className={styles.goToDashboardCta}>
        <TextButton
          buttonThemeOrColorClass={ColorClass.BrightPurple}
          fontClass={FontClass.Body1Medium}
          icon={
            <ArrowRightIcon size={24} colorValue={ColorValue.BrightPurple} />
          }
          iconPosition="right"
          href={`${getCampaignLinkRelative(
            creatorUsername,
            campaignSlug
          )}/dashboard`}
          type="link_internal"
        >
          Go to dashboard
        </TextButton>
      </div>
    </FlexBox>
  );
}

export default function CampaignCommunityTabContent({
  campaign,
  campaignHoldersQueryRef,
  postsForCampaignQueryRef,
}: {
  campaign: CampaignCommunityTabContent_CampaignV2$key;
  campaignHoldersQueryRef: PreloadedQuery<useCampaignHoldersForSlugQuery>;
  postsForCampaignQueryRef: PreloadedQuery<usePostsForCampaignQuery>;
}) {
  const campaignData = useFragment(fragment, campaign);
  const {
    slug: campaignSlug,
    creator: { username: creatorUsername },
  } = campaignData;
  const { isDesktopBreakpoint } = useBreakpoint();
  const shouldShowDashboardPill =
    useIsViewerCampaignCreatorOrTeamMember(campaignData);

  return (
    <FlexBox gap={64}>
      {!isDesktopBreakpoint && (
        <>
          <FlexBox
            flexDirection="column"
            gap={20}
            minWidth="160px"
            className={joinClasses(
              styles.communityHoldersContainer,
              GlobalClass.HideScrollbar
            )}
          >
            <Price colorClass={ColorClass.Primary}>Supporters</Price>
            <CampaignHolders
              campaignHoldersQueryRef={campaignHoldersQueryRef}
            />
          </FlexBox>
          <Divider
            colorClass={ColorClass.Tertiary}
            direction="vertical"
            width={2}
          />
        </>
      )}
      <FlexBox flexDirection="column" maxWidth={792} gap={32} flexGrow={1}>
        {shouldShowDashboardPill && (
          <GoToDashboardPill
            creatorUsername={creatorUsername}
            campaignSlug={campaignSlug}
          />
        )}
        <CampaignPosts
          alignItems={isDesktopBreakpoint ? "center" : "flex-start"}
          postsForCampaignQueryRef={postsForCampaignQueryRef}
        />
      </FlexBox>
    </FlexBox>
  );
}
