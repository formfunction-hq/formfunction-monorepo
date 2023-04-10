import {
  SeriesPageContents_User$data,
  SeriesPageContents_User$key,
} from "components/pages/series/__generated__/SeriesPageContents_User.graphql";
import {
  SeriesPageContents_Series$data,
  SeriesPageContents_Series$key,
} from "components/pages/series/__generated__/SeriesPageContents_Series.graphql";
import { PreloadedQuery, useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import styles from "css/pages/series/SeriesPageContents.module.css";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import LandingFooter from "components/pages/landing/LandingFooter";
import PageWithBottomTabs from "components/containers/PageWithBottomTabs";
import { Suspense, useState } from "react";
import MaybeImgix from "components/images/MaybeImgix";
import Imgix from "react-imgix";
import HeaderTheme from "types/enums/HeaderTheme";
import Header from "components/header/Header";
import joinClasses from "utils/joinClasses";
import Header1 from "components/text/Header1";
import ArtistPillButton from "components/buttons/ArtistPillButton";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import getImgixUrl from "utils/getImgixUrl";
import ManageSeriesPiecesModal from "components/modal/ManageSeriesPiecesModal";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { SeriesSelectedNftsContextProvider } from "context/SeriesSelectedNftsContext";
import SeriesPageNfts from "components/pages/series/SeriesPageNfts";
import SeriesTabType from "types/enums/SeriesTabType";
import SeriesTabs from "components/pages/series/SeriesTabs";
import EditSeriesModal from "components/modal/EditSeriesModal";
import SeriesMetadataContextProvider from "context/SeriesMetadataContext";
import SeriesCount from "components/series/SeriesCount";
import IgnoreResponsiveContainerPadding from "components/containers/IgnoreResponsiveContainerPadding";
import useUserContext from "hooks/useUserContext";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import NftGridFullWidthLoading from "components/grids/nft/NftGridFullWidthLoading";
import useSolanaContext from "hooks/useSolanaContext";
import { useSeriesPageMetadataAccountsQuery } from "hooks/series-page/__generated__/useSeriesPageMetadataAccountsQuery.graphql";
import AboutCard from "components/cards/AboutCard";
import { useSeriesPageSeriesStatsQuery } from "hooks/series-page/__generated__/useSeriesPageSeriesStatsQuery.graphql";
import SeriesStats from "components/pages/series/SeriesStats";
import HideIfEmpty from "components/containers/HideIfEmpty";

const fragment = graphql`
  fragment SeriesPageContents_User on User {
    id
    username

    ProfilePhoto {
      id
      photoUrl
    }
  }
`;

const seriesFragment = graphql`
  fragment SeriesPageContents_Series on Series {
    id
    name
    description
    type

    AvatarPhoto {
      id
      photoUrl
    }

    CoverPhoto {
      id
      photoUrl
    }

    Nfts_aggregate(where: { status: { _neq: Burned } }) {
      aggregate {
        count
      }
    }

    ...ManageSeriesPiecesModal_Series
    ...SeriesMetadataContext_Series
    ...EditSeriesModal_Series
  }
`;

function SeriesHeaderActionButtons({
  onClickManagePieces,
  onClickEditSeriesInfo,
}: {
  onClickEditSeriesInfo: () => void;
  onClickManagePieces: () => void;
}) {
  return (
    <>
      <TextButton
        textDecoration="underline"
        buttonThemeOrColorClass={TextButtonTheme.White}
        onClick={onClickEditSeriesInfo}
      >
        Edit Series Info
      </TextButton>
      <Body1 colorClass={ColorClass.White}>•</Body1>
      <TextButton
        textDecoration="underline"
        buttonThemeOrColorClass={TextButtonTheme.White}
        onClick={onClickManagePieces}
      >
        Manage Pieces
      </TextButton>
    </>
  );
}

function SeriesHeaderRight({
  onClickEditSeriesInfo,
  onClickManagePieces,
  series,
  seriesStatsQueryRef,
  shouldShowSeriesActions,
  user,
}: {
  onClickEditSeriesInfo: () => void;
  onClickManagePieces: () => void;
  series: SeriesPageContents_Series$data;
  seriesStatsQueryRef: PreloadedQuery<useSeriesPageSeriesStatsQuery>;
  shouldShowSeriesActions: boolean;
  user: SeriesPageContents_User$data;
}): JSX.Element {
  const {
    name: seriesName,
    Nfts_aggregate: { aggregate },
  } = series;
  const { username, ProfilePhoto } = user;
  const { photoUrl: userProfilePicSrc } = ProfilePhoto ?? {};
  const { count: seriesNftCount } = aggregate ?? {};

  return (
    <div className={styles.seriesInfoRight}>
      <SeriesCount
        className={styles.seriesCount}
        count={seriesNftCount ?? 0}
        colorClass={ColorClass.White}
        seriesType={series.type}
      />
      <Header1 className={styles.seriesName} colorClass={ColorClass.White}>
        {seriesName}
      </Header1>
      <div className={styles.seriesArtistPill}>
        <ArtistPillButton name={username} src={userProfilePicSrc} />
      </div>
      <HideIfEmpty className={styles.seriesStats}>
        <SeriesStats seriesStatsQueryRef={seriesStatsQueryRef} />
      </HideIfEmpty>
      {shouldShowSeriesActions && (
        <div className={styles.seriesActions} style={{ height: "22px" }}>
          <Suspense fallback={null}>
            <SeriesHeaderActionButtons
              onClickEditSeriesInfo={onClickEditSeriesInfo}
              onClickManagePieces={onClickManagePieces}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}

function SeriesHeader({
  onClickEditSeriesInfo,
  onClickManagePieces,
  series,
  seriesStatsQueryRef,
  shouldShowSeriesActions,
  user,
}: {
  onClickEditSeriesInfo: () => void;
  onClickManagePieces: () => void;
  series: SeriesPageContents_Series$data;
  seriesStatsQueryRef: PreloadedQuery<useSeriesPageSeriesStatsQuery>;
  shouldShowSeriesActions: boolean;
  user: SeriesPageContents_User$data;
}): JSX.Element {
  const { anchorWallet } = useSolanaContext();
  const {
    CoverPhoto,
    AvatarPhoto: { photoUrl: previewPhotoSrc },
  } = series;
  const { photoUrl: coverPhotoSrc } = CoverPhoto ?? {};
  const withMobileHeaderClass =
    anchorWallet === null ? styles.withMobileHeader : null;

  return (
    <div className={joinClasses(styles.headerContainer, withMobileHeaderClass)}>
      {coverPhotoSrc == null ? (
        <div
          className={joinClasses(
            styles.coverPhoto,
            styles.coverPhotoEmpty,
            withMobileHeaderClass
          )}
        />
      ) : (
        <div
          className={joinClasses(styles.coverPhoto, withMobileHeaderClass)}
          style={{
            // Make height dynamic after making response
            background: `
              linear-gradient(0deg, rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28)), url(${coverPhotoSrc})
              no-repeat
              center / cover
            `,
          }}
        />
      )}
      <div className={styles.header}>
        <Header headerTheme={HeaderTheme.Light} />
      </div>
      <ResponsiveContainer
        className={joinClasses(styles.seriesInfo, withMobileHeaderClass)}
      >
        <div className={styles.left}>
          <MaybeImgix src={previewPhotoSrc}>
            <Imgix
              className={styles.seriesPreviewPhoto}
              src={previewPhotoSrc}
              width={350}
            />
            <img className={styles.seriesPreviewPhoto} src={previewPhotoSrc} />
          </MaybeImgix>
        </div>
        <div className={styles.right}>
          <SeriesHeaderRight
            series={series}
            user={user}
            shouldShowSeriesActions={shouldShowSeriesActions}
            onClickEditSeriesInfo={onClickEditSeriesInfo}
            onClickManagePieces={onClickManagePieces}
            seriesStatsQueryRef={seriesStatsQueryRef}
          />
        </div>
      </ResponsiveContainer>
    </div>
  );
}

function SeriesPageContentPiecesNullState({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className={joinClasses(styles.body, styles.about)}>
      <Body1
        colorClass={ColorClass.Primary}
        className={styles.bodyNullStateText}
        textAlign="center"
      >
        This series doesn&apos;t have any pieces in it yet! You can add pieces
        to this series by clicking &ldquo;Manage Pieces.&rdquo;
      </Body1>
      <ButtonWithText
        className={styles.bodyNullStateButton}
        fontClass={FontClass.NavLink}
        buttonTheme={ButtonTheme.PurpleGradient}
        onClick={onClick}
      >
        Manage Pieces
      </ButtonWithText>
      <img
        className={styles.illustration}
        src={getImgixUrl("illustrations/no-bids-cropped.png")}
      />
    </div>
  );
}

function SeriesPageAboutTabContent({ description }: { description: string }) {
  return (
    <div className={styles.body}>
      <AboutCard description={description} title="About this series" />
    </div>
  );
}

function SeriesPagePiecesTabContent({
  userId,
  onClickManagePieces,
  shouldShowNullState,
  nftQueryRef,
}: {
  nftQueryRef: MaybeUndef<PreloadedQuery<useSeriesPageMetadataAccountsQuery>>;
  onClickManagePieces: () => void;
  shouldShowNullState: boolean;
  userId: string;
}) {
  const { user: viewer } = useUserContext();
  const nullState =
    // Since the viewer may not be loaded yet, we show a loading spinner in case
    // we need to show the null-state (no way to know this in advance) since
    // otherwise, the null-state will just flash on and looks weird
    // TODO: maybe add a `isOwnProfile` value to the server return value?
    viewer === undefined ? (
      <div className={styles.body}>
        <NftGridFullWidthLoading />
      </div>
    ) : viewer?.id === userId ? (
      <SeriesPageContentPiecesNullState onClick={onClickManagePieces} />
    ) : null;

  return (
    <div className={shouldShowNullState === false ? styles.body : ""}>
      {shouldShowNullState === true
        ? nullState
        : nftQueryRef != null && <SeriesPageNfts nftQueryRef={nftQueryRef} />}
    </div>
  );
}

type Props = {
  nftQueryRef: MaybeUndef<PreloadedQuery<useSeriesPageMetadataAccountsQuery>>;
  series: SeriesPageContents_Series$key;
  seriesStatsQueryRef: PreloadedQuery<useSeriesPageSeriesStatsQuery>;
  user: SeriesPageContents_User$key;
};

export default function SeriesPageContents({
  user,
  series,
  nftQueryRef,
  seriesStatsQueryRef,
}: Props): JSX.Element {
  const userData = useFragment(fragment, user);
  const seriesData = useFragment(seriesFragment, series);
  const [isEditSeriesModalShown, setEditSeriesModaShown] = useState(false);
  const [isManageSeriesPiecesModalShown, setIsManageSeriesPiecesModalShown] =
    useState(false);
  const { user: viewer } = useUserContext();
  const isOwnProfile = viewer?.id === userData.id;
  const [tab, setTab] = useState<SeriesTabType>(SeriesTabType.Pieces);
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const numPieces = seriesData.Nfts_aggregate.aggregate?.count ?? 0;

  return (
    <>
      {isOwnProfile && (
        <Suspense fallback={null}>
          <SeriesSelectedNftsContextProvider
            currentSeriesId={seriesData.id}
            nftQueryRef={nftQueryRef}
          >
            <ManageSeriesPiecesModal
              isShown={isManageSeriesPiecesModalShown}
              onHide={() => setIsManageSeriesPiecesModalShown(false)}
              series={seriesData}
            />
          </SeriesSelectedNftsContextProvider>
        </Suspense>
      )}
      {isOwnProfile && (
        <SeriesMetadataContextProvider series={seriesData}>
          <EditSeriesModal
            isShown={isEditSeriesModalShown}
            onHide={() => setEditSeriesModaShown(false)}
            series={seriesData}
          />
        </SeriesMetadataContextProvider>
      )}
      <PageWithBottomTabs>
        <div className={styles.container}>
          {nftQueryRef != null && (
            <SeriesHeader
              series={seriesData}
              user={userData}
              shouldShowSeriesActions={isOwnProfile}
              onClickEditSeriesInfo={() => setEditSeriesModaShown(true)}
              onClickManagePieces={() =>
                setIsManageSeriesPiecesModalShown(true)
              }
              seriesStatsQueryRef={seriesStatsQueryRef}
            />
          )}
          <div className={styles.bodyContainer}>
            <ResponsiveContainer>
              <div className={styles.tabsContainer}>
                <SeriesTabs
                  numPieces={numPieces}
                  tab={tab}
                  setTab={setTab}
                  shouldShowAboutTab={
                    seriesData.description != null &&
                    seriesData.description !== ""
                  }
                />
                {isBottomTabsWidth ? (
                  <IgnoreResponsiveContainerPadding>
                    <div className={styles.tabsContainerDivider} />
                  </IgnoreResponsiveContainerPadding>
                ) : (
                  <div className={styles.tabsContainerDivider} />
                )}
              </div>
              <Suspense
                fallback={
                  <div className={styles.body}>
                    <NftGridFullWidthLoading
                      count={seriesData.Nfts_aggregate?.aggregate?.count}
                    />
                  </div>
                }
              >
                {tab === SeriesTabType.Pieces && (
                  <SeriesPagePiecesTabContent
                    userId={userData.id}
                    shouldShowNullState={numPieces === 0}
                    onClickManagePieces={() =>
                      setIsManageSeriesPiecesModalShown(true)
                    }
                    nftQueryRef={nftQueryRef}
                  />
                )}
              </Suspense>
              {tab === SeriesTabType.About && (
                <SeriesPageAboutTabContent
                  description={seriesData.description}
                />
              )}
            </ResponsiveContainer>
          </div>
          <LandingFooter />
        </div>
      </PageWithBottomTabs>
    </>
  );
}
