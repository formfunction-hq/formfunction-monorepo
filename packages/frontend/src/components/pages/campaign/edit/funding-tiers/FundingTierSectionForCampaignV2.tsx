import graphql from "babel-plugin-relay/macro";
import ClickableArea from "components/buttons/ClickableArea";
import AwardIcon from "components/icons/AwardIcon";
import { STANDARD_SECTION_HEIGHT } from "components/pages/campaign/campaign-v2/CampaignPage";
import FundingTierCardForCampaignFundingTierStandard from "components/pages/campaign/edit/funding-tiers/FundingTierCardForCampaignFundingTierStandard";
import { FundingTierSectionForCampaignV2_CampaignV2$key } from "components/pages/campaign/edit/funding-tiers/__generated__/FundingTierSectionForCampaignV2_CampaignV2.graphql";
import RELAY_FUTURE_UNION_VALUE from "constants/RelayFutureUnionValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { useFragment } from "react-relay";
import ColorValue from "types/enums/ColorValue";
import styles from "css/pages/campaign/edit/funding-tiers/FundingTierSectionForCampaignV2.module.css";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import FlexBox from "components/layout/FlexBox";
import ManageFundingTiersModal from "components/pages/campaign/edit/funding-tiers/ManageFundingTiersModal";
import { useState } from "react";
import ButtonWithText from "components/buttons/ButtonWithText";
import FontClass from "types/enums/FontClass";
import CreateFundingTierModal from "components/pages/campaign/edit/funding-tiers/CreateFundingTierModal";
import useCampaignFundingTierPreviewGridFullWidthColumnCount from "hooks/grids/useCampaignFundingTierPreviewGridFullWidthColumnCount";
import CampaignFundingTierPreviewGridFullWidth from "components/grids/campaigns/CampaignFundingTierPreviewGridFullWidth";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import useColorModeContext from "hooks/useColorModeContext";
import isManageFundingTiersAllowed from "utils/campaigns/permissions/isManageFundingTiersAllowed";
import isCreateFundingTierAllowed from "utils/campaigns/permissions/isCreateFundingTierAllowed";

type AddFundingTierClickableAreaProps = {
  height: number | string;
  onClick: () => void;
};

function AddFundingTierClickableArea({
  height,
  onClick,
}: AddFundingTierClickableAreaProps) {
  const colorScheme = useCampaignColorScheme();
  const { isDarkMode } = useColorModeContext();

  return (
    <ClickableArea
      height={height}
      icon={<AwardIcon colorValue={ColorValue.Primary} />}
      title="Add a funding tier"
      colorOverrides={{
        background: isDarkMode ? ColorValue.Transparent : undefined,
        border: colorScheme.foreground.colorValue,
      }}
      onClick={onClick}
      subtitle="This lets you add tiers, benefits, and NFTs to your campaign."
    />
  );
}

const fragment = graphql`
  fragment FundingTierSectionForCampaignV2_CampaignV2 on CampaignV2 {
    ...ManageFundingTiersModal_CampaignV2
    id
    fundingTiers {
      __typename
      ... on CampaignFundingTierStandard {
        id
        ...FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard
      }
    }
    status
  }
`;

type Props = {
  campaign: FundingTierSectionForCampaignV2_CampaignV2$key;
};
export default function FundingTierSectionForCampaignV2({ campaign }: Props) {
  const campaignData = useFragment(fragment, campaign);
  const campaignFundingTiers = campaignData?.fundingTiers ?? [];
  const previewColumnCount =
    useCampaignFundingTierPreviewGridFullWidthColumnCount();
  const colorScheme = useCampaignColorScheme();

  const [showManageFundingTierModal, setShowManageFundingTierModal] =
    useState(false);
  const [showCreateFundingTierModal, setShowCreateFundingTierModal] =
    useState(false);

  const openCreateFundingTierModal = () => {
    setShowCreateFundingTierModal(true);
  };
  if (campaignData == null || campaignFundingTiers == null) {
    return (
      <AddFundingTierClickableArea
        height={STANDARD_SECTION_HEIGHT}
        onClick={openCreateFundingTierModal}
      />
    );
  }
  const { id: campaignId, status } = campaignData;

  const standardFundingTiers = filterNulls(
    campaignFundingTiers.map((tier) => {
      const { __typename } = tier;
      switch (__typename) {
        case "CampaignFundingTierStandard":
          return tier;
        case RELAY_FUTURE_UNION_VALUE:
          return null;
        default:
          return assertUnreachable(__typename);
      }
    })
  );

  const fundingTierPreviews = standardFundingTiers.map((tier) => (
    <FundingTierCardForCampaignFundingTierStandard
      campaignStatus={status}
      fundingTier={tier}
      key={tier.id}
    />
  ));

  const showLargeClickableArea =
    fundingTierPreviews.length % previewColumnCount === 0;
  return (
    <>
      <CreateFundingTierModal
        campaignId={campaignId}
        isShown={showCreateFundingTierModal}
        onHide={() => {
          setShowCreateFundingTierModal(false);
        }}
      />
      {/* {We don't want to render modal so when it does render, it resets its default} */}
      {showManageFundingTierModal === true && (
        <ManageFundingTiersModal
          isShown={showManageFundingTierModal}
          onHide={() => {
            setShowManageFundingTierModal(false);
          }}
          campaign={campaignData}
        />
      )}
      <FlexBox
        gap={36}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="100%"
      >
        {fundingTierPreviews.length > 0 && (
          <CampaignFundingTierPreviewGridFullWidth
            className={styles.fundingTierGrid}
          >
            {fundingTierPreviews}
            {showLargeClickableArea === false &&
              isCreateFundingTierAllowed(status) && (
                <AddFundingTierClickableArea
                  height="100%"
                  onClick={openCreateFundingTierModal}
                />
              )}
          </CampaignFundingTierPreviewGridFullWidth>
        )}
        {showLargeClickableArea === true &&
          isCreateFundingTierAllowed(status) && (
            <AddFundingTierClickableArea
              height={STANDARD_SECTION_HEIGHT}
              onClick={openCreateFundingTierModal}
            />
          )}
        {standardFundingTiers.length > 1 &&
          isManageFundingTiersAllowed(status) && (
            <ButtonWithText
              buttonTheme={colorScheme.buttonTheme}
              fontClass={FontClass.NavLink}
              type="button"
              className={styles.manageFundingTiersButton}
              onClick={() => {
                setShowManageFundingTierModal(true);
              }}
            >
              Manage funding tiers
            </ButtonWithText>
          )}
      </FlexBox>
    </>
  );
}
