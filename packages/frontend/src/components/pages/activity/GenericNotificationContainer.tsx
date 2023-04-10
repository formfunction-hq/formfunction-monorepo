import HideIfEmpty from "components/containers/HideIfEmpty";
import Body1 from "components/text/Body1";
import Body2 from "components/text/Body2";
import styles from "css/pages/activity/GenericNotificationContainer.module.css";
import { Dayjs } from "dayjs";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import ColorClass from "types/enums/ColorClass";
import formatNotificationTimestamp from "utils/dates/formatNotificationTimestamp";

type Props = {
  actionButton?: MaybeUndef<JSX.Element>;
  asset?: JSX.Element;
  label: string | JSX.Element;
  left: JSX.Element;
  timestamp: Dayjs;
};

export default function GenericNotificationContainer({
  actionButton,
  asset,
  label,
  left,
  timestamp,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>{left}</div>
      <div className={styles.labelAndTimestamp}>
        <Body1 colorClass={ColorClass.Primary}>{label}</Body1>
        <Body2 colorClass={ColorClass.Secondary}>
          {formatNotificationTimestamp(timestamp)}
        </Body2>
        <HideIfEmpty className={styles.actionButton}>
          {actionButton}
        </HideIfEmpty>
      </div>
      {asset}
    </div>
  );
}
