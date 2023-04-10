import styles from "css/pages/campaign/campaign-generic/hero/CampaignHeroAssets.module.css";
import loadingStyles from "css/pages/campaign/campaign-v1/skeletons/CampaignHeroAssetsSkeleton.module.css";
import Skeleton from "react-loading-skeleton";
import { range } from "formfn-shared/dist/utils/range";
import ColorValue from "types/enums/ColorValue";
import AspectRatioContainer from "components/containers/AspectRatioContainer";

export default function CampaignHeroAssetsSkeleton(): JSX.Element {
  return (
    <div className={styles.container}>
      <AspectRatioContainer width={16} height={9}>
        <Skeleton
          baseColor={ColorValue.Ghost}
          className={loadingStyles.mainAsset}
        />
      </AspectRatioContainer>
      <div className={styles.assetPicker}>
        {range(3).map((i) => (
          <Skeleton
            baseColor={ColorValue.Ghost}
            className={loadingStyles.pickerAsset}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
