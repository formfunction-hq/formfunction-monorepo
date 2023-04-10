import InfoIcon from "components/icons/InfoIcon";
import styles from "css/pages/activity/ActivityNotificationInfoCircle.module.css";
import ColorValue from "types/enums/ColorValue";

export default function ActivityNotificationInfoCircle() {
  return (
    <div className={styles.container}>
      <InfoIcon colorValue={ColorValue.Primary} size={24} />
    </div>
  );
}
