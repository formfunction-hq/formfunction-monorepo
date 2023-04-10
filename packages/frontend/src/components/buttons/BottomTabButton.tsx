import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";
import styles from "css/buttons/BottomTabButton.module.css";
import { Link } from "react-router-dom";

export default function BottomTabButton({
  children,
  className,
  disableLink,
  href,
  icon,
}: {
  children: any;
  className?: string;
  disableLink?: boolean;
  href: string;
  icon: JSX.Element;
}): JSX.Element {
  const isActive = window.location.href.includes(href);
  const button = (
    <div
      className={joinClasses(
        styles.tabButton,
        isActive ? styles.tabButtonActive : null,
        className
      )}
    >
      {icon}
      <Body2
        colorClass={isActive ? ColorClass.BrightPurple : ColorClass.Secondary}
        className={styles.tabButtonText}
      >
        {children}
      </Body2>
    </div>
  );

  return disableLink ? button : <Link to={href}>{button}</Link>;
}
