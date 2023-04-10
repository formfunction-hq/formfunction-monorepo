import ListingCardGeneric from "components/auction/ListingCardGeneric";
import ListingCardImage from "components/auction/ListingCardImage";
import ArtistPillLoadingSkeleton from "components/auction/ArtistPillLoadingSkeleton";
import NftOtherInfoSkeleton from "components/auction/NftOtherInfoSkeleton";
import Skeleton from "react-loading-skeleton";
import ArtName from "components/text/ArtName";

export default function ListingCardLoadingSkeleton(): JSX.Element {
  return (
    <ListingCardGeneric
      artistPillButton={<ArtistPillLoadingSkeleton />}
      image={<ListingCardImage mediaType="unknown" isSkeleton src={null} />}
      otherInfo={<NftOtherInfoSkeleton />}
      title={
        <ArtName colorClass={null}>
          <Skeleton width={170} />
        </ArtName>
      }
    />
  );
}
