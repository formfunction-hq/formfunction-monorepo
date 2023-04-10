import LandingMadeForGeneric from "components/pages/landing/LandingMadeForGeneric";
import useColorModeContext from "hooks/useColorModeContext";
import getImgixUrl from "utils/getImgixUrl";

const DESCRIPTION1 =
  "We made Formfunction because we wanted a thoughtfully-designed marketplace for independent creators on Solana—amazing artists deserve an amazing showcase. Other NFT marketplaces on Solana are entirely focused on PFP collections—with Formfunction, we want to make the digital art browsing experience amazing, and help you find the artists who will define the future of NFTs.";
const DESCRIPTION2 =
  "Anyone can join Formfunction as a collector. Check in often to see whether your favorite artists have new pieces up for auction!";
const TITLE1 = "Why collect art on Formfunction?";
const TITLE2 = "Joining Formfunction";

export default function LandingMadeForCollectors(): JSX.Element {
  const { isDarkMode } = useColorModeContext();
  const src = getImgixUrl(
    isDarkMode
      ? "landing-page/collector-screen-dark-mode.png"
      : "landing-page/collector-screen-light-mode.png"
  );

  return (
    <LandingMadeForGeneric
      description1={DESCRIPTION1}
      description2={DESCRIPTION2}
      src={src}
      title1={TITLE1}
      title2={TITLE2}
    />
  );
}
