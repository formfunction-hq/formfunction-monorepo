import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import UsernameLink from "components/buttons/UsernameLink";

const fragment = graphql`
  fragment ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator on ActivityNotificationInvitesConvertedToCreator {
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
  notification: ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator$key;
};

export default function ActivityNotificationInvitesConvertedToCreator({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { sender } = notificationData;

  return (
    <ActivityNotificationContainer
      label={
        <>
          Thanks to <UsernameLink username={sender!.username} />
          &apos;s invite, you are now a creator on Formfunction!
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
