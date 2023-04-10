import MaybeImgix from "components/images/MaybeImgix";
import TextInputForDisplay from "components/input/TextInputForDisplay";
import LandingHowGeneric from "components/pages/landing/LandingHowGeneric";
import styles from "css/pages/landing/LandingHow1.module.css";
import Imgix from "react-imgix";
import getImgixUrl from "utils/getImgixUrl";

type Props = {
  isHidden: boolean;
  onNext: () => void;
};

export default function LandingHow1({ isHidden, onNext }: Props): JSX.Element {
  const src = getImgixUrl("landing-page/mccann-baths.jpeg");
  return (
    <LandingHowGeneric
      // TODO: may want to adjust this copy if we decide to eat rent fees
      description="When you mint a new piece of art on Formfunction, you can easily add all the details right on our platform. Since we use the Solana blockchain, minting an NFT costs less than a dollar."
      isHidden={isHidden}
      onNext={onNext}
      title="1. Mint your artwork"
    >
      <div className={styles.body}>
        <MaybeImgix src={src}>
          <Imgix className={styles.image} src={src} sizes="60vw" />
          <img className={styles.image} src={src} />
        </MaybeImgix>
        <div className={styles.inputs}>
          <TextInputForDisplay label="Name" value="Széchenyi Baths" />
          <TextInputForDisplay
            label="Description"
            value="The Széchenyi Baths are the most visited attraction of Budapst and largest medicinal bath in Europe. This photograph was taken with Mamiya RZ67 medium format film camera while the photographer, Chris McCann, was hanging off a retaining wall (and shortly kicked out thereafter)."
          />
          <TextInputForDisplay label="Royalties" value="10%" />
        </div>
      </div>
    </LandingHowGeneric>
  );
}
