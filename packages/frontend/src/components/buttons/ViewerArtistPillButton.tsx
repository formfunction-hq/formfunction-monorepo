import ArtistPillButton from "components/buttons/ArtistPillButton";
import useUserContext from "hooks/useUserContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function ViewerArtistPillButton(): Maybe<JSX.Element> {
  const { user } = useUserContext();

  if (user == null) {
    return null;
  }

  return (
    <ArtistPillButton name={user.username} src={user.ProfilePhoto?.photoUrl} />
  );
}
