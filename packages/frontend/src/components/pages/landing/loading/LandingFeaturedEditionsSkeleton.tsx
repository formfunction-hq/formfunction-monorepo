import loadingStyles from "css/pages/landing/LandingFeaturedEditionsSkeleton.module.css";
import styles from "css/pages/landing/LandingFeaturedEditions.module.css";
import useBreakpoint from "hooks/useBreakpoint";
import Skeleton from "react-loading-skeleton";
import Header2 from "components/text/Header2";
import ColorClass from "types/enums/ColorClass";
import ArtistPillLoadingSkeleton from "components/auction/ArtistPillLoadingSkeleton";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import Price from "components/text/Price";
import Body1 from "components/text/Body1";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";

/**
 * Keep in sync with LandingFeaturedEditions.
 */
export default function LandingFeaturedEditionsSkeleton() {
  const { isMobileBreakpoint } = useBreakpoint();
  const assetSize = isMobileBreakpoint ? 320 : 480;

  return (
    <div className={styles.featuredEditionsCard}>
      <div className={styles.imageContainer}>
        <Skeleton
          className={loadingStyles.imageSkeleton}
          height={assetSize}
          width={assetSize}
        />
      </div>
      <div className={styles.content}>
        <Header2 colorClass={ColorClass.Primary}>
          <Skeleton width={300} />
        </Header2>
        <ArtistPillLoadingSkeleton />
        <NftLabelAndContent label="Editions Sold">
          <Price colorClass={ColorClass.Primary}>
            <Skeleton />
          </Price>
        </NftLabelAndContent>
        <NftLabelAndContent label="Description">
          <Body1 colorClass={ColorClass.Primary}>
            <Skeleton />
          </Body1>
        </NftLabelAndContent>
        <div className={styles.button}>
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            type="link_internal"
          >
            See the editions
          </ButtonWithText>
        </div>
      </div>
    </div>
  );
}
