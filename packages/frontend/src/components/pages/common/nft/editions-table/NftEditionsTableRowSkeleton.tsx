import ArrowRightIcon from "components/icons/ArrowRightIcon";
import NftAssetSkeleton from "components/images/NftAssetSkeleton";
import NftEditionsTableStructure from "components/pages/common/nft/editions-table/NftEditionsTableStructure";
import Body1 from "components/text/Body1";
import styles from "css/pages/common/nft/editions-table/NftEditionsTableRow.module.css";
import useBreakpoint from "hooks/useBreakpoint";
import Skeleton from "react-loading-skeleton";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import NftAssetSize from "types/enums/NftAssetSize";

export default function NftEditionsTableRowSkeleton() {
  const { isMobileBreakpoint } = useBreakpoint();

  return (
    <NftEditionsTableStructure>
      <div className={styles.imageContainer}>
        {!isMobileBreakpoint && <NftAssetSkeleton size={NftAssetSize.Size32} />}
        <Body1 colorClass={ColorClass.Primary}>
          <Skeleton width={20} />
        </Body1>
      </div>
      <Body1 colorClass={ColorClass.Primary}>
        <Skeleton width={80} />
      </Body1>
      <Body1 colorClass={ColorClass.Primary}>
        <Skeleton width={80} />
      </Body1>
      <ArrowRightIcon colorValue={ColorValue.Secondary} size={20} />
    </NftEditionsTableStructure>
  );
}
