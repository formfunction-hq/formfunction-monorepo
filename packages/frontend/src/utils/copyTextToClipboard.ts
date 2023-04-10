import { message } from "components/toast/messages";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import logError from "utils/analytics/logError";

// See https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
export default function copyTextToClipboard(
  textToCopy: string,
  messageContent?: string
): void {
  try {
    navigator.clipboard.writeText(textToCopy);
    message({ content: messageContent ?? "Copied to clipboard!", duration: 1 });
  } catch (e) {
    logError(AnalyticsEvent.CopyTextToClipboardError, e as Error, {
      messageContent,
      textToCopy,
    });
    message({
      content: "An unexpected error occurred, please try again",
      duration: 2000,
      type: "error",
    });
  }
}
