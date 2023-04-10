import graphql from "babel-plugin-relay/macro";
import CreatorStory from "components/misc/CreatorStory";
import { ProfileCreatorStory_User$key } from "components/pages/profile/__generated__/ProfileCreatorStory_User.graphql";
import COLOR_SCHEMES from "constants/ColorSchemes";
import { useFragment } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const fragment = graphql`
  fragment ProfileCreatorStory_User on User {
    # eslint-disable-next-line relay/unused-fields
    id
    displayName
    username

    ProfilePhoto {
      # eslint-disable-next-line relay/unused-fields
      id
      photoUrl
    }

    CreatorStory {
      # eslint-disable-next-line relay/unused-fields
      id
      colorScheme
      goals
      headline
      inspiration
      process
    }
  }
`;

type Props = {
  user: ProfileCreatorStory_User$key;
};

export default function ProfileCreatorStory({
  user,
}: Props): Maybe<JSX.Element> {
  const userData = useFragment(fragment, user);
  const creatorStory = userData.CreatorStory;

  if (creatorStory == null) {
    return null;
  }

  return (
    <div>
      <CreatorStory
        colorScheme={COLOR_SCHEMES[creatorStory.colorScheme]}
        displayName={userData.displayName}
        goals={creatorStory.goals ?? ""}
        headline={creatorStory.headline ?? ""}
        inspiration={creatorStory.inspiration ?? ""}
        process={creatorStory.process ?? ""}
        profilePhotoSrc={userData.ProfilePhoto?.photoUrl ?? null}
        username={userData.username}
      />
    </div>
  );
}
