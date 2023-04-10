import styles from "css/pages/campaign/campaign-generic/CampaignHeaderStatusBanner.module.css";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CampaignStatusExpress_enum from "types/relay/CampaignStatusExpress_enum";
import CampaignHeaderBanner from "components/pages/campaign/campaign-generic/CampaignHeaderBanner";
import graphql from "babel-plugin-relay/macro";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { CampaignHeaderStatusBanner_CampaignV2$key } from "components/pages/campaign/campaign-generic/__generated__/CampaignHeaderStatusBanner_CampaignV2.graphql";
import { useFragment } from "react-relay";
import FontClass from "types/enums/FontClass";
import ChevronLeftIcon from "components/icons/ChevronLeftIcon";
import ColorValue from "types/enums/ColorValue";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import isDashboardVisible from "utils/campaigns/permissions/isDashboardVisible";

const fragment = graphql`
  fragment CampaignHeaderStatusBanner_CampaignV2 on CampaignV2 {
    slug
    status
    creator {
      username
    }
  }
`;

function getStatusText(status: CampaignStatusExpress_enum) {
  switch (status) {
    case "Draft":
    case RELAY_FUTURE_ADDED_VALUE:
      return "Draft mode";
    case "Approved":
      return "Draft mode (Approved)";
    case "Rejected":
      return "Rejected";
    case "Pending":
      return "Pending review";
    case "Concluded":
      return "Campaign finished";
    case "Published":
      return "Published";
    default:
      return assertUnreachable(status);
  }
}

function getButtonText(status: CampaignStatusExpress_enum) {
  switch (status) {
    case "Draft":
      return "Submit for approval";
    case "Approved":
      return "Publish campaign";
    case "Rejected":
    case "Published":
    case "Pending":
    case "Concluded":
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(status);
  }
}

function GoToDashboardButton({
  campaign,
  hide = false,
}: {
  campaign: Maybe<CampaignHeaderStatusBanner_CampaignV2$key>;
  hide?: boolean;
}) {
  const campaignData = useFragment(fragment, campaign);
  if (campaignData == null || !isDashboardVisible(campaignData.status)) {
    // Return empty div instead of null so space-between centers the status
    return <div />;
  }

  const button = (
    <TextButton
      buttonThemeOrColorClass={ColorClass.Primary}
      fontClass={FontClass.Body2Medium}
      icon={<ChevronLeftIcon colorValue={ColorValue.Primary} />}
      href={`${getCampaignLinkRelative(
        campaignData.creator.username,
        campaignData.slug
      )}/dashboard`}
      type="link_internal"
    >
      Go to dashboard
    </TextButton>
  );

  if (hide) {
    return <div style={{ visibility: "hidden" }}>{button}</div>;
  }

  return button;
}

type Props = {
  campaign: Maybe<CampaignHeaderStatusBanner_CampaignV2$key>;
  campaignStatus?: CampaignStatusExpress_enum;
  onSubmit?: () => void;
};

export default function CampaignHeaderStatusBanner({
  campaign,
  campaignStatus = "Draft",
  onSubmit,
}: Props) {
  const buttonText = getButtonText(campaignStatus);

  return (
    <CampaignHeaderBanner justifyContent="space-between">
      <GoToDashboardButton campaign={campaign} />
      <Body2
        className={styles.textContainer}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        {getStatusText(campaignStatus)}
        {onSubmit != null && buttonText != null && (
          <>
            <span>•</span>
            <TextButton
              buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
              onClick={onSubmit}
              type="button"
            >
              {buttonText}
            </TextButton>
          </>
        )}
      </Body2>
      <GoToDashboardButton campaign={campaign} hide />
    </CampaignHeaderBanner>
  );
}
