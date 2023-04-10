import PlainButton from "components/buttons/PlainButton";
import ChatBubbleIcon from "components/icons/ChatBubbleIcon";
import FlexBox from "components/layout/FlexBox";
import CreatePostBaseForCampaignModal from "components/modal/CreatePostBaseForCampaignModal";
import CampaignPosts from "components/pages/campaign/campaign-generic/posts/CampaignPosts";
import CampaignDashboardTabGeneric from "components/pages/campaign/dashboard/tabs/CampaignDashboardTabGeneric";
import Body1 from "components/text/Body1";
import styles from "css/pages/campaign/dashboard/tabs/CampaignDashboardCommunityUpdatesTab.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { usePostsForCampaignQuery } from "hooks/campaign/__generated__/usePostsForCampaignQuery.graphql";
import { useState } from "react";
import { PreloadedQuery, useFragment } from "react-relay";
import { useParams } from "react-router-dom";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import graphql from "babel-plugin-relay/macro";
import { CampaignDashboardCommunityUpdatesTab_CampaignV2$key } from "components/pages/campaign/dashboard/tabs/__generated__/CampaignDashboardCommunityUpdatesTab_CampaignV2.graphql";
import { RelayConnectionIdsProvider } from "context/RelayConnectionIdsContext";
import GiftIcon from "components/icons/GiftIcon";
import CreateAirdropsForCampaignModal from "components/modal/CreateAirdropsForCampaignModal";
import ListIcon from "components/icons/ListIcon";
import CreatePollForCampaignModal from "components/modal/campaign/CreatePollForCampaignModal";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";
import useBreakpoint from "hooks/useBreakpoint";

const fragment = graphql`
  fragment CampaignDashboardCommunityUpdatesTab_CampaignV2 on CampaignV2 {
    title

    ...CreateAirdropsForCampaignModal_CampaignV2
    ...CreatePostBaseForCampaignModal_CampaignV2
    ...CreatePollForCampaignModal_CampaignV2
  }
`;

function CommunityUpdateAction({
  icon,
  name,
  onClick,
}: {
  icon: JSX.Element;
  name: string;
  onClick: () => void;
}) {
  return (
    <PlainButton
      style={{ backgroundColor: ColorValue.CardBackground }}
      className={joinClasses(styles.actionButton, GlobalClass.CardAnimation)}
      onClick={onClick}
    >
      {icon}
      <Body1 colorClass={ColorClass.Primary}>{name}</Body1>
    </PlainButton>
  );
}

type Props = {
  campaign: CampaignDashboardCommunityUpdatesTab_CampaignV2$key;
  postsForCampaignQueryRef: Maybe<PreloadedQuery<usePostsForCampaignQuery>>;
};

export default function CampaignDashboardCommunityUpdatesTab({
  campaign,
  postsForCampaignQueryRef,
}: Props): JSX.Element {
  const { campaignSlug, username: creatorUsername } = useParams();
  const [isCreatePostModalShown, setIsCreatePostModalShown] = useState(false);
  const [isCreateAirdropsModalShown, setIsCreateAirdropsModalShown] =
    useState(false);
  const [isCreatePollModalShown, setIsCreatePollModalShown] = useState(false);
  const campaignData = useFragment(fragment, campaign);
  const { title } = campaignData;
  const { isDesktopWideBreakpoint } = useBreakpoint();
  const iconSize = isDesktopWideBreakpoint ? 24 : 40;

  const content = (
    // Need context defined here since CreatePostBaseForCampaignModal uses it too.
    // Otherwise CampaignPosts creates one by default.
    <RelayConnectionIdsProvider>
      <CreatePostBaseForCampaignModal
        campaign={campaignData}
        campaignSlug={campaignSlug!}
        creatorUsername={creatorUsername!}
        isShown={isCreatePostModalShown}
        onHide={() => setIsCreatePostModalShown(false)}
      />
      <CreatePollForCampaignModal
        campaign={campaignData}
        campaignSlug={campaignSlug!}
        creatorUsername={creatorUsername!}
        isShown={isCreatePollModalShown}
        onHide={() => setIsCreatePollModalShown(false)}
      />
      <CreateAirdropsForCampaignModal
        campaign={campaignData}
        isShown={isCreateAirdropsModalShown}
        onHide={() => setIsCreateAirdropsModalShown(false)}
      />
      <FlexBox
        flexDirection="column"
        alignItems="flex-start"
        gap={32}
        width="100%"
      >
        <FlexBox className={styles.actionButtonContainer}>
          <CommunityUpdateAction
            icon={
              <ChatBubbleIcon
                size={iconSize}
                colorValue={ColorValue.BrightPurple}
              />
            }
            name="Post update"
            onClick={() => setIsCreatePostModalShown(true)}
          />
          <CommunityUpdateAction
            icon={
              <GiftIcon size={iconSize} colorValue={ColorValue.BrightPurple} />
            }
            name="Airdrop"
            onClick={() => setIsCreateAirdropsModalShown(true)}
          />
          <CommunityUpdateAction
            icon={
              <ListIcon size={iconSize} colorValue={ColorValue.BrightPurple} />
            }
            name="Run a poll"
            onClick={() => setIsCreatePollModalShown(true)}
          />
        </FlexBox>
        {postsForCampaignQueryRef != null && (
          <CampaignPosts
            hasRelayConnectionIdsProvider={false}
            postsForCampaignQueryRef={postsForCampaignQueryRef}
          />
        )}
      </FlexBox>
    </RelayConnectionIdsProvider>
  );

  return (
    <CampaignDashboardTabGeneric
      campaignTitle={title}
      title="Community updates"
      subtitle="Give updates about your project to your supporters and the general public."
      content={content}
    />
  );
}
