import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";
import { ActivityNotificationBonkClaim_ActivityNotificationBonkClaim$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationBonkClaim_ActivityNotificationBonkClaim.graphql";

const fragment = graphql`
  fragment ActivityNotificationBonkClaim_ActivityNotificationBonkClaim on ActivityNotificationBonkClaim {
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationBonkClaim_ActivityNotificationBonkClaim$key;
};

export default function ActivityNotificationBonkClaim({ notification }: Props) {
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
      label="Your $BONK claim is available!"
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
