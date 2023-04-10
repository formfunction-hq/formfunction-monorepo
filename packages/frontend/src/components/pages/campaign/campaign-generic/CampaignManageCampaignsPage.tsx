import ResponsivePageBody from "components/containers/ResponsivePageBody";
import { Suspense, useState } from "react";
import CampaignIntroductionModal from "components/pages/campaign/campaign-generic/CampaignIntroductionModal";
import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import getLocalStorage from "utils/local-storage/getLocalStorage";
import LocalStorageKey from "types/enums/LocalStorageKey";
import setLocalStorage from "utils/local-storage/setLocalStorage";
import FlexBox from "components/layout/FlexBox";
import Header2 from "components/text/Header2";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import CampaignGridFullWidth from "components/campaign/CampaignGridFullWidth";
import ClickableArea from "components/buttons/ClickableArea";
import ColorValue from "types/enums/ColorValue";
import { useNavigate } from "react-router-dom";
import useUserContext from "hooks/useUserContext";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import LoadingSpinner from "components/loading/LoadingSpinner";
import CampaignManageCampaignsCard from "components/pages/campaign/campaign-generic/CampaignManageCampaignsCard";
import CAMPAIGN_STATUSES from "constants/CampaignStatuses";
import {
  CampaignManageCampaignsPageQuery,
  CampaignManageCampaignsPageQuery$data,
} from "components/pages/campaign/campaign-generic/__generated__/CampaignManageCampaignsPageQuery.graphql";
import DRAFT_OR_ACTIVE_CAMPAIGN_STATUSES from "constants/DraftOrActiveCampaignStatuses";
import styles from "css/pages/campaign/campaign-generic/CampaignManageCampaignsPage.module.css";
import MegaphoneIconThin from "components/icons/MegaphoneIconThin";
import cardStyles from "css/pages/campaign/campaign-generic/CampaignManageCampaignsCard.module.css";

// Fetch all for now since we don't anticipate hitting this limit for a while
const CAMPAIGNS_FOR_USER_PAGE_SIZE = 200;

const query = graphql`
  query CampaignManageCampaignsPageQuery(
    $after: String
    $first: PaginationAmount!
    $input: CampaignsForUserInput!
  ) {
    CampaignsNamespace {
      campaignsForUser(input: $input) {
        campaigns(after: $after, first: $first, input: $input) {
          edges {
            node {
              id
              creator {
                id
              }
              status
              ...CampaignManageCampaignsCard_CampaignV2
            }
          }
        }
      }
    }
  }
`;

function CreateCampaignCta({ disabled }: { disabled: boolean }) {
  const navigate = useNavigate();
  const { user } = useUserContext();
  if (disabled) {
    return (
      <ClickableArea
        className={cardStyles.container}
        disabled={disabled}
        height="100%"
        width="100%"
        icon={<MegaphoneIconThin colorValue={ColorValue.Ghost} />}
        title="Create a new campaign"
        subtitle="You can only have one draft or active campaign at a time."
        colorOverrides={{
          background: ColorValue.CardBackground,
          border: ColorValue.Ghost,
          subtitle: ColorClass.Ghost,
          title: ColorClass.Ghost,
        }}
      />
    );
  }

  return (
    <ClickableArea
      className={cardStyles.container}
      height="100%"
      width="100%"
      icon={<MegaphoneIconThin colorValue={ColorValue.BrightPurple} />}
      title="Create a new campaign"
      onClick={() => navigate(`/@${user!.username}/campaigns/create`)}
      colorOverrides={{
        background: ColorValue.CardBackground,
        border: ColorValue.BrightPurple,
        subtitle: ColorClass.BrightPurple,
        title: ColorClass.BrightPurple,
      }}
    />
  );
}

function Content({
  campaignsData,
}: {
  campaignsData: CampaignManageCampaignsPageQuery$data;
}): JSX.Element {
  const { user } = useUserContext();
  const shouldShowCampaignIntroduction = getLocalStorage(
    LocalStorageKey.ShouldShowCampaignIntroduction
  );
  const initialIntroductionModalState = shouldShowCampaignIntroduction
    ? JSON.parse(shouldShowCampaignIntroduction)
    : true;
  const [isIntroductionModalShown, setIsIntroductionModalShown] = useState(
    initialIntroductionModalState
  );

  const hideModal = () => {
    setLocalStorage(LocalStorageKey.ShouldShowCampaignIntroduction, "false");
    setIsIntroductionModalShown(false);
  };
  const { campaigns } = campaignsData.CampaignsNamespace.campaignsForUser;
  const campaignNodes = campaigns?.edges.map(({ node }) => node);
  const hasActiveOrDraftCampaign =
    campaignNodes?.some(
      (node) =>
        DRAFT_OR_ACTIVE_CAMPAIGN_STATUSES.includes(node.status) &&
        node.creator.id === user!.id
    ) ?? false;

  return (
    <>
      <CampaignIntroductionModal
        isShown={isIntroductionModalShown}
        onHide={hideModal}
      />
      <CampaignGridFullWidth
        className={
          (campaignNodes?.length ?? 0) > 0 ? undefined : styles.centered
        }
      >
        {campaignNodes?.map((node) => (
          <CampaignManageCampaignsCard key={node.id} campaign={node} />
        ))}
        <CreateCampaignCta disabled={hasActiveOrDraftCampaign} />
      </CampaignGridFullWidth>
    </>
  );
}

function DataLoader() {
  const { user } = useUserContext();
  const data = useLazyLoadQuery<CampaignManageCampaignsPageQuery>(
    query,
    {
      first: CAMPAIGNS_FOR_USER_PAGE_SIZE,
      input: {
        statuses: CAMPAIGN_STATUSES.filter((status) => status !== "Rejected"),
        userId: user!.id,
        viewerId: user!.id,
      },
    },
    {
      fetchPolicy: "network-only",
    }
  );

  return <Content campaignsData={data} />;
}

export default function CampaignManageCampaignsPage(): JSX.Element {
  return (
    <DisconnectedPageContainer>
      <PageWithHeaderAndFooter>
        <ResponsivePageBody>
          <FlexBox flexDirection="column" alignItems="center" gap={64}>
            <FlexBox flexDirection="column" alignItems="center" gap={12}>
              <Header2 colorClass={ColorClass.Primary} textAlign="center">
                Manage Campaigns
              </Header2>
              <Body1 colorClass={ColorClass.Secondary} textAlign="center">
                Campaigns on Formfunction let you sell NFTs to fundraise for
                your dream creative project.
              </Body1>
            </FlexBox>
            <Suspense
              fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
            >
              <DataLoader />
            </Suspense>
          </FlexBox>
        </ResponsivePageBody>
      </PageWithHeaderAndFooter>
    </DisconnectedPageContainer>
  );
}
