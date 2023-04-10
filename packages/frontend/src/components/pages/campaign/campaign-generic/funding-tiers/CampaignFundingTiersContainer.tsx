import styles from "css/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTiersContainer.module.css";
import intersperseFn from "utils/intersperseFn";

type Props = {
  children: Array<JSX.Element>;
};

export default function CampaignFundingTiersContainer({ children }: Props) {
  return (
    <div className={styles.container}>
      {intersperseFn(children, (index) => (
        <div key={`separator${index}`} className={styles.separator} />
      ))}
    </div>
  );
}
