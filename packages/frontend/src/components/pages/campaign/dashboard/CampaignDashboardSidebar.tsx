import PlainButton from "components/buttons/PlainButton";
import TextButton from "components/buttons/TextButton";
import ChatBubbleIcon from "components/icons/ChatBubbleIcon";
import ChevronRightIcon from "components/icons/ChevronRightIcon";
import CogIcon from "components/icons/CogIcon";
import UsersIcon from "components/icons/UsersIcon";
import { useNavigate, useParams } from "react-router-dom";
import CampaignDashboardTab from "types/enums/CampaignDashboardTab";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import joinClasses from "utils/joinClasses";
import styles from "css/pages/campaign/dashboard/CampaignDashboardSidebar.module.css";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import NavLink from "components/text/NavLink";
import useBreakpoint from "hooks/useBreakpoint";
import CustomSelect from "components/select/CustomSelect";
import EditIcon from "components/icons/EditIcon";
import graphql from "babel-plugin-relay/macro";
import { CampaignDashboardSidebar_CampaignV2$key } from "components/pages/campaign/dashboard/__generated__/CampaignDashboardSidebar_CampaignV2.graphql";
import { useFragment } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useCanViewerEditCampaign from "hooks/campaign/useCanViewerEditCampaign";

const fragment = graphql`
  fragment CampaignDashboardSidebar_CampaignV2 on CampaignV2 {
    ...useCanViewerEditCampaign_CampaignV2
  }
`;

const OPTION_TO_ICON: Record<
  CampaignDashboardTab,
  { icon: JSX.Element; selectedIcon: JSX.Element }
> = {
  [CampaignDashboardTab.Edit]: {
    icon: <EditIcon size={24} colorValue={ColorValue.Primary} />,
    selectedIcon: <EditIcon size={24} colorValue={ColorValue.BrightPurple} />,
  },
  [CampaignDashboardTab.Updates]: {
    icon: <ChatBubbleIcon size={24} colorValue={ColorValue.Primary} />,
    selectedIcon: (
      <ChatBubbleIcon size={24} colorValue={ColorValue.BrightPurple} />
    ),
  },
  [CampaignDashboardTab.SupporterList]: {
    icon: <UsersIcon size={24} colorValue={ColorValue.Primary} />,
    selectedIcon: <UsersIcon size={24} colorValue={ColorValue.BrightPurple} />,
  },
  [CampaignDashboardTab.Settings]: {
    icon: <CogIcon colorValue={ColorValue.Primary} />,
    selectedIcon: <CogIcon colorValue={ColorValue.BrightPurple} />,
  },
};

function MobileCampaignDashboardSelector({
  tab,
  setTab,
}: {
  setTab: (tab: CampaignDashboardTab) => void;
  tab: CampaignDashboardTab;
}) {
  return (
    <CustomSelect
      customStyles={{
        singleValue: (existingStyles) => ({
          ...existingStyles,
          paddingLeft: 8,
        }),
      }}
      defaultValue={{
        label: tab,
        value: tab,
      }}
      onChange={(selectedOption) => {
        const { value } = selectedOption as {
          label: CampaignDashboardTab;
          value: CampaignDashboardTab;
        };
        setTab(value);
      }}
      options={Object.values(CampaignDashboardTab).map((v) => ({
        label: v,
        value: v,
      }))}
      placeholder="Select a tab"
    />
  );
}

function SidebarOption({
  icon,
  name,
  isSelected,
  selectedIcon,
  onClick,
}: {
  icon: JSX.Element;
  isSelected: boolean;
  name: CampaignDashboardTab;
  onClick: () => void;
  selectedIcon: JSX.Element;
}): JSX.Element {
  return (
    <PlainButton
      className={joinClasses(
        styles.sidebarOption,
        isSelected ? styles.sidebarOptionSelected : null
      )}
      onClick={onClick}
    >
      {isSelected ? selectedIcon : icon}
      <NavLink
        colorClass={isSelected ? ColorClass.BrightPurple : ColorClass.Primary}
      >
        {name}
      </NavLink>
    </PlainButton>
  );
}

export default function CampaignDashboardSidebar({
  campaign,
  setTab,
  tab,
}: {
  campaign: Maybe<CampaignDashboardSidebar_CampaignV2$key>;
  setTab: (tab: CampaignDashboardTab) => void;
  tab: CampaignDashboardTab;
}) {
  const campaignData = useFragment(fragment, campaign);
  const viewerCanEdit = useCanViewerEditCampaign(campaignData);
  const navigate = useNavigate();
  const { username, campaignSlug } = useParams();
  const { isDesktopWideBreakpoint } = useBreakpoint();
  const getSidebarOption = (input: {
    icon: JSX.Element;
    onClick?: () => void;
    selectedIcon: JSX.Element;
    sidebarTab: CampaignDashboardTab;
  }) => {
    const { icon, onClick, selectedIcon, sidebarTab } = input;
    return (
      <SidebarOption
        key={sidebarTab}
        icon={icon}
        selectedIcon={selectedIcon}
        name={sidebarTab}
        isSelected={tab === sidebarTab}
        onClick={onClick ?? (() => setTab(sidebarTab))}
      />
    );
  };

  if (isDesktopWideBreakpoint) {
    return <MobileCampaignDashboardSelector tab={tab} setTab={setTab} />;
  }

  return (
    <div className={styles.sidebar}>
      {Object.values(CampaignDashboardTab)
        .filter((v) => {
          if (v !== CampaignDashboardTab.Edit) {
            return true;
          }

          return viewerCanEdit;
        })
        .map((v) =>
          getSidebarOption({
            icon: OPTION_TO_ICON[v].icon,
            onClick:
              v === CampaignDashboardTab.Edit
                ? () =>
                    navigate(
                      `${getCampaignLinkRelative(
                        username!,
                        campaignSlug!
                      )}/draft`
                    )
                : undefined,
            selectedIcon: OPTION_TO_ICON[v].selectedIcon,
            sidebarTab: v,
          })
        )}
      <TextButton
        buttonThemeOrColorClass={ColorClass.Secondary}
        className={joinClasses(styles.sidebarOption)}
        fontClass={FontClass.Body2}
        href={getCampaignLinkRelative(username!, campaignSlug!)}
        icon={<ChevronRightIcon colorValue={ColorValue.Secondary} />}
        iconPosition="right"
        type="link_internal"
      >
        See your campaign
      </TextButton>
    </div>
  );
}
