import graphql from "babel-plugin-relay/macro";
import ColorValue from "types/enums/ColorValue";
import { UserSearchBarSelectedItem_UserExpress$key } from "components/user/__generated__/UserSearchBarSelectedItem_UserExpress.graphql";
import { useFragment } from "react-relay";
import ProfilePhotoCircle from "components/images/ProfilePhotoCircle";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import CrossIcon from "components/icons/CrossIcon";
import PillWithTextAndIcon from "components/misc/PillWithTextAndIcon";
import IconButton from "components/buttons/IconButton";

const fragment = graphql`
  fragment UserSearchBarSelectedItem_UserExpress on UserExpress {
    username
    ProfilePhoto {
      photoUrl
    }
  }
`;

type Props = {
  onClickCrossIcon: () => void;
  user: UserSearchBarSelectedItem_UserExpress$key;
};

export default function UserSearchBarSelectedItem({
  onClickCrossIcon,
  user,
}: Props): JSX.Element {
  const userData = useFragment(fragment, user);
  const { ProfilePhoto, username } = userData;

  return (
    <PillWithTextAndIcon
      icon={
        <IconButton
          icon={<CrossIcon colorValue={ColorValue.Primary} />}
          onClick={onClickCrossIcon}
        />
      }
    >
      <ProfilePhotoCircle src={ProfilePhoto?.photoUrl} />
      <Body2 colorClass={ColorClass.Primary}>{username}</Body2>
    </PillWithTextAndIcon>
  );
}
