import BackgroundOverlay from "components/loading/BackgroundOverlay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import styles from "css/loading/LoadingOverlay.module.css";

type Props = {
  isShown: boolean;
};

export default function LoadingOverlay({ isShown }: Props): Maybe<JSX.Element> {
  if (!isShown) {
    return null;
  }

  return (
    <BackgroundOverlay className={styles.backgroundOverlay}>
      <div className={styles.center}>
        <div className={styles.ldsEllipsis}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </BackgroundOverlay>
  );
}
