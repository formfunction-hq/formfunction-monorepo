import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ArtName from "components/text/ArtName";
import Body1 from "components/text/Body1";
import Body1Medium from "components/text/Body1Medium";
import styles from "css/pages/campaign/campaign-v1/sections/GenericCampaignSectionPreview.module.css";
import { range } from "formfn-shared/dist/utils/range";
import Skeleton from "react-loading-skeleton";
import ColorValue from "types/enums/ColorValue";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";

export default function CampaignSectionPreviewSkeleton(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.assets}>
        {range(3).map((i) => (
          <Skeleton key={i} height={96} width={96} />
        ))}
      </div>
      <div className={styles.text}>
        <ArtName colorClass={null}>
          <Skeleton width={200} />
        </ArtName>
        <Body1 colorClass={null}>
          <Skeleton width={300} />
          <Skeleton width={300} />
        </Body1>
        <Body1Medium
          className={joinClasses(GlobalClass.GradientText, styles.seePieces)}
          colorClass={null}
        >
          See pieces
          <ArrowRightIcon colorValue={ColorValue.BrightPurple} size={24} />
        </Body1Medium>
      </div>
    </div>
  );
}
