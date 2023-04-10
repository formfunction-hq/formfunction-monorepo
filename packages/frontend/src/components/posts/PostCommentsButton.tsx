import PlainButton from "components/buttons/PlainButton";
import ChatBubbleIcon from "components/icons/ChatBubbleIcon";
import FlexBox from "components/layout/FlexBox";
import Body1 from "components/text/Body1";
import pluralize from "formfn-shared/dist/utils/pluralize";
import useBreakpoint from "hooks/useBreakpoint";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

type Props = {
  onClick: () => void;
  totalCount: number;
};

export default function PostCommentsButton({ onClick, totalCount }: Props) {
  const { isMobileBreakpoint } = useBreakpoint();
  return (
    <PlainButton onClick={onClick}>
      <FlexBox flexDirection="row" gap={8} alignItems="center">
        <ChatBubbleIcon colorValue={ColorValue.Primary} size={20} />
        <Body1 colorClass={ColorClass.Primary}>
          {totalCount}
          {isMobileBreakpoint ? "" : pluralize(" comment", totalCount)}
        </Body1>
      </FlexBox>
    </PlainButton>
  );
}
