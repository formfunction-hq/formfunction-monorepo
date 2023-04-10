import ButtonWithText from "components/buttons/ButtonWithText";
import ImageWithArtistPillButton from "components/images/ImageWithArtistPillButton";
import MaybeImgix from "components/images/MaybeImgix";
import ArtName from "components/text/ArtName";
import Body1Medium from "components/text/Body1Medium";
import Header2 from "components/text/Header2";
import Header3 from "components/text/Header3";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/auction/CongratsCard.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import Imgix from "react-imgix";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import TextSymbol from "types/enums/TextSymbol";

type Props = {
  artistPillButton: JSX.Element;
  collector: string;
  imageSrc: string;
  price: number;
  title: string;
};

export default function CongratsCard({
  artistPillButton,
  collector,
  imageSrc,
  price,
  title,
}: Props): JSX.Element {
  const image = (
    <MaybeImgix src={imageSrc}>
      <Imgix className={styles.image} src={imageSrc} sizes="75vw" />
      <img className={styles.image} src={imageSrc} />
    </MaybeImgix>
  );
  const { width } = useWindowDimensions();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ImageWithArtistPillButton
          artistPillButton={artistPillButton}
          image={image}
        />
        {width > 1050 && (
          <ArtName colorClass={ColorClass.Primary}>{title}</ArtName>
        )}
      </div>
      <div className={styles.right}>
        <Header2 colorClass={ColorClass.Primary}>
          Congrats on selling your NFT!
        </Header2>
        <Body1Medium
          className={styles.description}
          colorClass={ColorClass.Primary}
        >
          The auction for {title} has ended, and your piece has been collected
          by the highest bidder, @{collector}.
        </Body1Medium>
        <TinyLabel
          className={styles.soldFor}
          colorClass={ColorClass.Secondary}
          textTransform="uppercase"
        >
          Sold For
        </TinyLabel>
        <Header3 className={styles.price} colorClass={ColorClass.Primary}>
          {price} {TextSymbol.SolSymbol}
        </Header3>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.button}
          fontClass={FontClass.NavLink}
        >
          Send @{collector} a note
        </ButtonWithText>
      </div>
    </div>
  );
}
