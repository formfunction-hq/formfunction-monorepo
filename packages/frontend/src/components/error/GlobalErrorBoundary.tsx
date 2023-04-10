import { Component } from "react";
import styles from "css/error/GlobalErrorBoundary.module.css";
import Body2 from "components/text/Body2";
import Header2 from "components/text/Header2";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import getImgixUrl from "utils/getImgixUrl";
import MaybeImgix from "components/images/MaybeImgix";
import Imgix from "react-imgix";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import isLocalhost from "utils/isLocalhost";
import ColorClass from "types/enums/ColorClass";

function shouldIgnoreError(error: any) {
  return (
    isLocalhost() &&
    typeof error.message === "string" &&
    error.message.includes("webhook authentication request failed")
  );
}

type Props = {
  children: any;
};
type State = {
  hasError: boolean;
};

export default class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    if (shouldIgnoreError(error)) {
      // eslint-disable-next-line no-console
      console.warn("Ignoring caught error in GlobalErrorBoundary:", error);
      return { hasError: false };
    }

    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    logError(AnalyticsEvent.GlobalErrorBoundaryHit, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const img = getImgixUrl("illustrations/stressed-by-technology.png");
      return (
        <ResponsiveContainer className={styles.errorBoundary}>
          <MaybeImgix src={img}>
            <img className={styles.errorBoundaryImage} src={img} />
            <Imgix className={styles.errorBoundaryImage} src={img} />
          </MaybeImgix>
          <Header2 colorClass={ColorClass.Primary} className={styles.header}>
            Oh no, this page is broken!
          </Header2>
          <Body2 colorClass={ColorClass.Primary} className={styles.body}>
            We&apos;ll call up the team so the devs can do something about this.
          </Body2>
        </ResponsiveContainer>
      );
    }

    return this.props.children;
  }
}
