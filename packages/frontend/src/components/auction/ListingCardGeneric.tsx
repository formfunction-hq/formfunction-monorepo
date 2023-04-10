import ImageWithArtistPillButton from "components/images/ImageWithArtistPillButton";
import ArtName from "components/text/ArtName";
import styles from "css/auction/ListingCardGeneric.module.css";
import ColorClass from "types/enums/ColorClass";
import GlobalClass from "types/enums/GlobalClass";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import joinClasses from "utils/joinClasses";
import LISTING_CARD_MAX_WIDTH from "constants/ListingCardMaxWidth";

type Props = {
  artistPillButton: Maybe<JSX.Element>;
  cardAnimationClass?:
    | GlobalClass.CardAnimation
    | GlobalClass.CardAnimationNoTransform;
  enableMaxWidth?: boolean;
  image: JSX.Element;
  otherInfo?: MaybeUndef<JSX.Element>;
  title: JSX.Element | string;
};

export default function ListingCardGeneric({
  artistPillButton,
  cardAnimationClass = GlobalClass.CardAnimation,
  enableMaxWidth = false,
  image,
  otherInfo,
  title,
}: Props): JSX.Element {
  return (
    <div
      className={joinClasses(styles.container, cardAnimationClass)}
      style={{ maxWidth: enableMaxWidth ? LISTING_CARD_MAX_WIDTH : undefined }}
    >
      <div className={styles.image}>
        <ImageWithArtistPillButton
          artistPillButton={artistPillButton}
          image={image}
        />
      </div>
      <div className={styles.info}>
        {typeof title === "string" ? (
          <ArtName className={styles.title} colorClass={ColorClass.Primary}>
            {title}
          </ArtName>
        ) : (
          <div className={styles.title}>{title}</div>
        )}
      </div>
      {otherInfo}
    </div>
  );
}
