import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import PlainButton from "components/buttons/PlainButton";
import FlexBox from "components/layout/FlexBox";
import CampaignFundingTierManageNftsModal from "components/pages/campaign/edit/funding-tiers/CampaignFundingTierManageNftsModal";
import EditFundingTierModal from "components/pages/campaign/edit/funding-tiers/EditFundingTierModal";
import { FundingTierNftsContextProvider } from "components/pages/campaign/edit/funding-tiers/FundingTierNftsContext";
import { FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard$key } from "components/pages/campaign/edit/funding-tiers/__generated__/FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard.graphql";
import ArtName from "components/text/ArtName";
import Body1 from "components/text/Body1";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import styles from "css/pages/campaign/edit/funding-tiers/FundingTierCardForCampaignFundingTierStandard.module.css";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { useState } from "react";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import GlobalClass from "types/enums/GlobalClass";
import CampaignStatusExpress_enum from "types/relay/CampaignStatusExpress_enum";
import joinClasses from "utils/joinClasses";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import FundingTierNftPreviewAssets from "components/pages/campaign/edit/funding-tiers/FundingTierNftPreviewAssets";
import CampaignFundingTierPreviewAssetsContainer from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierPreviewAssetsContainer";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import isUpdateFundingTierInfoAllowed from "utils/campaigns/permissions/isUpdateFundingTierInfoAllowed";

const fragment = graphql`
  fragment FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard on CampaignFundingTierStandard {
    description
    title

    metadataAccountsForPreview: metadataAccounts(first: 3) {
      edges {
        node {
          ...FundingTierNftPreviewAssets_MetadataAccount
        }
      }
    }
    ...EditFundingTierModal_CampaignFundingTierStandard
    ...CampaignFundingTierManageNftsModal_CampaignFundingTierStandard
    ...FundingTierNftsContext_CampaignFundingTierStandard
  }
`;

function shouldShowAddNftButton(campaignStatus: CampaignStatusExpress_enum) {
  switch (campaignStatus) {
    case "Approved":
    case "Published":
      return true;
    case "Concluded":
    case "Draft":
    case "Pending":
    case "Rejected":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(campaignStatus);
  }
}

type Props = {
  campaignStatus: CampaignStatusExpress_enum;
  fundingTier: FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard$key;
};

export default function FundingTierCardForCampaignFundingTierStandard({
  campaignStatus,
  fundingTier,
}: Props) {
  const fundingTierData = useFragment(fragment, fundingTier);
  const colorScheme = useCampaignColorScheme();
  const isAdminView = document.location.href.endsWith("/admin");

  const {
    title,
    description,
    metadataAccountsForPreview: metadataAccounts,
  } = fundingTierData;
  const [showEditFundingTierModal, setShowEditFundingTierModal] =
    useState(false);
  const [
    showCampaignFundingTierManageNftsModal,
    setShowCampaignFundingTierManageNftsModal,
  ] = useState(false);

  return (
    <FundingTierNftsContextProvider fundingTier={fundingTierData}>
      <CampaignFundingTierManageNftsModal
        isShown={showCampaignFundingTierManageNftsModal}
        onHide={() => {
          setShowCampaignFundingTierManageNftsModal(false);
        }}
        fundingTier={fundingTierData}
      />
      <PlainButton
        className={joinClasses(GlobalClass.CardAnimation, styles.container)}
        onClick={emptyFunction}
        transparentBg={false}
      >
        <FlexBox
          flexDirection="column"
          alignItems="flex-start"
          gap={24}
          width="100%"
          height="100%"
        >
          <CampaignFundingTierPreviewAssetsContainer>
            <FundingTierNftPreviewAssets
              metadataAccounts={
                metadataAccounts?.edges.map(({ node }) => node) ?? null
              }
            />
          </CampaignFundingTierPreviewAssetsContainer>
          <FlexBox
            flexDirection="column"
            gap={12}
            alignItems="flex-start"
            justifyContent="space-between"
            height="100%"
          >
            <FlexBox flexDirection="column" gap={12}>
              <ArtName textAlign="left" colorClass={ColorClass.Primary}>
                {title}
              </ArtName>
              <Body1
                textAlign="left"
                colorClass={ColorClass.Primary}
                truncateLines={isAdminView ? undefined : 4}
              >
                {description}
              </Body1>
            </FlexBox>
            <FlexBox
              className={styles.editButtons}
              flexDirection="column"
              gap={12}
            >
              {isUpdateFundingTierInfoAllowed(campaignStatus) && (
                <ButtonWithText
                  buttonTheme={colorScheme.buttonTheme}
                  fontClass={FontClass.NavLink}
                  type="button"
                  onClick={() => setShowEditFundingTierModal(true)}
                >
                  Edit info
                </ButtonWithText>
              )}
              {shouldShowAddNftButton(campaignStatus) && (
                <ButtonWithText
                  buttonTheme={colorScheme.buttonTheme}
                  fontClass={FontClass.NavLink}
                  type="button"
                  onClick={() =>
                    setShowCampaignFundingTierManageNftsModal(true)
                  }
                >
                  Manage NFTs
                </ButtonWithText>
              )}
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </PlainButton>
      <EditFundingTierModal
        isShown={showEditFundingTierModal}
        onHide={() => setShowEditFundingTierModal(false)}
        fundingTier={fundingTierData}
      />
    </FundingTierNftsContextProvider>
  );
}
