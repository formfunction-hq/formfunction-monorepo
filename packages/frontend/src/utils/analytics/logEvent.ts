import axios from "axios";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import getDefaultLogProperties from "utils/analytics/getDefaultLogProperties";
import toObject from "formfn-shared/dist/utils/toObject";
import getRestUrl from "utils/env/getRestUrl";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import getApiHeaders from "utils/api/getApiHeaders";
import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";

export default function logEvent(
  event: AnalyticsEvent,
  data?: { [key: string]: any }
) {
  if (getLdBootstrap()?.enableFrontendLogToLoki === false) {
    return;
  }

  const properties = {
    ...(data == null ? {} : toObject(data)),
    ...getDefaultLogProperties(),
  };

  axios
    .post(
      getRestUrl("logEventToLoki"),
      {
        event,
        properties,
      },
      {
        headers: getApiHeaders(),
      }
    )
    // Swallow errors
    .catch(emptyFunction);
}
