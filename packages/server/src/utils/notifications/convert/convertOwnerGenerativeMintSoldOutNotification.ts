import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import ConvertCandyMachineType from "src/types/convert/ConvertCandyMachineType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import {
  ActivityNotificationOwnerGenerativeMintSoldOut,
  ActivityNotificationCandyMachineInfo,
  SeriesTypeExpress_Enum,
} from "src/__generated__/generated";
import convertPhotoToAsset from "src/utils/convert/convertPhotoToAsset";
import getActivityNotificationLinkAction from "src/utils/notifications/actions/getActivityNotificationLinkAction";
import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";

function getNotificationCandyMachineInfoFromCandyMachine(
  candyMachine: ConvertCandyMachineType
): ActivityNotificationCandyMachineInfo {
  return {
    __typename: Typename.ActivityNotificationCandyMachineInfo,
    asset: convertPhotoToAsset(
      candyMachine.Series.Photo_PhotoToSeries_avatarPhotoId
    ),
    name: candyMachine.Series.name,
  };
}

export default function convertOwnerGenerativeMintSoldOutNotification(
  notification: ConvertActivityNotificationType,
  candyMachine: ConvertCandyMachineType
): ActivityNotificationOwnerGenerativeMintSoldOut {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationOwnerGenerativeMintSoldOut,
    action: getActivityNotificationLinkAction(
      getSeriesLinkRelative(
        candyMachine.Series.User.username,
        candyMachine.Series.slug,
        SeriesTypeExpress_Enum.GenerativeMint
      ),
      "View"
    ),
    candyMachineInfo:
      getNotificationCandyMachineInfoFromCandyMachine(candyMachine),
  };
}
