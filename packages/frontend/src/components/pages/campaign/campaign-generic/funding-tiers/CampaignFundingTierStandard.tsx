import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import Body1 from "components/text/Body1";
import Body1Medium from "components/text/Body1Medium";
import Header3 from "components/text/Header3";
import styles from "css/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierStandard.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ColorClass from "types/enums/ColorClass";

type Props = {
  benefits: ReadonlyArray<string>;
  description: string | JSX.Element;
  id: Maybe<string>;
  nfts: ReadonlyArray<JSX.Element>;
  title: string | JSX.Element;
};

export default function CampaignFundingTierStandard({
  benefits,
  description,
  id,
  nfts,
  title,
}: Props) {
  return (
    <div id={id ?? undefined}>
      <div className={styles.text}>
        <Header3 colorClass={ColorClass.Primary}>{title}</Header3>
        <div className={styles.textSection}>
          <Body1Medium colorClass={ColorClass.Primary}>Description</Body1Medium>
          <Body1 colorClass={ColorClass.Primary}>{description}</Body1>
        </div>
        {benefits.length > 0 && (
          <div className={styles.textSection}>
            <Body1Medium colorClass={ColorClass.Primary}>
              Benefits • The owners of this collection will receive the
              following
            </Body1Medium>
            <Body1 colorClass={ColorClass.Primary}>
              <ul className={styles.benefits}>
                {benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </Body1>
          </div>
        )}
      </div>
      <NftGridFullWidth className={styles.nftGrid}>{nfts}</NftGridFullWidth>
    </div>
  );
}
