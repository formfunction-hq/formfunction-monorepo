import FlexBox from "components/layout/FlexBox";

type Props = {
  comment: JSX.Element;
  profilePicCircle: JSX.Element;
  timeCreated: JSX.Element;
  usernameLink: JSX.Element;
};

export default function PostCommentLayout({
  comment,
  profilePicCircle,
  timeCreated,
  usernameLink,
}: Props) {
  return (
    <FlexBox flexDirection="column" gap={8}>
      <FlexBox alignItems="center" flexDirection="row" gap={8}>
        {profilePicCircle} {usernameLink}
      </FlexBox>
      {comment}
      {timeCreated}
    </FlexBox>
  );
}
