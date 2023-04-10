import CongratsCard from "components/auction/CongratsCard";
import LandingHowGeneric from "components/pages/landing/LandingHowGeneric";
import styles from "css/pages/landing/LandingHow3.module.css";
import { useEffect } from "react";
import ARTIST_PILL_BUTTON_MCCANN from "constants/ArtistPillButtonMccann";
import getImgixUrl from "utils/getImgixUrl";
import useConfetti from "hooks/useConfetti";

type Props = {
  isHidden: boolean;
  onPrev: () => void;
};

export default function LandingHow3({ isHidden, onPrev }: Props): JSX.Element {
  const showConfetti = useConfetti();
  useEffect(() => {
    if (!isHidden) {
      showConfetti();
    }
  }, [isHidden, showConfetti]);

  return (
    <LandingHowGeneric
      description="After the auction is over, the collector who placed the winning bid will receive the NFT, which will appear in their profile under the “Collected” tab. Artists keep 95% of the final sale price."
      isHidden={isHidden}
      onPrev={onPrev}
      title="3. The art is transferred to its new home"
    >
      <div className={styles.body}>
        <CongratsCard
          artistPillButton={ARTIST_PILL_BUTTON_MCCANN}
          collector="cococo"
          imageSrc={getImgixUrl("landing-page/mccann-baths.jpeg")}
          price={1.2}
          title="Széchenyi Baths"
        />
      </div>
    </LandingHowGeneric>
  );
}
