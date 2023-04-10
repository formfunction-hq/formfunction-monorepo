import styles from "css/campaigns/CampaignGridFullWidth.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
};

export default function CampaignGridFullWidth({
  children,
  className,
}: Props): JSX.Element {
  return <div className={joinClasses(styles.grid, className)}>{children}</div>;
}
