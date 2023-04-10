import graphql from "babel-plugin-relay/macro";
import { nftCampaignQuery } from "hooks/nft-page/useNftPageCampaign";
import { useNftPageCampaignQuery } from "hooks/nft-page/__generated__/useNftPageCampaignQuery.graphql";
import { useNftPageLoadCampaign_CampaignsNamespaceQueryResponse$key } from "hooks/nft-page/__generated__/useNftPageLoadCampaign_CampaignsNamespaceQueryResponse.graphql";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";

const fragment = graphql`
  fragment useNftPageLoadCampaign_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignForNft(input: $input) {
      # eslint-disable-next-line relay/unused-fields
      campaign {
        goal {
          ... on CampaignMonetaryGoal {
            currency {
              name
            }
          }
        }
      }
      # eslint-disable-next-line relay/unused-fields
      campaignGoalCurrency {
        name
      }
    }
  }
`;

function useFragmentLoader(
  campaignsNamespace: useNftPageLoadCampaign_CampaignsNamespaceQueryResponse$key
) {
  const campaignsNamespaceData = useFragment(fragment, campaignsNamespace);
  return campaignsNamespaceData.campaignForNft;
}

export default function useNftPageLoadCampaign(
  nftCampaignQueryRef: PreloadedQuery<
    useNftPageCampaignQuery,
    Record<string, unknown>
  >
) {
  const data = usePreloadedQuery(nftCampaignQuery, nftCampaignQueryRef);
  return useFragmentLoader(data.CampaignsNamespace);
}
