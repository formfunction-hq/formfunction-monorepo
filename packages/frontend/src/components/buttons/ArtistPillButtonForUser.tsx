import ArtistPillButton from "components/buttons/ArtistPillButton";
import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { ArtistPillButtonForUser_User$key } from "components/buttons/__generated__/ArtistPillButtonForUser_User.graphql";

const fragment = graphql`
  fragment ArtistPillButtonForUser_User on User {
    # eslint-disable-next-line relay/unused-fields
    id
    username

    ProfilePhoto {
      # eslint-disable-next-line relay/unused-fields
      id
      photoUrl
    }
  }
`;

type Props = {
  className?: string;
  truncate?: boolean;
  user: ArtistPillButtonForUser_User$key;
};

export default function ArtistPillButtonForUser({
  className,
  truncate = false,
  user,
}: Props): JSX.Element {
  const userData = useFragment(fragment, user);

  return (
    <ArtistPillButton
      className={className}
      truncate={truncate}
      name={userData.username}
      src={userData.ProfilePhoto?.photoUrl}
    />
  );
}
