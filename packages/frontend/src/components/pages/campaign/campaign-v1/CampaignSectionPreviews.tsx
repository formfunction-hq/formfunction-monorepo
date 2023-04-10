import CampaignSectionPreviewForCampaignSectionWithGenerativeMint from "components/pages/campaign/campaign-v1/sections/CampaignSectionPreviewForCampaignSectionWithGenerativeMint";
import CampaignSectionPreviewForCampaignSectionWithNfts from "components/pages/campaign/campaign-v1/sections/CampaignSectionPreviewForCampaignSectionWithNfts";
import Header3 from "components/text/Header3";
import styles from "css/pages/campaign/campaign-v1/CampaignSectionPreviews.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { campaignSectionsQuery } from "hooks/campaign-page/v1/useCampaignPageSections";
import { useCampaignPageSectionsQuery } from "hooks/campaign-page/v1/__generated__/useCampaignPageSectionsQuery.graphql";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import ColorClass from "types/enums/ColorClass";

type Props = {
  campaignSectionsQueryRef: PreloadedQuery<useCampaignPageSectionsQuery>;
  setCampaignTab: (val: CampaignTab) => void;
};

export default function CampaignSectionPreviews({
  campaignSectionsQueryRef,
  setCampaignTab,
}: Props): Maybe<JSX.Element> {
  const data = usePreloadedQuery<useCampaignPageSectionsQuery>(
    campaignSectionsQuery,
    campaignSectionsQueryRef
  );

  if (data.campaignSectionsForSlugV2.campaignSections == null) {
    // TODO[@arcticmatt][campaigns]: handle this better
    return null;
  }

  const previews = data.campaignSectionsForSlugV2.campaignSections.map(
    (section) => {
      switch (section.__typename) {
        case "CampaignSectionWithNfts":
          return (
            <CampaignSectionPreviewForCampaignSectionWithNfts
              campaignSection={section}
              key={section.id}
              setCampaignTab={setCampaignTab}
            />
          );
        case "CampaignSectionWithGenerativeMints":
          return (
            <CampaignSectionPreviewForCampaignSectionWithGenerativeMint
              campaignSection={section}
              key={section.id}
              setCampaignTab={setCampaignTab}
            />
          );
        default:
          return null;
      }
    }
  );

  return (
    <div>
      <Header3 colorClass={ColorClass.Primary} textAlign="center">
        Ways to support
      </Header3>
      <div className={styles.previews}>{previews}</div>
    </div>
  );
}
