import Header3 from "components/text/Header3";
import Subheader from "components/text/Subheader";
import styles from "css/pages/landing/LandingMadeForGeneric.module.css";
import ColorClass from "types/enums/ColorClass";
import Imgix from "react-imgix";
import MaybeImgix from "components/images/MaybeImgix";

function HeaderAndDescription({
  ctaButton,
  description,
  header,
}: {
  ctaButton?: JSX.Element;
  description: string;
  header: string;
}): JSX.Element {
  return (
    <div className={styles.headerAndDescription}>
      <Header3 colorClass={ColorClass.Primary}>{header}</Header3>
      <Subheader colorClass={ColorClass.Primary}>{description}</Subheader>
      {ctaButton}
    </div>
  );
}

type Props = {
  ctaButton?: JSX.Element;
  description1: string;
  description2: string;
  src: string;
  title1: string;
  title2: string;
};

export default function LandingMadeForGeneric({
  ctaButton,
  description1,
  description2,
  src,
  title1,
  title2,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <HeaderAndDescription description={description1} header={title1} />
        <HeaderAndDescription
          ctaButton={ctaButton}
          description={description2}
          header={title2}
        />
      </div>
      <MaybeImgix src={src}>
        <Imgix className={styles.image} src={src} sizes="100vw" />
        <img className={styles.image} src={src} />
      </MaybeImgix>
    </div>
  );
}
