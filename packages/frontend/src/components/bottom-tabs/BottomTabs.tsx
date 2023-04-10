import ActivityButtonIndicator from "components/activity/ActivityButtonIndicator";
import BottomTabButton from "components/buttons/BottomTabButton";
import CreateButton from "components/buttons/CreateButton";
import ProfileBottomTabButton from "components/buttons/ProfileBottomTabButton";
import BellIcon from "components/icons/BellIcon";
import CompassIcon from "components/icons/CompassIcon";
import PlusCircleIcon from "components/icons/PlusCircleIcon";
import styles from "css/bottom-tabs/BottomTabs.module.css";
import ColorValue from "types/enums/ColorValue";

export default function BottomTabs() {
  return (
    <div className={styles.tabs}>
      <BottomTabButton
        href="/explore"
        icon={<CompassIcon colorValue={ColorValue.Secondary} />}
      >
        Explore
      </BottomTabButton>
      <CreateButton
        placement="top"
        buttonOverride={
          <BottomTabButton
            disableLink
            href="/create"
            icon={<PlusCircleIcon colorValue={ColorValue.Secondary} />}
          >
            Create
          </BottomTabButton>
        }
      />
      <BottomTabButton
        href="/activity"
        icon={<BellIcon colorValue={ColorValue.Secondary} />}
      >
        <div className={styles.indicator}>
          <ActivityButtonIndicator />
        </div>
        Activity
      </BottomTabButton>
      <ProfileBottomTabButton />
    </div>
  );
}
