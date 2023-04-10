import FlexBox from "components/layout/FlexBox";
import Header2 from "components/text/Header2";
import ColorClass from "types/enums/ColorClass";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import CampaignStatusExpress_enum from "types/relay/CampaignStatusExpress_enum";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import TinyLabel from "components/text/TinyLabel";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import Price from "components/text/Price";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import { useNavigate } from "react-router-dom";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import useUserContext from "hooks/useUserContext";
import FontClass from "types/enums/FontClass";
import styles from "css/pages/campaign/campaign-generic/CampaignManageCampaignsCard.module.css";
import { CampaignManageCampaignsCard_CampaignV2$key } from "components/pages/campaign/campaign-generic/__generated__/CampaignManageCampaignsCard_CampaignV2.graphql";
import joinClasses from "utils/joinClasses";

const fragment = graphql`
  fragment CampaignManageCampaignsCard_CampaignV2 on CampaignV2 {
    status
    title
    slug
    goalProgressSymbol
    creator {
      id
      username
    }
  }
`;

type Props = {
  campaign: CampaignManageCampaignsCard_CampaignV2$key;
};

const TEAM_MEMBER_LABEL = "• Team Member";

function StatusLabel({
  isCreator,
  status,
}: {
  isCreator: boolean;
  status: CampaignStatusExpress_enum;
}) {
  switch (status) {
    case "Approved":
      return (
        <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
          Draft • Approved
        </TinyLabel>
      );
    case "Concluded":
      return (
        <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
          Ended {isCreator ? "" : TEAM_MEMBER_LABEL}
        </TinyLabel>
      );
    case "Draft":
      return (
        <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
          Draft • Not Approved
        </TinyLabel>
      );
    case "Pending":
      return (
        <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
          Draft • Submitted
        </TinyLabel>
      );
    case "Published":
      return (
        <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
          Active {isCreator ? "" : TEAM_MEMBER_LABEL}
        </TinyLabel>
      );
    case "Rejected":
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(status);
  }
}

function Cta({
  creatorUsername,
  slug,
  status,
}: {
  creatorUsername: string;
  slug: string;
  status: CampaignStatusExpress_enum;
}) {
  const navigate = useNavigate();

  switch (status) {
    case "Published":
    case "Concluded":
      return (
        <ButtonWithText
          fontClass={FontClass.NavLink}
          buttonTheme={ButtonTheme.BrightPurpleOutline}
          onClick={() =>
            navigate(
              `${getCampaignLinkRelative(creatorUsername, slug)}/dashboard`
            )
          }
        >
          Go to dashboard
        </ButtonWithText>
      );
    case "Draft":
    case "Approved":
    case "Pending":
      return (
        <ButtonWithText
          fontClass={FontClass.NavLink}
          buttonTheme={ButtonTheme.BrightPurpleOutline}
          onClick={() =>
            navigate(getCampaignLinkRelative(creatorUsername, slug))
          }
        >
          Go to draft
        </ButtonWithText>
      );
    case "Rejected":
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(status);
  }
}

export default function CampaignManageCampaignsCard({
  campaign,
}: Props): JSX.Element {
  const campaignData = useFragment(fragment, campaign);
  const { user } = useUserContext();
  const { creator, slug, status, title, goalProgressSymbol } = campaignData;

  return (
    <FlexBox
      alignItems="center"
      className={joinClasses(styles.container, styles.boxShadow)}
      flexDirection="column"
      gap={20}
      justifyContent="center"
    >
      <Header2 colorClass={ColorClass.Primary}>{goalProgressSymbol}</Header2>
      <FlexBox flexDirection="column" alignItems="center" gap={8}>
        <StatusLabel isCreator={user?.id === creator.id} status={status} />
        <FlexBox padding="0 24px">
          <Price
            textAlign="center"
            colorClass={ColorClass.Primary}
            truncateLines={2}
          >
            {title}
          </Price>
        </FlexBox>
      </FlexBox>
      <Cta creatorUsername={creator.username} slug={slug} status={status} />
    </FlexBox>
  );
}
