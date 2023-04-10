import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import getDefaultLogProperties from "src/utils/analytics/getDefaultLogProperties";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import postmarkClient from "src/utils/email/postmarkClient";
import { Request } from "express";
import PostmarkTemplateId from "src/types/enums/PostmarkTemplateId";

export default async function sendPostmarkEmailWithTemplateId(
  from: string,
  toEmails: Array<string>,
  templateId: PostmarkTemplateId,
  dynamicTemplateData: { [key: string]: any },
  req?: Request,
  messageStream?: "broadcast" | "outbound"
): Promise<boolean> {
  const logProperties = {
    dynamicTemplateData,
    fromEmail: from,
    templateId,
    toEmails,
    ...getDefaultLogProperties(req),
  };

  try {
    const results = await postmarkClient.sendEmailBatchWithTemplates(
      toEmails.map((email) => ({
        From: from,
        MessageStream: messageStream ?? "outbound",
        TemplateId: templateId,
        TemplateModel: dynamicTemplateData,
        To: email,
      }))
    );
    return results
      .map((res) => {
        if (res.ErrorCode !== 0) {
          // 406 is You tried to send to recipient(s) that have been marked as inactive, we don't really care about that and logging it
          // creates too much volume
          if (res.ErrorCode !== 406) {
            logError(AnalyticsEvent.SendEmailFail, res.Message, req ?? null, {
              ...logProperties,
              res,
            });
          }
          return false;
        }
        logEvent(AnalyticsEvent.SendEmailSuccess, req ?? null, {
          ...logProperties,
          res,
        });
        return true;
      })
      .every(Boolean);
  } catch (e) {
    logError(
      AnalyticsEvent.SendEmailFail,
      e as Error,
      req ?? null,
      logProperties
    );
    return false;
  }
}
