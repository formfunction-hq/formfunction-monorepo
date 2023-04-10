import { useParams } from "react-router-dom";
import CampaignPageV1 from "components/pages/campaign/campaign-v1/CampaignPage";
import CampaignPageV2 from "components/pages/campaign/campaign-v2/CampaignPage";

type Props = {
  isDraftView?: boolean;
};

/**
 * Why do we need this wrapper component?
 *
 * We ran two pilot campaigns with Robbie Shilstone and Popheadz, and in order to build the pilots faster, we didn't fully build out the backend.
 *
 * The backend (data model + new GraphQL API) is now built out, but we still need to support the old campaign page for our two pilot campaigns:
 * - https://formfunction.xyz/@shilstone_arts/campaigns/off-leash
 * - Popheadz
 *
 * Eventually we may want to migrate those campaigns to use the new data model and APIs, but for now, making this wrapper
 * component is the easiest way to support both the old and new campaign pages.
 */
export default function CampaignPage({ isDraftView }: Props) {
  const params = useParams();
  const { campaignSlug } = params;

  if (campaignSlug == null) {
    return null;
  }

  if (["popheadz", "toonies"].includes(campaignSlug)) {
    return <CampaignPageV1 />;
  }

  return <CampaignPageV2 isDraftView={isDraftView} />;
}
