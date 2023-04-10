import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function sendScheduledAuctionIsLiveEmail(
  templateData: {
    artist: string | false;
    imageSrc: Maybe<string>;
    nftLink: string;
    nftName: string;
    price: string;
    seller: string;
  },
  toEmails: Array<string>,
  req?: Request
) {
  return sendEmail(
    FROM_EMAIL,
    toEmails,
    NotificationTypeExpress_Enum.FollowerScheduledAuctionIsLive,
    templateData,
    req,
    "broadcast"
  );
}
