import {
  ProfilePageForUser_User$data,
  ProfilePageForUser_User$key,
} from "components/pages/profile/__generated__/ProfilePageForUser_User.graphql";
import {
  PreloadedQuery,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import graphql from "babel-plugin-relay/macro";
import HeaderAndCoverPhoto from "components/header/HeaderAndCoverPhoto";
import styles from "css/pages/profile/ProfilePageForUser.module.css";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import Header2 from "components/text/Header2";
import ShadowButton from "components/buttons/ShadowButton";
import TwitterIcon from "components/icons/TwitterIcon";
import ColorValue from "types/enums/ColorValue";
import CopyAddressButton from "components/buttons/CopyAddressButton";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import LandingFooter from "components/pages/landing/LandingFooter";
import ProfileNfts from "components/pages/profile/ProfileNfts";
import useSolanaContext from "hooks/useSolanaContext";
import useWindowDimensions from "hooks/useWindowDimensions";
import PageWithBottomTabs from "components/containers/PageWithBottomTabs";
import EllipsisIcon from "components/icons/EllipsisIcon";
import PlainButton from "components/buttons/PlainButton";
import GlobalClass from "types/enums/GlobalClass";
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useContext,
  useState,
} from "react";
import ProfileBottomDrawer from "components/drawers/ProfileBottomDrawer";
import OtherProfileModal from "components/modal/OtherProfileModal";
import Body2 from "components/text/Body2";
import VerifiedCheckmarkGradientIcon from "components/icons/VerifiedCheckmarkGradientIcon";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import formatUsername from "utils/formatUsername";
import MaybeImgix from "components/images/MaybeImgix";
import Imgix from "react-imgix";
import ProfileTabs from "components/pages/profile/ProfileTabs";
import ProfileTabType from "types/enums/ProfileTabType";
import { ProfilePageForUserMetadataAccounts_Query$key } from "components/pages/profile/__generated__/ProfilePageForUserMetadataAccounts_Query.graphql";
import CreateSeriesModal from "components/modal/CreateSeriesModal";
import ProfileTabsAndNftsLoading from "components/pages/profile/ProfileTabsAndNftsLoading";
import SeriesMetadataContextProvider from "context/SeriesMetadataContext";
import FollowButton from "components/buttons/FollowButton";
import UserFollowsInfo from "components/pages/profile/UserFollowsInfo";
import {
  ProfilePageForUserSeries_Query$data,
  ProfilePageForUserSeries_Query$key,
} from "components/pages/profile/__generated__/ProfilePageForUserSeries_Query.graphql";
import useUserContext from "hooks/useUserContext";
import { ProfilePageModalContext } from "context/ProfilePageModalContext";
import MobileProfileTabs from "components/pages/profile/MobileProfileTabs";
import IgnoreResponsiveContainerPadding from "components/containers/IgnoreResponsiveContainerPadding";
import useProfileTab from "hooks/useProfileTab";
import { ProfilePageForUserMetadataAccountsCollected_Query$key } from "components/pages/profile/__generated__/ProfilePageForUserMetadataAccountsCollected_Query.graphql";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import ProfileJoinDiscordCard from "components/pages/profile/ProfileJoinDiscordCard";
import { profilePageMetadataAccountsQuery } from "hooks/profile-page/useProfilePageMetadataAccounts";
import { useProfilePageMetadataAccountsQuery } from "hooks/profile-page/__generated__/useProfilePageMetadataAccountsQuery.graphql";
import ManageSeriesModal from "components/modal/ManageSeriesModal";
import DiscordAuthModals from "components/modal/DiscordAuthModals";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import useFlagsTyped from "hooks/useFlagsTyped";
import ProfileCampaignCard from "components/pages/profile/ProfileCampaignCard";
import useColorModeContext from "hooks/useColorModeContext";
import VerifiedCheckmarkIcon from "components/icons/VerifiedCheckmarkIcon";
import SocialLinkButton from "components/buttons/SocialLinkButton";
import { useProfilePageCreatedCampaignsQuery } from "hooks/profile-page/__generated__/useProfilePageCreatedCampaignsQuery.graphql";
import { useProfilePageCampaignsWhereUserIsActiveSupporterQuery } from "hooks/profile-page/__generated__/useProfilePageCampaignsWhereUserIsActiveSupporterQuery.graphql";
import ProfileCampaignCardV2 from "components/pages/profile/ProfileCampaignV2Card";
import CreateAirdropsModal from "components/modal/CreateAirdropsModal";
import getUrlWithoutParam from "utils/getUrlWithoutParam";
import ProfileUrlParamKey from "formfn-shared/dist/types/enums/ProfileUrlParamKey";
import { useNavigate } from "react-router-dom";

// At this point, shadow buttons are moved up to cover photo area
const BIGGER_BREAKPOINT = 1100;

// At this point, shadow buttons are moved down to below username
export const MOBILE_BREAKPOINT = 768;

const fragment = graphql`
  fragment ProfilePageForUser_User on User {
    id

    bio
    displayName
    instagramName
    shouldSeeDiscordOnboardingPrompt
    twitterName
    username
    websiteUrl

    CoverPhoto {
      id
      photoUrl
    }

    ProfilePhoto {
      id
      photoUrl
    }

    isWhitelisted

    CreatorStory {
      id
    }

    DiscordAuth {
      discordUserId
      hasConnectedDiscordAccount
      hasJoinedDiscordServer
    }

    ...ProfileCreatorStory_User
    ...ProfileNfts_User
    ...ManageSeriesModal_User

    # TODO: we shouldn't need this, but if we don't include it, it will show up as
    # blank if you go to the profile page, and then the edit profile page
    ...EditProfileForm_User
    ...EditCreatorStoryForm_User
    ...UserFollowsInfo_User
    ...ProfileJoinDiscordCard_User
    ...DiscordAuthModals_User
    ...ProfileCampaignCard_User
  }
`;

// IMPORTANT: keep in sync with relay updater in SeriesDndRow.tsx
export const seriesFragment = graphql`
  fragment ProfilePageForUserSeries_Query on query_root {
    Series(where: $seriesWhere, order_by: $seriesOrderBy) {
      id
      ...ManageSeriesModal_Series
    }

    ...ProfileSeriesSeries_Query
  }
`;

export const nftFragment = graphql`
  fragment ProfilePageForUserMetadataAccounts_Query on query_root
  @refetchable(queryName: "ProfilePageForUserMetadataAccountsPaginationQuery") {
    metadataAccountsCreated {
      metadataAccounts(
        after: $metadataAccountsCreatedAfter
        first: $metadataAccountsCreatedFirst
        input: $metadataAccountsCreatedInput
      )
        @connection(
          key: "ProfilePageForUser_MetadataAccounts_Query_metadataAccounts"
        ) {
        # eslint-disable-next-line relay/unused-fields
        edges {
          # eslint-disable-next-line relay/unused-fields
          node {
            ...NftsForAddress_MetadataAccount
          }
        }

        totalCount
      }
    }
  }
`;

export const nftsCollectedFragment = graphql`
  fragment ProfilePageForUserMetadataAccountsCollected_Query on query_root
  @refetchable(
    queryName: "ProfilePageForUserMetadataAccountsCollectedPaginationQuery"
  ) {
    metadataAccountsCollected {
      metadataAccounts(
        after: $metadataAccountsCollectedAfter
        first: $metadataAccountsCollectedFirst
        input: $metadataAccountsCollectedInput
      )
        @connection(
          key: "ProfilePageForUser_MetadataAccountsCollected_Query_metadataAccounts"
        ) {
        # eslint-disable-next-line relay/unused-fields
        edges {
          # eslint-disable-next-line relay/unused-fields
          node {
            ...NftsForAddress_MetadataAccount
          }
        }

        totalCount
      }
    }
  }
`;

export const nftsCollectedAndListedFragment = graphql`
  fragment ProfilePageForUserMetadataAccountsCollectedAndListed_Query on query_root
  @refetchable(
    queryName: "ProfilePageForUserMetadataAccountsCollectedAndListedPaginationQuery"
  ) {
    metadataAccountsCollected {
      # eslint-disable-next-line relay/unused-fields
      metadataAccountsListedByUser(
        after: $metadataAccountsCollectedAndListedAfter
        first: $metadataAccountsCollectedAndListedFirst
        input: $metadataAccountsCollectedInput
      )
        @connection(
          key: "ProfilePageForUser_MetadataAccountsCollectedAndListed_Query_metadataAccountsListedByUser"
        ) {
        # eslint-disable-next-line relay/unused-fields
        edges {
          # eslint-disable-next-line relay/unused-fields
          node {
            ...NftsForAddress_MetadataAccount
          }
        }

        totalCount
      }
    }
  }
`;

function ShadowButtons({
  setIsBottomDrawerShown,
  userData,
}: {
  setIsBottomDrawerShown: (val: boolean) => void;
  userData: ProfilePageForUser_User$data;
}): JSX.Element {
  const { isDarkMode } = useColorModeContext();
  const { width } = useWindowDimensions();
  const { anchorWallet } = useSolanaContext();
  const isOwnProfile =
    anchorWallet?.publicKey != null &&
    arePublicKeysEqual(anchorWallet?.publicKey, userData.id);

  return (
    <div className={styles.shadowButtons}>
      {!isEmptyString(userData.twitterName) && (
        <ShadowButton
          className={styles.shadowButtonSocialLarge}
          href={`https://twitter.com/${userData.twitterName}`}
          type="link_external"
        >
          <TwitterIcon colorValue={ColorValue.Secondary} />
          <Body2
            colorClass={ColorClass.Secondary}
            className={styles.shadowButtonSocialLargeText}
          >{`@${userData.twitterName}`}</Body2>
          {isDarkMode ? (
            <VerifiedCheckmarkIcon colorValue={ColorValue.BrightPurple} />
          ) : (
            <VerifiedCheckmarkGradientIcon />
          )}
        </ShadowButton>
      )}
      {!isEmptyString(userData.instagramName) && (
        <SocialLinkButton
          href={`https://instagram.com/${userData.instagramName}`}
          socialType="instagram"
        />
      )}
      {userData.DiscordAuth?.hasConnectedDiscordAccount === true && (
        <SocialLinkButton
          href={`https://discord.com/users/${userData.DiscordAuth.discordUserId}`}
          socialType="discord"
        />
      )}
      {!isEmptyString(userData.websiteUrl) && (
        <SocialLinkButton href={userData.websiteUrl!} socialType="website" />
      )}
      <CopyAddressButton address={userData.id} extraShort={width < 400} />
      {width > BIGGER_BREAKPOINT && !isOwnProfile && (
        <PlainButton
          className={GlobalClass.HideText}
          onClick={() => setIsBottomDrawerShown(true)}
        >
          <EllipsisIcon colorValue={ColorValue.Secondary} />
        </PlainButton>
      )}
    </div>
  );
}

function ProfileActionButton({
  isOwnProfile,
  profileData,
}: {
  isOwnProfile: boolean;
  profileData: ProfilePageForUser_User$data;
}): JSX.Element | null {
  const { user: viewer } = useUserContext();

  return isOwnProfile ? (
    <ButtonWithText
      buttonTheme={ButtonTheme.BrightPurpleOutlineWebsiteBackground}
      fontClass={FontClass.NavLink}
      className={styles.editProfileButton}
      href="/profile/edit"
      type="link_internal"
    >
      Edit Profile
    </ButtonWithText>
  ) : viewer != null ? (
    <Suspense fallback={null}>
      <FollowButton
        followedName={
          !isEmptyString(profileData.displayName)
            ? profileData.displayName
            : profileData.username
        }
        followedId={profileData.id}
        followerId={viewer.id}
      />
    </Suspense>
  ) : null;
}

function Row1({
  setIsBottomDrawerShown,
  userData,
}: {
  setIsBottomDrawerShown: (val: boolean) => void;
  userData: ProfilePageForUser_User$data;
}): JSX.Element {
  const { anchorWallet } = useSolanaContext();
  const { width } = useWindowDimensions();
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const isOwnProfile =
    anchorWallet?.publicKey != null &&
    arePublicKeysEqual(anchorWallet.publicKey, userData.id);

  return (
    <div className={styles.row1}>
      <div className={styles.row1Left}>
        <Header2 colorClass={ColorClass.Primary}>
          {!isEmptyString(userData.displayName)
            ? userData.displayName!
            : formatUsername(userData.username)!}
        </Header2>
        {width > BIGGER_BREAKPOINT && (
          <ShadowButtons
            setIsBottomDrawerShown={setIsBottomDrawerShown}
            userData={userData}
          />
        )}
        {((isOwnProfile && isBottomTabsWidth) ||
          (!isOwnProfile && width <= BIGGER_BREAKPOINT)) && (
          <PlainButton
            className={GlobalClass.HideText}
            onClick={() => setIsBottomDrawerShown(true)}
          >
            <EllipsisIcon colorValue={ColorValue.Secondary} />
          </PlainButton>
        )}
      </div>
      {width > MOBILE_BREAKPOINT && (
        <ProfileActionButton
          isOwnProfile={isOwnProfile}
          profileData={userData}
        />
      )}
    </div>
  );
}

function Row2({
  userData,
}: {
  userData: ProfilePageForUser_User$data;
}): Maybe<JSX.Element> {
  return userData.bio != null ? (
    <Body1 className={styles.row2} colorClass={ColorClass.Secondary}>
      {userData.bio}
    </Body1>
  ) : null;
}

function ProfileTabsAndActions({
  createdCampaignsQueryRef,
  tab,
  setTab,
  userData,
  seriesData,
  supportedCampaignsQueryRef,
  nftQueryRef,
}: {
  createdCampaignsQueryRef: PreloadedQuery<useProfilePageCreatedCampaignsQuery>;
  nftQueryRef: PreloadedQuery<useProfilePageMetadataAccountsQuery>;
  seriesData: ProfilePageForUserSeries_Query$data;
  setTab: Dispatch<SetStateAction<ProfileTabType>>;
  supportedCampaignsQueryRef: PreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>;
  tab: ProfileTabType;
  userData: ProfilePageForUser_User$data;
}): JSX.Element {
  const { enableCampaignsOnProfile } = useFlagsTyped();
  const { user: viewer } = useUserContext();
  const metadataAccountsPreloadedQuery =
    usePreloadedQuery<useProfilePageMetadataAccountsQuery>(
      profilePageMetadataAccountsQuery,
      nftQueryRef
    );
  const { data: metadataAccountsData } = usePaginationFragment<
    useProfilePageMetadataAccountsQuery,
    ProfilePageForUserMetadataAccounts_Query$key
  >(nftFragment, metadataAccountsPreloadedQuery);
  const { data: metadataAccountsCollectedData } = usePaginationFragment<
    useProfilePageMetadataAccountsQuery,
    ProfilePageForUserMetadataAccountsCollected_Query$key
  >(nftsCollectedFragment, metadataAccountsPreloadedQuery);
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const showSeriesTab = userData.isWhitelisted && seriesData.Series.length > 0;
  // We use a different criteria for mobile so that creators can create a series on mobile
  // even if they currently have no series
  const showSeriesTabForMobile =
    showSeriesTab || (userData.id === viewer?.id && userData.isWhitelisted);

  return (
    <div className={styles.profileTabsContainer}>
      {isBottomTabsWidth ? (
        <MobileProfileTabs
          tab={tab}
          setTab={setTab}
          showCampaignsTab={enableCampaignsOnProfile && userData.isWhitelisted}
          showCampaignsWhereUserIsActiveSupporterTab={enableCampaignsOnProfile}
          showSeriesTab={showSeriesTabForMobile}
          showCreatedTab={userData.isWhitelisted === true}
          showCreatorStoryTab={
            userData.CreatorStory != null && userData.isWhitelisted
          }
        />
      ) : (
        <div className={styles.profileTabsDesktopContainer}>
          <ProfileTabs
            createdCampaignsQueryRef={createdCampaignsQueryRef}
            numCreated={
              metadataAccountsData.metadataAccountsCreated.metadataAccounts
                .totalCount
            }
            numCollected={
              metadataAccountsCollectedData.metadataAccountsCollected
                .metadataAccounts.totalCount
            }
            numSeries={seriesData.Series.length}
            tab={tab}
            setTab={setTab}
            showCampaignsTab={
              enableCampaignsOnProfile && userData.isWhitelisted
            }
            showCampaignsWhereUserIsActiveSupporterTab={
              enableCampaignsOnProfile
            }
            showSeriesTab={showSeriesTab}
            showCreatedTab={userData.isWhitelisted === true}
            showCreatorStoryTab={
              userData.CreatorStory != null && userData.isWhitelisted
            }
            supportedCampaignsQueryRef={supportedCampaignsQueryRef}
          />
        </div>
      )}
      {isBottomTabsWidth ? (
        <IgnoreResponsiveContainerPadding>
          <div className={styles.profileTabsContainerDivider} />
        </IgnoreResponsiveContainerPadding>
      ) : (
        <div className={styles.profileTabsContainerDivider} />
      )}
    </div>
  );
}

// Verbose to make it easier to reason through the different conditions here.
function shouldShowDiscordBanner(
  discordAuth: ProfilePageForUser_User$data["DiscordAuth"]
) {
  if (discordAuth == null) {
    return true;
  }

  const { hasConnectedDiscordAccount, hasJoinedDiscordServer } = discordAuth;
  return (
    hasConnectedDiscordAccount === false || hasJoinedDiscordServer === false
  );
}

type Props = {
  createdCampaignsQueryRef: PreloadedQuery<useProfilePageCreatedCampaignsQuery>;
  nftQueryRef: MaybeUndef<PreloadedQuery<useProfilePageMetadataAccountsQuery>>;
  series: ProfilePageForUserSeries_Query$key;
  supportedCampaignsQueryRef: PreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>;
  user: ProfilePageForUser_User$key;
};

export default function ProfilePageForUser({
  createdCampaignsQueryRef,
  nftQueryRef,
  series,
  supportedCampaignsQueryRef,
  user,
}: Props): JSX.Element {
  const { enableCampaignsOnProfile } = useFlagsTyped();
  const userData = useFragment(fragment, user);
  const seriesData = useFragment(seriesFragment, series);
  const { width } = useWindowDimensions();
  const [isBottomDrawerShown, setIsBottomDrawerShown] = useState(false);
  const { anchorWallet } = useSolanaContext();
  const navigate = useNavigate();
  const isOwnProfile =
    anchorWallet?.publicKey != null &&
    arePublicKeysEqual(anchorWallet.publicKey, userData.id);
  const [tab, setTab] = useProfileTab(userData.isWhitelisted);
  const {
    isCreateAirdropsModalShown,
    isCreateSeriesModalShown,
    isManageSeriesModalShown,
    setIsCreateAirdropsModalShown,
    setIsCreateSeriesModalShown,
    setIsManageSeriesModalShown,
  } = useContext(ProfilePageModalContext);

  const shouldShowJoinDiscordBanner =
    isOwnProfile &&
    userData.isWhitelisted &&
    userData.shouldSeeDiscordOnboardingPrompt &&
    shouldShowDiscordBanner(userData.DiscordAuth);

  return (
    <>
      <DiscordAuthModals renderDisconnectModal={false} user={userData} />
      <ProfileBottomDrawer
        isShown={isBottomDrawerShown && isOwnProfile}
        onHide={() => setIsBottomDrawerShown(false)}
      />
      <OtherProfileModal
        isShown={isBottomDrawerShown && !isOwnProfile}
        onHide={() => setIsBottomDrawerShown(false)}
        username={userData.username}
      />
      <ManageSeriesModal
        isShown={isManageSeriesModalShown && isOwnProfile}
        series={seriesData.Series}
        user={userData}
        onHide={() => setIsManageSeriesModalShown(false)}
      />
      <CreateAirdropsModal
        isShown={isCreateAirdropsModalShown}
        onHide={() => {
          navigate(getUrlWithoutParam(ProfileUrlParamKey.CreateAirdrop));
          setIsCreateAirdropsModalShown(false);
        }}
      />
      <SeriesMetadataContextProvider>
        <CreateSeriesModal
          isShown={isCreateSeriesModalShown && tab === ProfileTabType.Series}
          onHide={() => {
            navigate(getUrlWithoutParam(ProfileUrlParamKey.CreateSeries));
            setIsCreateSeriesModalShown(false);
          }}
        />
      </SeriesMetadataContextProvider>
      <PageWithBottomTabs>
        <div className={styles.container}>
          <HeaderAndCoverPhoto src={userData.CoverPhoto?.photoUrl} />
          <div className={styles.containerInner}>
            <ResponsiveContainer>
              <div className={styles.profilePhotoContainer}>
                {userData.ProfilePhoto?.photoUrl == null ? (
                  <div className={styles.profilePhoto} />
                ) : (
                  <MaybeImgix src={userData.ProfilePhoto.photoUrl}>
                    <Imgix
                      className={styles.profilePhoto}
                      src={userData.ProfilePhoto.photoUrl}
                      sizes="25vw"
                    />
                    <img
                      className={styles.profilePhoto}
                      src={userData.ProfilePhoto.photoUrl}
                    />
                  </MaybeImgix>
                )}
                {width <= BIGGER_BREAKPOINT && width > MOBILE_BREAKPOINT && (
                  <ShadowButtons
                    setIsBottomDrawerShown={setIsBottomDrawerShown}
                    userData={userData}
                  />
                )}
                {width <= MOBILE_BREAKPOINT && (
                  <ProfileActionButton
                    isOwnProfile={isOwnProfile}
                    profileData={userData}
                  />
                )}
              </div>
              <Row1
                setIsBottomDrawerShown={setIsBottomDrawerShown}
                userData={userData}
              />
              {width <= MOBILE_BREAKPOINT && (
                <div style={{ marginTop: 12 }}>
                  <ShadowButtons
                    setIsBottomDrawerShown={setIsBottomDrawerShown}
                    userData={userData}
                  />
                </div>
              )}
              <Row2 userData={userData} />
              <div className={styles.userFollowsInfo}>
                <UserFollowsInfo user={userData} />
              </div>
              {shouldShowJoinDiscordBanner && (
                <div className={styles.profileCard}>
                  <ProfileJoinDiscordCard user={userData} />
                </div>
              )}
              <div className={styles.profileCard}>
                <ProfileCampaignCard user={userData} />
              </div>
              {enableCampaignsOnProfile && (
                <div className={styles.profileCard}>
                  <ProfileCampaignCardV2
                    createdCampaignsQueryRef={createdCampaignsQueryRef}
                  />
                </div>
              )}
              <div className={styles.nfts}>
                {nftQueryRef != null && (
                  <Suspense fallback={<ProfileTabsAndNftsLoading />}>
                    <ProfileTabsAndActions
                      createdCampaignsQueryRef={createdCampaignsQueryRef}
                      tab={tab}
                      setTab={setTab}
                      userData={userData}
                      seriesData={seriesData}
                      supportedCampaignsQueryRef={supportedCampaignsQueryRef}
                      nftQueryRef={nftQueryRef}
                    />
                    <ProfileNfts
                      createdCampaignsQueryRef={createdCampaignsQueryRef}
                      nftQueryRef={nftQueryRef}
                      tab={tab}
                      user={userData}
                      series={seriesData}
                      supportedCampaignsQueryRef={supportedCampaignsQueryRef}
                    />
                  </Suspense>
                )}
              </div>
            </ResponsiveContainer>
          </div>
          <LandingFooter />
        </div>
      </PageWithBottomTabs>
    </>
  );
}
