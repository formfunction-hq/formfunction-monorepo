import FlexBox from "components/layout/FlexBox";
import SeparatorDot from "components/misc/SeparatorDot";
import useBreakpoint from "hooks/useBreakpoint";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";

type Props = {
  artistPillButton: JSX.Element;
  postTimeCreated: JSX.Element;
  postVisibilitySection: JSX.Element;
};

export default function PostHeaderLayout({
  artistPillButton,
  postVisibilitySection,
  postTimeCreated,
}: Props) {
  const { isDesktopBreakpoint } = useBreakpoint();

  return (
    <FlexBox flexDirection="row" gap={8}>
      <FlexBox
        alignItems={isDesktopBreakpoint ? "flex-start" : "center"}
        flexDirection={isDesktopBreakpoint ? "column" : "row"}
        gap={24}
      >
        {artistPillButton}
        <FlexBox alignItems="center" flexDirection="row" gap={8}>
          {postVisibilitySection}
          <SeparatorDot
            colorClass={ColorClass.Secondary}
            fontClass={FontClass.Body1}
          />
          {postTimeCreated}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
