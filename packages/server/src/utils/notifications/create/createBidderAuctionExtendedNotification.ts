import BidderAuctionExtendedNotificationData from "src/types/notifications/BidderAuctionExtendedNotificationData";
import { Notification } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotification from "src/utils/notifications/create/createNotification";

export default async function createBidderAuctionExtendedNotification(
  data: BidderAuctionExtendedNotificationData,
  receiverId: string,
  senderId: string
): Promise<Maybe<Notification>> {
  return createNotification(
    data,
    receiverId,
    senderId,
    NotificationTypeExpress_Enum.BidderAuctionExtended
  );
}
