import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import UsernameLink from "components/buttons/UsernameLink";

const fragment = graphql`
  fragment ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite on ActivityNotificationInvitesInviteeAcceptedInvite {
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
  notification: ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite$key;
};

export default function ActivityNotificationInvitesInviteeAcceptedInvite({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { sender } = notificationData;

  return (
    <ActivityNotificationContainer
      label={
        <>
          <UsernameLink username={sender!.username} /> accepted your invite, and
          is now a creator on Formfunction
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
