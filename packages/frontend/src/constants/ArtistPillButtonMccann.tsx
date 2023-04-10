import ArtistPillButton from "components/buttons/ArtistPillButton";
import getImgixUrl from "utils/getImgixUrl";

const ARTIST_PILL_BUTTON_MCCANN = (
  <ArtistPillButton
    src={getImgixUrl("landing-page/artists/chris2.png")}
    name="chris"
  />
);

export default ARTIST_PILL_BUTTON_MCCANN;
