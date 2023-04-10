import ResponsivePageBody from "components/containers/ResponsivePageBody";
import styles from "css/pages/campaign/campaign-v1/CampaignBottom.module.css";

type Props = {
  children: any;
};

export default function CampaignBottom({ children }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <ResponsivePageBody>{children}</ResponsivePageBody>
    </div>
  );
}
