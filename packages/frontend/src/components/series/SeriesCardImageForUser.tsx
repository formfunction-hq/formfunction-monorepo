import graphql from "babel-plugin-relay/macro";
import ArtistPillButtonForUser from "components/buttons/ArtistPillButtonForUser";
import { useFragment } from "react-relay";
import SeriesCardImage from "components/series/SeriesCardImage";
import { SeriesCardImageForUser_User$key } from "components/series/__generated__/SeriesCardImageForUser_User.graphql";

type Props = {
  src: string;
  user: SeriesCardImageForUser_User$key;
};

const fragment = graphql`
  fragment SeriesCardImageForUser_User on User {
    ...ArtistPillButtonForUser_User
  }
`;

export default function SeriesCardImageForUser({
  src,
  user,
}: Props): JSX.Element {
  const userData = useFragment(fragment, user);

  return (
    <SeriesCardImage
      artistPillButton={<ArtistPillButtonForUser user={userData} />}
      src={src}
    />
  );
}
