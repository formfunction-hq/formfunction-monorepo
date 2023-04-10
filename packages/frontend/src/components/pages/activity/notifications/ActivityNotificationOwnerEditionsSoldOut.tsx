import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";

const fragment = graphql`
  fragment ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut on ActivityNotificationOwnerEditionsSoldOut {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut$key;
};

export default function ActivityNotificationOwnerEditionsSoldOut({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo } = notificationData;

  return (
    <SystemNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          All editions of{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> have been
          sold out
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
