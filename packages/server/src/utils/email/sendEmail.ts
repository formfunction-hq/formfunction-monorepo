import { Request } from "express";
import {
  NotificationChannelExpress_Enum,
  NotificationTypeExpress_Enum,
} from "src/__generated__/generated";
import sendPostmarkEmailWithTemplateId from "src/utils/email/sendPostmarkEmailWithTemplateId";
import getPostmarkTemplateId from "src/utils/email/getPostmarkTemplateId";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import batchArray from "formfn-shared/dist/utils/array/batchArray";
import getFilteredRecipients from "src/utils/notifications/getFilteredRecipients";

// Postmark only allows sending up to 500 emails in a single batched request.
const POSTMARK_MAX_BATCH_SIZE = 500;

// Helper for sending emails based on the email type defined by
// EmailGqlType. We have this additional layer of abstraction
// to make it easier to switch the underlying email provider
// or run experiments.
export default async function sendEmail(
  from: string,
  toEmail: string | Array<string>,
  notificationType: NotificationTypeExpress_Enum,
  dynamicTemplateData: { [key: string]: any },
  req?: Request,
  messageStream?: "broadcast" | "outbound"
): Promise<boolean> {
  const recipients = Array.isArray(toEmail) ? toEmail : [toEmail];
  const filteredRecipients = await getFilteredRecipients(
    notificationType,
    NotificationChannelExpress_Enum.Email,
    recipients
  );

  if (filteredRecipients.length !== recipients.length) {
    logEvent(AnalyticsEvent.SendEmailFilteredRecipients, req ?? null, {
      filteredRecipients,
      notificationType,
      recipients,
    });
  }

  if (filteredRecipients.length === 0) {
    return true;
  }

  const filteredRecipientBatches = batchArray(
    filteredRecipients,
    POSTMARK_MAX_BATCH_SIZE
  );

  const results = await Promise.all(
    filteredRecipientBatches.map((batch) =>
      sendPostmarkEmailWithTemplateId(
        from,
        batch,
        getPostmarkTemplateId(notificationType),
        dynamicTemplateData,
        req,
        messageStream
      )
    )
  );

  return results.every(Boolean);
}
