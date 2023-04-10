import styles from "css/spotlights/SpotlightOverlay.module.css";
import OverlayContainer from "components/containers/OverlayContainer";
import Price from "components/text/Price";
import ColorClass from "types/enums/ColorClass";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import Header3 from "components/text/Header3";
import joinClasses from "utils/joinClasses";
import invariant from "tiny-invariant";

type Props = {
  endTime?: dayjs.Dayjs;
  override?: string;
  startTime?: dayjs.Dayjs;
};

function SpotlightOverlayText({ startTime, override, endTime }: Props) {
  invariant(
    (override == null && startTime != null && endTime != null) ||
      (override != null && startTime == null && endTime == null),
    "Only one of override or startTime/endTime can be set"
  );
  const currentTime = dayjs();
  const isHappeningNow =
    currentTime.isAfter(startTime) && currentTime.isBefore(endTime);

  if (isHappeningNow || override != null) {
    return (
      <Price colorClass={ColorClass.Primary} className={styles.content}>
        {override ?? "Happening now"}
      </Price>
    );
  }

  return (
    <div className={joinClasses(styles.content, styles.condensed)}>
      <Price textTransform="uppercase" colorClass={ColorClass.Primary}>
        {startTime!.format("MMM")}
      </Price>
      <Header3 colorClass={ColorClass.Primary}>
        {startTime!.format("D")}
      </Header3>
    </div>
  );
}

export default function SpotlightOverlay(props: Props) {
  return (
    <OverlayContainer className={styles.container}>
      <SpotlightOverlayText {...props} />
    </OverlayContainer>
  );
}
