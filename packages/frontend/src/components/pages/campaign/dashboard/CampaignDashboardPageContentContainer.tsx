import ResponsivePageBody from "components/containers/ResponsivePageBody";
import styles from "css/pages/campaign/dashboard/CampaignDashboardPageContentContainer.module.css";

type Props = {
  children: any;
};

export default function CampaignDashboardPageContentContainer({
  children,
}: Props): JSX.Element {
  return (
    <ResponsivePageBody className={styles.container}>
      {children}
    </ResponsivePageBody>
  );
}
