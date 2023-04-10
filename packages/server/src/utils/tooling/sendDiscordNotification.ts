import axios from "axios";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import DiscordWebhook from "src/types/enums/DiscordWebhook";
import logError from "src/utils/analytics/logError";

export default async function sendDiscordNotification(
  webhookUrl: DiscordWebhook,
  message: string
) {
  try {
    await axios.post(
      webhookUrl,
      {
        content: message,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e: any) {
    await logError(AnalyticsEvent.SendDiscordNotificationFail, e);
  }
}
