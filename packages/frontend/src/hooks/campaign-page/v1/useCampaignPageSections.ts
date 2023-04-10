import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import {
  CampaignSectionsForSlugV2Input,
  useCampaignPageSectionsQuery,
} from "hooks/campaign-page/v1/__generated__/useCampaignPageSectionsQuery.graphql";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import useSolanaContext from "hooks/useSolanaContext";

export const campaignSectionsQuery = graphql`
  query useCampaignPageSectionsQuery(
    $input: CampaignSectionsForSlugV2Input!
    $firstForPreviewNfts: PaginationAmount!
    $firstForSections: PaginationAmount!
    $candyMachineInfoInput: CampaignSectionWithGenerativeMintsCandyMachineInfoInput!
  ) {
    campaignSectionsForSlugV2(input: $input) {
      # eslint-disable-next-line relay/unused-fields
      campaignSections {
        ... on CampaignSectionWithNfts {
          __typename
          id
          ...CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts
          ...CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts
        }
        ... on CampaignSectionWithGenerativeMints {
          __typename
          id
          ...CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints
          ...CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints
        }
      }
    }
  }
`;

export default function useCampaignPageSections(
  input: CampaignSectionsForSlugV2Input,
  fetchKey: number
) {
  const { anchorWallet } = useSolanaContext();
  const viewerId = anchorWallet?.publicKey?.toString();
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useCampaignPageSectionsQuery>(
        RelayEnvironment,
        campaignSectionsQuery,
        {
          candyMachineInfoInput: {
            viewerId,
          },
          firstForPreviewNfts: 3,
          firstForSections: 100,
          input: {
            campaignSlug: input.campaignSlug,
            creatorUsername: input.creatorUsername,
          },
        }
      ),
    [input.campaignSlug, input.creatorUsername, viewerId]
  );

  const [campaignSectionsQueryRef, loadCampaignSectionsQuery] =
    useQueryLoader<useCampaignPageSectionsQuery>(
      campaignSectionsQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadCampaignSectionsQuery(
      {
        // @ts-ignore for logging purposes only, it gets ignored in fetchGraphql
        [FetchGraphqlVariablesDenylist.FetchKeyForLogging]: fetchKey,
        candyMachineInfoInput: {
          viewerId,
        },
        firstForPreviewNfts: 3,
        firstForSections: 100,
        input: {
          campaignSlug: input.campaignSlug,
          creatorUsername: input.creatorUsername,
        },
      },
      {
        fetchPolicy: "store-and-network",
      }
    );
  }, [
    loadCampaignSectionsQuery,
    input.campaignSlug,
    input.creatorUsername,
    fetchKey,
    viewerId,
  ]);

  return campaignSectionsQueryRef;
}
