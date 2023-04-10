import styles from "css/spotlights/SpotlightArtistPills.module.css";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import ArtistPillButtonForUserExpress from "components/buttons/ArtistPillButtonForUserExpress";
import { SpotlightArtistPills_SpotlightExpress$key } from "components/spotlights/__generated__/SpotlightArtistPills_SpotlightExpress.graphql";
import joinClasses from "utils/joinClasses";
import { Props as ArtistPillButtonProps } from "components/buttons/ArtistPillButton";

const fragment = graphql`
  fragment SpotlightArtistPills_SpotlightExpress on SpotlightExpress {
    spotlightInfo {
      users {
        ...ArtistPillButtonForUserExpress_UserExpress
      }
    }
  }
`;

type Props = {
  className?: string;
  spotlight: SpotlightArtistPills_SpotlightExpress$key;
  type?: ArtistPillButtonProps["type"];
};

export default function SpotlightArtistPills({
  className,
  spotlight,
  type,
}: Props) {
  const data = useFragment(fragment, spotlight);

  const {
    spotlightInfo: { users },
  } = data;

  return (
    <div className={joinClasses(className, styles.artistPills)}>
      {users.map((user) => (
        <ArtistPillButtonForUserExpress user={user} truncate type={type} />
      ))}
    </div>
  );
}
