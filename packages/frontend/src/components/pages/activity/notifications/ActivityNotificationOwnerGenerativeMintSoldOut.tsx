import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import { ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut.graphql";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import ActivityNotificationAssetForAssetExpress from "components/pages/activity/ActivityNotificationAssetForAssetExpress";

const fragment = graphql`
  fragment ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut on ActivityNotificationOwnerGenerativeMintSoldOut {
    candyMachineInfo {
      name
      asset {
        ...ActivityNotificationAssetForAssetExpress_AssetExpress
      }
    }
    action {
      ... on ActivityNotificationLinkAction {
        href
      }
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut$key;
};

export default function ActivityNotificationOwnerGenerativeMintSoldOut({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { candyMachineInfo } = notificationData;

  return (
    <SystemNotificationContainer
      asset={
        <ActivityNotificationAssetForAssetExpress
          asset={notificationData.candyMachineInfo.asset}
          href={notificationData!.action!.href!}
        />
      }
      label={
        <Body1 colorClass={ColorClass.Primary}>
          {candyMachineInfo.name} has sold out!
        </Body1>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
