import styles from "css/pages/campaign/edit/CampaignPublishOrSubmitContainer.module.css";

type Props = {
  children: any;
};

export default function CampaignPublishOrSubmitContainer({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
