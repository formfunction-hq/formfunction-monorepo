import graphql from "babel-plugin-relay/macro";
import RELAY_FUTURE_UNION_VALUE from "constants/RelayFutureUnionValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import { CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse$key } from "components/pages/campaign/campaign-v2/funding-tiers/__generated__/CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse.graphql";
import CampaignFundingTierForCampaignFundingTierStandard from "components/pages/campaign/campaign-v2/funding-tiers/CampaignFundingTierForCampaignFundingTierStandard";
import CampaignFundingTiersContainer from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTiersContainer";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import { useCampaignPageFundingTiersQuery } from "hooks/campaign-page/v2/__generated__/useCampaignPageFundingTiersQuery.graphql";
import { campaignFundingTiersQuery } from "hooks/campaign-page/v2/useCampaignPageFundingTiers";

const fragment = graphql`
  fragment CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignFundingTiersForSlug(input: $input) {
      campaignFundingTiers {
        __typename
        ... on CampaignFundingTierStandard {
          id
          ...CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard
        }
      }
    }
  }
`;

type Props = {
  campaignFundingTiersQueryRef: PreloadedQuery<useCampaignPageFundingTiersQuery>;
};

export default function CampaignFundingTiersForCampaignsNamespace({
  campaignFundingTiersQueryRef,
}: Props): Maybe<JSX.Element> {
  const data = usePreloadedQuery<useCampaignPageFundingTiersQuery>(
    campaignFundingTiersQuery,
    campaignFundingTiersQueryRef
  );
  const fragmentRef: CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse$key =
    data.CampaignsNamespace;
  const campaignsNamespaceData = useFragment(fragment, fragmentRef);

  const fundingTiers =
    campaignsNamespaceData.campaignFundingTiersForSlug.campaignFundingTiers;
  if (fundingTiers == null) {
    return null;
  }

  const tiers = fundingTiers.map((tier) => {
    const { __typename } = tier;
    switch (__typename) {
      case "CampaignFundingTierStandard":
        return (
          <CampaignFundingTierForCampaignFundingTierStandard
            campaignFundingTier={tier}
            key={tier.id}
          />
        );
      case RELAY_FUTURE_UNION_VALUE:
        return null;
      default:
        return assertUnreachable(__typename);
    }
  });

  return (
    <CampaignFundingTiersContainer>
      {filterNulls(tiers)}
    </CampaignFundingTiersContainer>
  );
}
