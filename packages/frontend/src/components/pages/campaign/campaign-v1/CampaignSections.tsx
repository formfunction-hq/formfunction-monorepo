import CampaignFundingTiersContainer from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTiersContainer";
import CampaignSectionForCampaignSectionWithGenerativeMint from "components/pages/campaign/campaign-v1/sections/CampaignSectionForCampaignSectionWithGenerativeMint";
import CampaignSectionForCampaignSectionWithNfts from "components/pages/campaign/campaign-v1/sections/CampaignSectionForCampaignSectionWithNfts";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import { campaignSectionsQuery } from "hooks/campaign-page/v1/useCampaignPageSections";
import { useCampaignPageSectionsQuery } from "hooks/campaign-page/v1/__generated__/useCampaignPageSectionsQuery.graphql";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";

type Props = {
  campaignSectionsQueryRef: PreloadedQuery<useCampaignPageSectionsQuery>;
};

export default function CampaignSections({
  campaignSectionsQueryRef,
}: Props): Maybe<JSX.Element> {
  const data = usePreloadedQuery<useCampaignPageSectionsQuery>(
    campaignSectionsQuery,
    campaignSectionsQueryRef
  );

  if (data.campaignSectionsForSlugV2.campaignSections == null) {
    return null;
  }

  const sections = data.campaignSectionsForSlugV2.campaignSections.map(
    (section) => {
      switch (section.__typename) {
        case "CampaignSectionWithNfts":
          return (
            <CampaignSectionForCampaignSectionWithNfts
              key={section.id}
              campaignSection={section}
            />
          );
        case "CampaignSectionWithGenerativeMints":
          return (
            <CampaignSectionForCampaignSectionWithGenerativeMint
              key={section.id}
              campaignSection={section}
            />
          );
        default:
          return null;
      }
    }
  );

  return (
    <CampaignFundingTiersContainer>
      {filterNulls(sections)}
    </CampaignFundingTiersContainer>
  );
}
