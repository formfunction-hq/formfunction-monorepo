import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";

const fragment = graphql`
  fragment ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale on ActivityNotificationCreatorSecondarySale {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale$key;
};

export default function ActivityNotificationCreatorSecondarySale({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo } = notificationData;

  return (
    <SystemNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          Your piece <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} />{" "}
          was sold in a secondary sale
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
