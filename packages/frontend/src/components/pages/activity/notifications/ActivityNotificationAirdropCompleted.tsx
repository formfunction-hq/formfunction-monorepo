import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import { ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted.graphql";

const fragment = graphql`
  fragment ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted on ActivityNotificationAirdropCompleted {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted$key;
};

export default function ActivityNotificationAirdropCompleted({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo } = notificationData;

  return (
    <SystemNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          Your airdrop for{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> has been
          completed
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
