import styles from "css/pages/profile/MobileProfileTabs.module.css";
import ProfileTabType from "types/enums/ProfileTabType";
import IconTabButton from "components/buttons/IconTabButton";
import ColorValue from "types/enums/ColorValue";
import CreatedIcon from "components/icons/CreatedIcon";
import SeriesIcon from "components/icons/SeriesIcon";
import CollectedIcon from "components/icons/CollectedIcon";
import CreatorStoryIcon from "components/icons/CreatorStoryIcon";
import MegaphoneIcon from "components/icons/MegaphoneIcon";
import ProfileIcon from "components/icons/ProfileIcon";

type Props = {
  setTab: (val: ProfileTabType) => void;
  showCampaignsTab: boolean;
  showCampaignsWhereUserIsActiveSupporterTab: boolean;
  showCreatedTab: boolean;
  showCreatorStoryTab: boolean;
  showSeriesTab: boolean;
  tab: ProfileTabType;
};

function getColorValue(isActive: boolean) {
  return isActive ? ColorValue.BrightPurple : ColorValue.Secondary;
}

export default function MobileProfileTabs({
  tab,
  setTab,
  showCampaignsTab,
  showCampaignsWhereUserIsActiveSupporterTab,
  showCreatedTab,
  showSeriesTab,
  showCreatorStoryTab,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      {showCreatedTab && (
        <IconTabButton
          isActive={tab === ProfileTabType.Created}
          icon={
            <CreatedIcon
              colorValue={getColorValue(tab === ProfileTabType.Created)}
            />
          }
          onClick={() => setTab(ProfileTabType.Created)}
        />
      )}
      <IconTabButton
        isActive={tab === ProfileTabType.Collected}
        icon={
          <CollectedIcon
            colorValue={getColorValue(tab === ProfileTabType.Collected)}
          />
        }
        onClick={() => setTab(ProfileTabType.Collected)}
      />
      {showCampaignsTab && (
        <IconTabButton
          isActive={tab === ProfileTabType.Campaigns}
          icon={
            <MegaphoneIcon
              size={24}
              colorValue={getColorValue(tab === ProfileTabType.Campaigns)}
            />
          }
          onClick={() => setTab(ProfileTabType.Campaigns)}
        />
      )}
      {showCampaignsWhereUserIsActiveSupporterTab && (
        <IconTabButton
          isActive={tab === ProfileTabType.CampaignsWhereUserIsActiveSupporter}
          icon={
            <ProfileIcon
              size={24}
              colorValue={getColorValue(
                tab === ProfileTabType.CampaignsWhereUserIsActiveSupporter
              )}
            />
          }
          onClick={() =>
            setTab(ProfileTabType.CampaignsWhereUserIsActiveSupporter)
          }
        />
      )}
      {showSeriesTab && (
        <IconTabButton
          isActive={tab === ProfileTabType.Series}
          icon={
            <SeriesIcon
              colorValue={getColorValue(tab === ProfileTabType.Series)}
            />
          }
          onClick={() => setTab(ProfileTabType.Series)}
        />
      )}
      {showCreatorStoryTab && (
        <IconTabButton
          isActive={tab === ProfileTabType.CreatorStory}
          icon={
            <CreatorStoryIcon
              colorValue={getColorValue(tab === ProfileTabType.CreatorStory)}
            />
          }
          onClick={() => setTab(ProfileTabType.CreatorStory)}
        />
      )}
    </div>
  );
}
