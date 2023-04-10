import MyContext from "src/types/MyContext";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  UnseenActivityNotificationsCountForViewerInput,
  UnseenActivityNotificationsCountForViewerResponse,
} from "src/__generated__/generated";
import ACTIVITY_NOTIFICATION_TYPES from "src/constants/ActivityNotificationTypes";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getViewerId from "src/utils/auth/getViewerId";

export default async function unseenActivityNotificationsCountForViewerResolver(
  context: MyContext,
  input: Maybe<UnseenActivityNotificationsCountForViewerInput>
): Promise<UnseenActivityNotificationsCountForViewerResponse> {
  const viewerId = getViewerId(context, input?.viewerId);

  if (viewerId == null) {
    return {
      __typename: Typename.UnseenActivityNotificationsCountForViewerResponse,
      unseenActivityNotificationsCount: 0,
    };
  }

  const prisma = getPrisma();
  const unseenActivityNotificationsCount =
    await prisma.activityNotification.count({
      where: {
        Notification: {
          receiver: viewerId,
          type: {
            in: ACTIVITY_NOTIFICATION_TYPES,
          },
        },
        timeSeen: null,
      },
    });
  return {
    __typename: Typename.UnseenActivityNotificationsCountForViewerResponse,
    unseenActivityNotificationsCount,
  };
}
