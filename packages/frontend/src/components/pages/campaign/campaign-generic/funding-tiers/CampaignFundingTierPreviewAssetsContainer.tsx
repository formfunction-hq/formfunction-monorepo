import styles from "css/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierPreviewAssetsContainer.module.css";

type Props = {
  children: any;
};

export default function CampaignFundingTierPreviewAssetsContainer({
  children,
}: Props): JSX.Element {
  return <div className={styles.assets}>{children}</div>;
}
