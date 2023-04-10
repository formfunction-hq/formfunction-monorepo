import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationCollabRequest_ActivityNotificationCollabRequest$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationCollabRequest_ActivityNotificationCollabRequest.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";

const fragment = graphql`
  fragment ActivityNotificationCollabRequest_ActivityNotificationCollabRequest on ActivityNotificationCollabRequest {
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
    }
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
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
  notification: ActivityNotificationCollabRequest_ActivityNotificationCollabRequest$key;
};

export default function ActivityNotificationCollabRequest({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      actionButton={
        notificationData.action == null ? null : (
          <ActivityNotificationLinkActionButton
            action={notificationData.action}
          />
        )
      }
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          <UsernameLink username={sender!.username} /> added you as a
          collaborator on{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} />
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
