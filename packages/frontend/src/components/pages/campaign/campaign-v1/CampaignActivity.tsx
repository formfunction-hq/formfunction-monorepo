import styles from "css/pages/campaign/campaign-v1/CampaignActivity.module.css";
import CampaignActivityItemForNftTransaction from "components/pages/campaign/campaign-generic/activity/CampaignActivityItemForNftTransaction";
import NftTransactions from "components/pages/common/nft/NftTransactions";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { campaignActivityQuery } from "hooks/campaign-page/v1/useCampaignPageActivity";
import { useCampaignPageActivityQuery } from "hooks/campaign-page/v1/__generated__/useCampaignPageActivityQuery.graphql";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import joinClasses from "utils/joinClasses";
import GlobalClass from "types/enums/GlobalClass";

type Props = {
  campaignActivityQueryRef: PreloadedQuery<useCampaignPageActivityQuery>;
};

export default function CampaignActivity({
  campaignActivityQueryRef,
}: Props): Maybe<JSX.Element> {
  const data = usePreloadedQuery<useCampaignPageActivityQuery>(
    campaignActivityQuery,
    campaignActivityQueryRef
  );

  if (data.campaignActivityForSlug.campaignActivity == null) {
    // TODO[@arcticmatt][campaigns]: handle this better
    return null;
  }

  const items = data.campaignActivityForSlug.campaignActivity.edges.map(
    ({ node }) => (
      <CampaignActivityItemForNftTransaction
        key={node.id}
        nftTransaction={node}
      />
    )
  );

  return (
    <NftTransactions
      className={joinClasses(styles.container, GlobalClass.ThinScrollbar)}
      separatorMargin={12}
    >
      {items}
    </NftTransactions>
  );
}
