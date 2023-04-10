import ActivityButtonIndicator from "components/activity/ActivityButtonIndicator";
import BellIcon from "components/icons/BellIcon";
import styles from "css/buttons/ActivityButton.module.css";
import { Link } from "react-router-dom";
import ColorValue from "types/enums/ColorValue";

export default function ActivityButton(): JSX.Element {
  return (
    <Link className={styles.container} to="/activity">
      <div className={styles.indicator}>
        <ActivityButtonIndicator />
      </div>
      <BellIcon colorValue={ColorValue.Primary} />
    </Link>
  );
}
