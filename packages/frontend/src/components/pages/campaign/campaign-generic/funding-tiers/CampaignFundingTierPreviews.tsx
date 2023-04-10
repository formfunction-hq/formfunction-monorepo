import CampaignFundingTierPreviewGridFullWidth from "components/grids/campaigns/CampaignFundingTierPreviewGridFullWidth";
import Header3 from "components/text/Header3";
import styles from "css/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierPreviews.module.css";
import ColorClass from "types/enums/ColorClass";

type Props = {
  children: Array<JSX.Element>;
};

export default function CampaignFundingTierPreviews({ children }: Props) {
  return (
    <div>
      <Header3 colorClass={ColorClass.Primary} textAlign="center">
        Ways to support
      </Header3>
      <CampaignFundingTierPreviewGridFullWidth className={styles.previews}>
        {children}
      </CampaignFundingTierPreviewGridFullWidth>
    </div>
  );
}
