import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function sendCampaignCommunityNewUpdateSharedEmail(
  templateData: {
    authorName: string;
    campaignName: string;
    description: Maybe<string>;
    image: Maybe<{
      imageSrc: string;
      isVideoThumbnail: boolean;
    }>;
    link: string;
    title: string;
  },
  toEmails: Array<string>,
  req?: Request
) {
  return sendEmail(
    FROM_EMAIL,
    toEmails,
    NotificationTypeExpress_Enum.CampaignCommunityNewUpdateShared,
    {
      ...templateData,
      // Template expects this to be an empty object or false
      // if no image is provided
      image: templateData.image ?? {},
    },
    req
  );
}
