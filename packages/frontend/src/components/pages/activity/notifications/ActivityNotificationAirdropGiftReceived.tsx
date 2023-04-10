import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";
import { ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived.graphql";

const fragment = graphql`
  fragment ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived on ActivityNotificationAirdropGiftReceived {
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived$key;
};

export default function ActivityNotificationAirdropGiftReceived({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);

  return (
    <SystemNotificationContainer
      actionButton={
        notificationData.action == null ? null : (
          <ActivityNotificationLinkActionButton
            action={notificationData.action}
          />
        )
      }
      label="You were airdropped an NFT! Click the link below to see your gift. 🎁"
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
