import NftTransactions from "components/pages/common/nft/NftTransactions";
import { range } from "formfn-shared/dist/utils/range";
import CampaignActivityItemSkeleton from "components/pages/campaign/campaign-generic/activity/skeletons/CampaignActivityItemSkeleton";

export default function CampaignActivitySkeleton(): JSX.Element {
  return (
    <NftTransactions separatorMargin={12}>
      {range(5).map((i) => (
        <CampaignActivityItemSkeleton key={i} />
      ))}
    </NftTransactions>
  );
}
