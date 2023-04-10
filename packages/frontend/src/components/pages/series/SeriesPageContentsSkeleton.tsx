import ResponsiveContainer from "components/containers/ResponsiveContainer";
import seriesPageContentsStyles from "css/pages/series/SeriesPageContents.module.css";
import styles from "css/pages/series/SeriesPageContentsSkeleton.module.css";
import Header from "components/header/Header";
import joinClasses from "utils/joinClasses";
import useSolanaContext from "hooks/useSolanaContext";
import HeaderTheme from "types/enums/HeaderTheme";
import Skeleton from "react-loading-skeleton";
import SeriesCount from "components/series/SeriesCount";
import ColorClass from "types/enums/ColorClass";
import SeriesTabs from "components/pages/series/SeriesTabs";
import SeriesTabType from "types/enums/SeriesTabType";
import NftGridFullWidthLoading from "components/grids/nft/NftGridFullWidthLoading";
import ArtistPillLoadingSkeleton from "components/auction/ArtistPillLoadingSkeleton";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import Header1 from "components/text/Header1";
import ColorValue from "types/enums/ColorValue";

function SeriesHeaderRightSkeleton(): JSX.Element {
  return (
    <div className={seriesPageContentsStyles.seriesInfoRight}>
      <SeriesCount
        className={seriesPageContentsStyles.seriesCount}
        count={0}
        colorClass={ColorClass.White}
        // This doesn't really affect the skeleton, so just pass some value
        seriesType="UserCurated"
      />
      <Header1
        colorClass={ColorClass.White}
        className={seriesPageContentsStyles.seriesName}
      >
        <Skeleton width={250} />
      </Header1>
      <ArtistPillLoadingSkeleton />
    </div>
  );
}

function SeriesHeaderSkeleton(): JSX.Element {
  const { anchorWallet } = useSolanaContext();

  const withMobileHeaderClass =
    anchorWallet === null ? seriesPageContentsStyles.withMobileHeader : null;

  return (
    <div
      className={joinClasses(
        seriesPageContentsStyles.headerContainer,
        withMobileHeaderClass
      )}
    >
      <div className={seriesPageContentsStyles.header}>
        <Header headerTheme={HeaderTheme.Light} />
      </div>
      <div
        className={joinClasses(
          seriesPageContentsStyles.coverPhoto,
          withMobileHeaderClass
        )}
      >
        <Skeleton
          baseColor={ColorValue.Ghost}
          className={styles.coverPhotoSkeleton}
          width="100%"
          height="100%"
        />
      </div>

      <ResponsiveContainer
        className={joinClasses(
          seriesPageContentsStyles.seriesInfo,
          withMobileHeaderClass
        )}
      >
        <div className={seriesPageContentsStyles.left}>
          <Skeleton className={seriesPageContentsStyles.seriesPreviewPhoto} />
        </div>
        <SeriesHeaderRightSkeleton />
      </ResponsiveContainer>
    </div>
  );
}

export default function SeriesPageContentsSkeleton(): JSX.Element {
  return (
    <div>
      <SeriesHeaderSkeleton />
      <div className={seriesPageContentsStyles.bodyContainer}>
        <ResponsiveContainer>
          <div className={seriesPageContentsStyles.tabsContainer}>
            <SeriesTabs
              numPieces={0}
              tab={SeriesTabType.Pieces}
              setTab={emptyFunction}
              shouldShowAboutTab
            />
            <div className={seriesPageContentsStyles.tabsContainerDivider} />
          </div>
          <div className={seriesPageContentsStyles.body}>
            <NftGridFullWidthLoading />
          </div>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
