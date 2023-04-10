import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationNewFollower_ActivityNotificationNewFollower$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationNewFollower_ActivityNotificationNewFollower.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import UsernameLink from "components/buttons/UsernameLink";

const fragment = graphql`
  fragment ActivityNotificationNewFollower_ActivityNotificationNewFollower on ActivityNotificationNewFollower {
    sender {
      username

      ProfilePhoto {
        photoUrl
      }
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationNewFollower_ActivityNotificationNewFollower$key;
};

export default function ActivityNotificationNewFollower({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { sender } = notificationData;

  return (
    <ActivityNotificationContainer
      label={
        <>
          <UsernameLink username={sender!.username} /> followed you
        </>
      }
      profilePhotoInfo={{
        photoUrl: sender!.ProfilePhoto?.photoUrl,
        username: sender!.username,
      }}
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
