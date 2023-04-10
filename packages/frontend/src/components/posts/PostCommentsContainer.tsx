import FlexBox from "components/layout/FlexBox";

type Props = {
  children: any;
};

export default function PostCommentsContainer({ children }: Props) {
  return (
    <FlexBox flexDirection="column" gap={32}>
      {children}
    </FlexBox>
  );
}
