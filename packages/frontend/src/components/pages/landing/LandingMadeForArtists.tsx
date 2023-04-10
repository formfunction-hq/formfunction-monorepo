import TextButton from "components/buttons/TextButton";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import LandingMadeForGeneric from "components/pages/landing/LandingMadeForGeneric";
import useColorModeContext from "hooks/useColorModeContext";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import getImgixUrl from "utils/getImgixUrl";

const DESCRIPTION1 =
  "Formfunction is a platform for creatives, by creatives. We believe that your art deserves the same attention from collectors as big generative NFT projects, and we want Formfunction to be the best NFT marketplace on Solana for independent artists and creators.";
const DESCRIPTION2 =
  "To join Formfunction, we ask for a short artist profile submission—this helps us keep Formfunction safe, trustworthy, and high-quality. Once you join Formfunction, you’ll be able to mint NFTs, put pieces up for sale, and connect with other artists and collectors.";
const TITLE1 = "What is Formfunction?";
const TITLE2 = "Joining Formfunction";

export default function LandingMadeForArtists(): JSX.Element {
  const { isDarkMode } = useColorModeContext();
  const src = getImgixUrl(
    isDarkMode
      ? "landing-page/creator-screen-dark-mode.png"
      : "landing-page/creator-screen-light-mode.png"
  );

  return (
    <LandingMadeForGeneric
      ctaButton={
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          href="/apply"
          icon={
            <ArrowRightIcon colorValue={ColorValue.BrightPurple} size={24} />
          }
          iconPosition="right"
          type="link_internal"
        >
          Submit your artist profile
        </TextButton>
      }
      description1={DESCRIPTION1}
      description2={DESCRIPTION2}
      src={src}
      title1={TITLE1}
      title2={TITLE2}
    />
  );
}
