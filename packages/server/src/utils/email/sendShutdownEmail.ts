import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import PostmarkTemplateId from "src/types/enums/PostmarkTemplateId";
import sendPostmarkEmailWithTemplateId from "src/utils/email/sendPostmarkEmailWithTemplateId";

export default async function sendShutdownEmail(
  toEmails: Array<string>,
  req?: Request
) {
  // Don't use sendEmail so we don't have to add to NotificationTypeExpress_Enum
  return sendPostmarkEmailWithTemplateId(
    FROM_EMAIL,
    toEmails,
    PostmarkTemplateId.Shutdown,
    {},
    req,
    "broadcast"
  );
}
