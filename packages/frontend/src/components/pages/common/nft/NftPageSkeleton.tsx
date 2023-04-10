import MobileTitleAndNav from "components/nav/MobileTitleAndNav";
import { HEADER_BREAKPOINT } from "constants/Breakpoints";
import styles from "css/pages/common/nft/NftPageContent.module.css";
import stylesInfo from "css/pages/common/nft/NftInfo.module.css";
import useBottomTabsContext from "hooks/useBottomTabsContext";
import useWindowDimensions from "hooks/useWindowDimensions";
import shouldUseWideAssetLayout from "utils/nft/shouldUseWideAssetLayout";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import Skeleton from "react-loading-skeleton";
import GlobalClass from "types/enums/GlobalClass";
import ChevronLeftIcon from "components/icons/ChevronLeftIcon";
import ColorValue from "types/enums/ColorValue";
import PlainButton from "components/buttons/PlainButton";
import EllipsisIcon from "components/icons/EllipsisIcon";
import getAssetDimensions from "utils/nft/getNftAssetDimensions";
import useDocumentBodyDimensions from "hooks/useDocumentBodyDimensions";
import Dimensions from "types/Dimensions";
import Header2 from "components/text/Header2";
import Body1 from "components/text/Body1";
import ArtistPillLoadingSkeleton from "components/auction/ArtistPillLoadingSkeleton";

type Props = {
  dimensions: Dimensions;
};

export default function NftPageSkeleton({ dimensions }: Props): JSX.Element {
  const isWideAsset = shouldUseWideAssetLayout(
    dimensions.height,
    dimensions.width
  );
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { hasBottomTabs } = useBottomTabsContext();
  const { width: documentWidth } = useDocumentBodyDimensions();

  const assetDimensions = getAssetDimensions(
    dimensions.height,
    dimensions.width,
    windowHeight,
    windowWidth,
    documentWidth
  );

  const asset = (
    <div className={styles.imageContainer} style={assetDimensions ?? {}}>
      <Skeleton className={styles.image} />
    </div>
  );

  return (
    <div>
      {windowWidth > HEADER_BREAKPOINT && isWideAsset && (
        <div className={styles.wideAssetContainer}>{asset}</div>
      )}
      <div className={styles.body}>
        {hasBottomTabs && (
          <MobileTitleAndNav
            left={<ChevronLeftIcon colorValue={ColorValue.Secondary} />}
            right={
              <PlainButton className={GlobalClass.HideText}>
                <EllipsisIcon colorValue={ColorValue.Secondary} />
              </PlainButton>
            }
            title="Loading..."
          />
        )}
        {windowWidth > HEADER_BREAKPOINT && !isWideAsset && asset}
        {windowWidth <= HEADER_BREAKPOINT && asset}
        <div className={styles.info}>
          <div>
            <Header2 colorClass={null}>
              <Skeleton width={300} />
            </Header2>
            <div className={stylesInfo.typeLabel}>
              <Body1 colorClass={null}>
                <Skeleton width={100} />
              </Body1>
            </div>
          </div>
          <NftLabelAndContent label="Creator">
            <ArtistPillLoadingSkeleton />
          </NftLabelAndContent>
        </div>
      </div>
    </div>
  );
}
