import styles from "css/images/ImageWithArtistPillButton.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

type Props = {
  artistPillButton: Maybe<JSX.Element>;
  image: JSX.Element;
};

export default function ImageWithArtistPillButton({
  artistPillButton,
  image,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      {image}
      {artistPillButton != null && (
        <div className={styles.pill}>{artistPillButton}</div>
      )}
    </div>
  );
}
