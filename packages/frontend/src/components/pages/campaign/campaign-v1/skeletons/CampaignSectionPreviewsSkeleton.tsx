import CampaignSectionPreviewSkeleton from "components/pages/campaign/campaign-v1/skeletons/CampaignSectionPreviewSkeleton";
import Header3 from "components/text/Header3";
import styles from "css/pages/campaign/campaign-v1/CampaignSectionPreviews.module.css";
import { range } from "formfn-shared/dist/utils/range";
import ColorClass from "types/enums/ColorClass";

export default function CampaignSectionPreviewsSkeleton(): JSX.Element {
  return (
    <div>
      <Header3 colorClass={ColorClass.Primary} textAlign="center">
        Ways to support
      </Header3>
      <div className={styles.previews}>
        {range(3).map((i) => (
          <CampaignSectionPreviewSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
