import styles from "css/pages/campaign/campaign-v1/CampaignTabsContent.module.css";

type Props = {
  children: any;
};

export default function CampaignTabsContent({ children }: Props): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}
