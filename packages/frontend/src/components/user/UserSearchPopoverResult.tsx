import graphql from "babel-plugin-relay/macro";
import TextButton from "components/buttons/TextButton";
import ProfilePhotoCircle from "components/images/ProfilePhotoCircle";
import { UserSearchPopoverResult_UserExpress$key } from "components/user/__generated__/UserSearchPopoverResult_UserExpress.graphql";
import { useFragment } from "react-relay";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import formatUsername from "utils/formatUsername";

type Props = {
  onClick: () => void;
  user: UserSearchPopoverResult_UserExpress$key;
};

const fragment = graphql`
  fragment UserSearchPopoverResult_UserExpress on UserExpress {
    username
    ProfilePhoto {
      photoUrl
    }
  }
`;

export default function UserSearchPopoverResult({ onClick, user }: Props) {
  const userData = useFragment(fragment, user);
  const { ProfilePhoto, username } = userData;

  return (
    <TextButton
      buttonThemeOrColorClass={TextButtonTheme.Primary}
      fontClass={FontClass.Body1}
      icon={<ProfilePhotoCircle src={ProfilePhoto?.photoUrl} />}
      onClick={onClick}
    >
      {`@${formatUsername(username)}`}
    </TextButton>
  );
}
