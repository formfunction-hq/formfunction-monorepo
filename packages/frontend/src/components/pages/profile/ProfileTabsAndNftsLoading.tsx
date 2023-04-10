import mobileProfileTabsStyles from "css/pages/profile/MobileProfileTabs.module.css";
import profilePageStyles from "css/pages/profile/ProfilePageForUser.module.css";
import loadingStyles from "css/pages/profile/ProfileLoadingPage.module.css";
import ProfileTabType from "types/enums/ProfileTabType";
import TabButton from "components/buttons/TabButton";
import NftGridFullWidthLoading from "components/grids/nft/NftGridFullWidthLoading";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import IconTabButton from "components/buttons/IconTabButton";
import ColorValue from "types/enums/ColorValue";
import CollectedIcon from "components/icons/CollectedIcon";
import IgnoreResponsiveContainerPadding from "components/containers/IgnoreResponsiveContainerPadding";
import useProfileTab from "hooks/useProfileTab";
import useUserContext from "hooks/useUserContext";
import CreatedIcon from "components/icons/CreatedIcon";
import CreatorStoryIcon from "components/icons/CreatorStoryIcon";
import SeriesIcon from "components/icons/SeriesIcon";
import SeriesGridFullWidthLoading from "components/series/SeriesGridFullWidthLoading";
import LoadingSpinner from "components/loading/LoadingSpinner";
import CampaignGridFullWidthLoading from "components/campaign/CampaignGridFullWidthLoading";
import MegaphoneIcon from "components/icons/MegaphoneIcon";
import ProfileIcon from "components/icons/ProfileIcon";

function getMobileButtonForTab(tab: ProfileTabType) {
  const iconTabButton = (icon: JSX.Element) => (
    <IconTabButton isActive icon={icon} onClick={emptyFunction} />
  );

  const mobileButtonForTab = {
    [ProfileTabType.Campaigns]: iconTabButton(
      <MegaphoneIcon size={24} colorValue={ColorValue.BrightPurple} />
    ),
    [ProfileTabType.CampaignsWhereUserIsActiveSupporter]: iconTabButton(
      <ProfileIcon size={24} colorValue={ColorValue.BrightPurple} />
    ),
    [ProfileTabType.Collected]: iconTabButton(
      <CollectedIcon colorValue={ColorValue.BrightPurple} />
    ),
    [ProfileTabType.Created]: iconTabButton(
      <CreatedIcon colorValue={ColorValue.BrightPurple} />
    ),
    [ProfileTabType.Series]: iconTabButton(
      <SeriesIcon colorValue={ColorValue.BrightPurple} />
    ),
    [ProfileTabType.CreatorStory]: iconTabButton(
      <CreatorStoryIcon colorValue={ColorValue.BrightPurple} />
    ),
  };

  return mobileButtonForTab[tab];
}

function getButtonForTab(tab: ProfileTabType) {
  const tabButton = (name: ProfileTabType) => (
    <TabButton isActive name={name} onClick={emptyFunction} />
  );

  const buttonForTab = {
    [ProfileTabType.Campaigns]: tabButton(ProfileTabType.Campaigns),
    [ProfileTabType.CampaignsWhereUserIsActiveSupporter]: tabButton(
      ProfileTabType.CampaignsWhereUserIsActiveSupporter
    ),
    [ProfileTabType.Collected]: tabButton(ProfileTabType.Collected),
    [ProfileTabType.Created]: tabButton(ProfileTabType.Created),
    [ProfileTabType.Series]: tabButton(ProfileTabType.Series),
    [ProfileTabType.CreatorStory]: tabButton(ProfileTabType.CreatorStory),
  };

  return buttonForTab[tab];
}

function ProfileTabsAndActionsLoading(): JSX.Element {
  const { user } = useUserContext();
  const [tab] = useProfileTab(user?.isWhitelisted || false);
  const isBottomTabsWidth = useIsBottomTabsWidth();

  return (
    <div className={profilePageStyles.profileTabsContainer}>
      {isBottomTabsWidth ? (
        <>
          <div className={mobileProfileTabsStyles.container}>
            {getMobileButtonForTab(tab)}
          </div>
          <IgnoreResponsiveContainerPadding>
            <div className={profilePageStyles.profileTabsContainerDivider} />
          </IgnoreResponsiveContainerPadding>
        </>
      ) : (
        <>
          <div className={profilePageStyles.tabsLeft}>
            {getButtonForTab(tab)}
          </div>
          <div className={profilePageStyles.profileTabsContainerDivider} />
        </>
      )}
    </div>
  );
}

export default function ProfileTabsAndNftsLoading(): JSX.Element {
  const { user } = useUserContext();
  const [tab] = useProfileTab(user?.isWhitelisted ?? false);

  const loadingForTab = {
    [ProfileTabType.Campaigns]: <CampaignGridFullWidthLoading />,
    [ProfileTabType.CampaignsWhereUserIsActiveSupporter]: (
      <CampaignGridFullWidthLoading />
    ),
    [ProfileTabType.Collected]: <NftGridFullWidthLoading />,
    [ProfileTabType.Created]: <NftGridFullWidthLoading />,
    [ProfileTabType.Series]: <SeriesGridFullWidthLoading />,
    [ProfileTabType.CreatorStory]: (
      <LoadingSpinner colorValue={ColorValue.BrightPurple} />
    ),
  };

  return (
    <div className={profilePageStyles.nfts}>
      <ProfileTabsAndActionsLoading />
      <div className={loadingStyles.nftGrid}>{loadingForTab[tab]}</div>
    </div>
  );
}
