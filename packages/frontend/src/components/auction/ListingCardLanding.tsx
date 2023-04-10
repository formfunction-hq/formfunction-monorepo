import ListingCardBidInfo from "components/auction/ListingCardBidInfo";
import ListingCardGeneric from "components/auction/ListingCardGeneric";
import ListingCardImage from "components/auction/ListingCardImage";
import { Dayjs } from "dayjs";
import MediaType from "types/enums/MediaType";

type Props = {
  artistPillButton: JSX.Element;
  endDate: Dayjs;
  imageSrc: string;
  mediaType: MediaType;
  price: number;
  title: string;
};

export default function ListingCardLanding({
  artistPillButton,
  endDate,
  imageSrc,
  mediaType,
  price,
  title,
}: Props): JSX.Element {
  const image = <ListingCardImage mediaType={mediaType} src={imageSrc} />;

  return (
    <ListingCardGeneric
      artistPillButton={artistPillButton}
      image={image}
      otherInfo={<ListingCardBidInfo endDate={endDate} price={price} />}
      title={title}
    />
  );
}
