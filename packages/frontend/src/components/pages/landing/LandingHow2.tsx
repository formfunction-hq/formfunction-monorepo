import BidCard from "components/auction/BidCard";
import ListingCardLanding from "components/auction/ListingCardLanding";
import LandingHowGeneric from "components/pages/landing/LandingHowGeneric";
import ARTIST_PILL_BUTTON_MCCANN from "constants/ArtistPillButtonMccann";
import styles from "css/pages/landing/LandingHow2.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import MediaType from "types/enums/MediaType";
import dayjs from "utils/dates/dayjsex";
import getImgixUrl from "utils/getImgixUrl";

type Props = {
  isHidden: boolean;
  onNext: () => void;
  onPrev: () => void;
};

export default function LandingHow2({
  isHidden,
  onNext,
  onPrev,
}: Props): JSX.Element {
  // TODO: swap out images
  const { width } = useWindowDimensions();

  const bids = [
    <BidCard
      artistName="cococo"
      artistSrc={getImgixUrl("landing-page/artists/coco.png")}
      date={dayjs().subtract(dayjs.duration({ hours: 1 }))}
      key={0}
      price={1.2}
    />,
    <BidCard
      artistName="peufff"
      artistSrc={getImgixUrl("landing-page/artists/peuff.png")}
      date={dayjs().subtract(dayjs.duration({ hours: 2 }))}
      key={1}
      price={0.8}
    />,
    <BidCard
      artistName="moofie"
      artistSrc={getImgixUrl("landing-page/artists/moofie.png")}
      date={dayjs().subtract(dayjs.duration({ hours: 3 }))}
      key={2}
      price={0.6}
    />,
    <BidCard
      artistName="peufff"
      artistSrc={getImgixUrl("landing-page/artists/peuff.png")}
      date={dayjs().subtract(dayjs.duration({ hours: 4 }))}
      key={3}
      price={0.5}
    />,
    <BidCard
      artistName="chris"
      artistSrc={getImgixUrl("landing-page/artists/chris2.png")}
      date={dayjs().subtract(dayjs.duration({ hours: 5 }))}
      isListing
      key={4}
      price={0.5}
    />,
  ];

  const bidsSliced = width > 1230 ? bids : bids.slice(0, 2);

  return (
    <LandingHowGeneric
      description="List your piece for sale and set a minimum bid price. When the first bid over the minimum price is placed, a 24-hour auction begins."
      isHidden={isHidden}
      onNext={onNext}
      onPrev={onPrev}
      title="2. List your art for auction"
    >
      <div className={styles.body}>
        <ListingCardLanding
          artistPillButton={ARTIST_PILL_BUTTON_MCCANN}
          endDate={dayjs().add(
            dayjs.duration({ hours: 23, minutes: 23, seconds: 23 })
          )}
          imageSrc={getImgixUrl("landing-page/mccann-baths.jpeg")}
          mediaType={MediaType.ImageJpeg}
          price={1.2}
          title="Széchenyi Baths"
        />
        <div className={styles.bids}>{bidsSliced}</div>
      </div>
    </LandingHowGeneric>
  );
}
