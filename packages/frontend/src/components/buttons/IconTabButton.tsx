import styles from "css/buttons/IconTabButton.module.css";
import PlainButton from "components/buttons/PlainButton";
import joinClasses from "utils/joinClasses";

type Props = {
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
};

export default function IconTabButton({
  isActive = false,
  icon,
  onClick,
}: Props) {
  return (
    <PlainButton
      className={joinClasses(styles.tab, isActive ? styles.tabActive : null)}
      onClick={onClick}
    >
      {icon}
    </PlainButton>
  );
}
