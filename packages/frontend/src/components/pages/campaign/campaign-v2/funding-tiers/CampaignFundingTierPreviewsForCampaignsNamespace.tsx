import graphql from "babel-plugin-relay/macro";
import CampaignFundingTierPreviewForCampaignFundingTierStandard from "components/pages/campaign/campaign-v2/funding-tiers/CampaignFundingTierPreviewForCampaignFundingTierStandard";
import RELAY_FUTURE_UNION_VALUE from "constants/RelayFutureUnionValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import CampaignFundingTierPreviews from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierPreviews";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import { useCampaignPageCampaignV2Query } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2Query.graphql";
import { campaignQuery } from "hooks/campaign-page/v2/useCampaignPageCampaignV2";
import useUserContext from "hooks/useUserContext";
import { useCampaignPageFundingTiersQuery } from "hooks/campaign-page/v2/__generated__/useCampaignPageFundingTiersQuery.graphql";
import { campaignFundingTiersQuery } from "hooks/campaign-page/v2/useCampaignPageFundingTiers";
import { CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse$key } from "components/pages/campaign/campaign-v2/funding-tiers/__generated__/CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse.graphql";
import { CampaignFundingTierPreviewsForCampaignsNamespaceCampaign_CampaignsNamespaceQueryResponse$key } from "components/pages/campaign/campaign-v2/funding-tiers/__generated__/CampaignFundingTierPreviewsForCampaignsNamespaceCampaign_CampaignsNamespaceQueryResponse.graphql";

const fundingTiersFragment = graphql`
  fragment CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignFundingTiersForSlug(input: $input) {
      campaignFundingTiers {
        __typename
        ... on CampaignFundingTierStandard {
          id
          ...CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard
        }
      }
    }
  }
`;

const campaignFragment = graphql`
  fragment CampaignFundingTierPreviewsForCampaignsNamespaceCampaign_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignV2ForSlug(input: $input) {
      campaign {
        creator {
          id
        }
        status
      }
    }
  }
`;

type Props = {
  campaignFundingTiersQueryRef: PreloadedQuery<useCampaignPageFundingTiersQuery>;
  campaignQueryRef: PreloadedQuery<useCampaignPageCampaignV2Query>;
  setCampaignTab: (val: CampaignTab) => void;
};

export default function CampaignFundingTierPreviewsForCampaignsNamespace({
  campaignFundingTiersQueryRef,
  campaignQueryRef,
  setCampaignTab,
}: Props): Maybe<JSX.Element> {
  const { user } = useUserContext();
  const fundingTiersData = usePreloadedQuery<useCampaignPageFundingTiersQuery>(
    campaignFundingTiersQuery,
    campaignFundingTiersQueryRef
  );
  const fundingTiersFragmentRef: CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse$key =
    fundingTiersData.CampaignsNamespace;
  const campaignsNamespaceFundingTiersData = useFragment(
    fundingTiersFragment,
    fundingTiersFragmentRef
  );

  const campaignData = usePreloadedQuery<useCampaignPageCampaignV2Query>(
    campaignQuery,
    campaignQueryRef
  );
  const campaignFragmentRef: CampaignFundingTierPreviewsForCampaignsNamespaceCampaign_CampaignsNamespaceQueryResponse$key =
    campaignData.CampaignsNamespace;
  const campaignsNamespaceCampaignData = useFragment(
    campaignFragment,
    campaignFragmentRef
  );
  const { campaign } = campaignsNamespaceCampaignData.campaignV2ForSlug;

  const fundingTiers =
    campaignsNamespaceFundingTiersData.campaignFundingTiersForSlug
      .campaignFundingTiers;

  if (campaign == null || fundingTiers == null) {
    return null;
  }

  const shouldShowAddNftsButton =
    user?.id === campaign.creator.id && campaign.status === "Published";

  const previews = fundingTiers.map((tier) => {
    const { __typename } = tier;
    switch (__typename) {
      case "CampaignFundingTierStandard":
        return (
          <CampaignFundingTierPreviewForCampaignFundingTierStandard
            campaignFundingTier={tier}
            key={tier.id}
            setCampaignTab={setCampaignTab}
            shouldShowAddNftsButton={shouldShowAddNftsButton}
          />
        );
      case RELAY_FUTURE_UNION_VALUE:
        return null;
      default:
        return assertUnreachable(__typename);
    }
  });

  return (
    <CampaignFundingTierPreviews>
      {filterNulls(previews)}
    </CampaignFundingTierPreviews>
  );
}
