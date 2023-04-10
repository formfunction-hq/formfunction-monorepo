import { useEffect, useState } from "react";
import dayjs from "utils/dates/dayjsex";
import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";

const POLLING_INTERVAL = dayjs.duration({
  seconds: getLdBootstrap()?.defaultPollingIntervalSeconds ?? 15,
});

export default function usePollingFetchKey(duration = POLLING_INTERVAL) {
  const [fetchKey, setFetchKey] = useState(0);
  const durationMs = duration.asMilliseconds();

  useEffect(() => {
    const interval = setInterval(
      () => setFetchKey((curr) => curr + 1),
      durationMs
    );

    return () => clearInterval(interval);
  }, [durationMs]);

  return fetchKey;
}
