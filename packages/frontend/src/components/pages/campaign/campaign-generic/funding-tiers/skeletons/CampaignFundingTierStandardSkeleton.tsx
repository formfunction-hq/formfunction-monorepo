import ListingCardLoadingSkeleton from "components/auction/ListingCardLoadingSkeleton";
import CampaignFundingTierStandard from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierStandard";
import { range } from "formfn-shared/dist/utils/range";
import useNftGridFullWidthColumnCount from "hooks/grids/useNftGridFullWidthColumnCount";
import { nanoid } from "nanoid";
import Skeleton from "react-loading-skeleton";

export default function CampaignFundingTierStandardSkeleton() {
  const nftCount = useNftGridFullWidthColumnCount();
  const nftSkeletons = range(nftCount).map(() => (
    <ListingCardLoadingSkeleton key={nanoid()} />
  ));

  return (
    <CampaignFundingTierStandard
      benefits={[]}
      description={<Skeleton />}
      id={null}
      nfts={nftSkeletons}
      title={<Skeleton width={300} />}
    />
  );
}
