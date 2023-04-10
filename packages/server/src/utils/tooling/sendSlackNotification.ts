import axios from "axios";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import SlackWebhook from "src/types/enums/SlackWebhook";
import logError from "src/utils/analytics/logError";

export default async function sendSlackNotification(
  webhookUrl: SlackWebhook,
  message: string
) {
  try {
    await axios.post(
      webhookUrl,
      {
        text: message,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e: any) {
    await logError(AnalyticsEvent.SendSlackNotificationFail, e);
  }
}
