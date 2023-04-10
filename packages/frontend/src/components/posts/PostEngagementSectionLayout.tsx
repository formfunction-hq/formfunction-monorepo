import FlexBox from "components/layout/FlexBox";

type Props = {
  postCommentsButton: JSX.Element;
  postReactions: JSX.Element;
};

export default function PostEngagementSectionLayout({
  postCommentsButton,
  postReactions,
}: Props) {
  return (
    <FlexBox flexDirection="row" gap={36}>
      {postReactions}
      {postCommentsButton}
    </FlexBox>
  );
}
