import Header from "components/header/Header";
import styles from "css/header/HeaderAndCoverPhoto.module.css";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import useSolanaContext from "hooks/useSolanaContext";
import HeaderTheme from "types/enums/HeaderTheme";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import MaybeImgix from "components/images/MaybeImgix";
import Imgix from "react-imgix";

type Props = {
  src: MaybeUndef<string>;
};

export default function HeaderAndCoverPhoto({ src }: Props): JSX.Element {
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const { anchorWallet } = useSolanaContext();

  return (
    <div className={styles.container}>
      {src == null ? (
        <div className={styles.coverPhoto} />
      ) : (
        <MaybeImgix src={src}>
          <Imgix className={styles.coverPhoto} src={src} />
          <img className={styles.coverPhoto} src={src} />
        </MaybeImgix>
      )}
      {(!isBottomTabsWidth || anchorWallet == null) && (
        <div className={styles.headerGradient} />
      )}
      <div className={styles.header}>
        <Header headerTheme={HeaderTheme.Light} />
      </div>
    </div>
  );
}
