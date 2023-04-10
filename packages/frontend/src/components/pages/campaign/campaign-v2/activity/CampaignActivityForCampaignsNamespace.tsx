import styles from "css/pages/campaign/campaign-v2/activity/CampaignActivityForCampaignsNamespace.module.css";
import graphql from "babel-plugin-relay/macro";
import CampaignActivityItemForNftTransaction from "components/pages/campaign/campaign-generic/activity/CampaignActivityItemForNftTransaction";
import NftTransactions from "components/pages/common/nft/NftTransactions";
import { campaignActivityV2Query } from "hooks/campaign-page/v2/useCampaignPageActivityV2";
import { useCampaignPageActivityV2Query } from "hooks/campaign-page/v2/__generated__/useCampaignPageActivityV2Query.graphql";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";
import { CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse$key } from "components/pages/campaign/campaign-v2/activity/__generated__/CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse.graphql";

const fragment = graphql`
  fragment CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignV2ActivityForSlug(input: $input) {
      campaignActivity(first: $first, input: $input) {
        edges {
          node {
            id
            ...CampaignActivityItemForNftTransaction_NftTransactionExpress
          }
        }
      }
    }
  }
`;

type Props = {
  activityQueryRef: PreloadedQuery<useCampaignPageActivityV2Query>;
};

export default function CampaignActivityForCampaignsNamespace({
  activityQueryRef,
}: Props) {
  const data = usePreloadedQuery<useCampaignPageActivityV2Query>(
    campaignActivityV2Query,
    activityQueryRef
  );
  const fragmentRef: CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse$key =
    data.CampaignsNamespace;
  const campaignsNamespaceData = useFragment(fragment, fragmentRef);

  const activity =
    campaignsNamespaceData.campaignV2ActivityForSlug.campaignActivity?.edges;
  if (activity == null) {
    return null;
  }

  const items = activity.map(({ node }) => (
    <CampaignActivityItemForNftTransaction
      key={node.id}
      nftTransaction={node}
    />
  ));

  return (
    <NftTransactions
      className={joinClasses(styles.container, GlobalClass.ThinScrollbar)}
      separatorMargin={12}
    >
      {items}
    </NftTransactions>
  );
}
