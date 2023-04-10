import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { Request } from "express";
import SendgridTemplateId from "src/types/enums/SendgridTemplateId";
import is200StatusCode from "src/utils/is200StatusCode";
import logEvent from "src/utils/analytics/logEvent";
import sendgridMail from "src/utils/email/sendgridMail";
import logError from "src/utils/analytics/logError";
import sleep from "formfn-shared/dist/utils/sleep";
import dayjs from "src/utils/dates/dayjsex";

const NUM_RETRIES = 5;

/**
 * Sends an email based on a template ID.
 */
async function sendEmailWithTemplateIdInner(
  from: { email: string; name: string },
  toEmail: string,
  templateId: SendgridTemplateId,
  dynamicTemplateData: { [key: string]: any },
  retryNumber: number,
  req?: Request
): Promise<boolean> {
  const msg = {
    asm: {
      groupId: 163838,
      groupsToDisplay: [163838],
    },
    dynamicTemplateData,
    from,
    templateId,
    to: toEmail,
  };

  const logProperties = {
    dynamicTemplateData,
    fromEmail: from.email,
    fromName: from.name,
    retryNumber,
    templateId,
    toEmail,
  };

  const sgMail = sendgridMail();
  try {
    const response = await sgMail.send(msg);
    const { statusCode } = response[0];
    if (is200StatusCode(statusCode)) {
      logEvent(AnalyticsEvent.SendEmailSuccess, req ?? null, logProperties);
      return true;
    }

    logError(
      AnalyticsEvent.SendEmailFail,
      `Send mail failed with status code ${statusCode}`,
      req ?? null,
      {
        ...logProperties,
        statusCode,
      }
    );
    return false;
  } catch (err: any) {
    logError(AnalyticsEvent.SendEmailFail, err, req ?? null, {
      ...logProperties,
    });
    return false;
  }
}

export default async function sendEmailWithTemplateId(
  from: { email: string; name: string },
  toEmail: string,
  templateId: SendgridTemplateId,
  dynamicTemplateData: { [key: string]: any },
  req?: Request
) {
  // Manual retries b/c Sendgrid is dumb
  // See https://stackoverflow.com/questions/61149142/node-js-sendgrid-mail-403-forbidden-error

  // TODO: create generic retry wrapper function
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < NUM_RETRIES; i++) {
    // eslint-disable-next-line no-await-in-loop
    const result = await sendEmailWithTemplateIdInner(
      from,
      toEmail,
      templateId,
      dynamicTemplateData,
      i,
      req
    );

    if (result) {
      return result;
    }

    // eslint-disable-next-line no-await-in-loop
    await sleep(dayjs.duration({ seconds: i }));
  }

  return false;
}
