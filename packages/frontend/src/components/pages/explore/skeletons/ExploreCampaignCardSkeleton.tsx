import ArtistPillLoadingSkeleton from "components/auction/ArtistPillLoadingSkeleton";
import SquareContainer from "components/containers/SquareContainer";
import ExploreCampaignCard from "components/pages/explore/ExploreCampaignCard";
import { range } from "formfn-shared/dist/utils/range";
import Skeleton from "react-loading-skeleton";

type Props = {
  showNftAssets?: boolean;
};

export default function ExploreCampaignCardSkeleton({
  showNftAssets = true,
}: Props) {
  return (
    <ExploreCampaignCard
      artistPillButton={<ArtistPillLoadingSkeleton />}
      asset={<Skeleton borderRadius={16} width="100%" height="100%" />}
      campaignHref={null}
      description={<Skeleton width="100%" />}
      nftAssets={
        !showNftAssets
          ? null
          : range(3).map((i) => (
              <SquareContainer key={i}>
                <Skeleton borderRadius={16} width="100%" height="100%" />
              </SquareContainer>
            ))
      }
      progressTowardsGoal={null}
      title={<Skeleton width="50%" />}
    />
  );
}
