import mixpanel from "mixpanel-browser";
import MixpanelEvent from "types/enums/MixpanelEvent";
import getEnvironment from "utils/getEnvironment";

export default function trackMixpanelEvent(
  eventName: MixpanelEvent,
  properties?: { [key: string]: any }
) {
  mixpanel.track(eventName, {
    environment: getEnvironment(),
    ...(properties ?? {}),
  });
}
