import ResponsiveContainer from "components/containers/ResponsiveContainer";
import styles from "css/pages/campaign/campaign-v1/CampaignTop.module.css";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
};

export default function CampaignTop({ children }: Props): JSX.Element {
  const colorScheme = useCampaignColorScheme();

  return (
    <div
      className={joinClasses(
        styles.container,
        colorScheme.background.backgroundColorClass
      )}
    >
      <ResponsiveContainer className={styles.responsiveContainer}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
