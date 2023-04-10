import AnalyticsEvent from "types/enums/AnalyticsEvent";
import { useEffect } from "react";
import logEvent from "utils/analytics/logEvent";
import useColorModeContext from "hooks/useColorModeContext";

export default function useLogPageView(props?: { [key: string]: string }) {
  const { colorMode } = useColorModeContext();
  useEffect(() => {
    logEvent(AnalyticsEvent.PageView, {
      colorMode,
      origin: window.self.origin,
      pathname: window.location.pathname,
      ...props,
    });
  }, [colorMode, props]);
}
