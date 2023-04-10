import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import AssetForNotificationCampaignInfo from "components/assets/AssetForNotificationCampaignInfo";
import { ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback.graphql";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import FlexBox from "components/layout/FlexBox";

const fragment = graphql`
  fragment ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback on ActivityNotificationCampaignRejectedWithFeedback {
    campaignInfo {
      title

      ...AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo
    }
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
    }
    feedback
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback$key;
};

export default function ActivityNotificationCampaignRejectedWithFeedback({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { campaignInfo } = notificationData;

  return (
    <SystemNotificationContainer
      actionButton={
        notificationData.action == null ? null : (
          <ActivityNotificationLinkActionButton
            action={notificationData.action}
          />
        )
      }
      asset={
        <AssetForNotificationCampaignInfo
          activityNotificationCampaignInfo={campaignInfo}
        />
      }
      label={
        <FlexBox flexDirection="column" gap={16}>
          <Body1 colorClass={ColorClass.Primary}>
            Your campaign, ${campaignInfo.title}, was not approved. Please
            address the feedback shown below and resubmit for approval.
          </Body1>
          <Body1
            colorClass={ColorClass.Primary}
            style={{ fontStyle: "italic" }}
          >
            {notificationData.feedback}
          </Body1>
        </FlexBox>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
