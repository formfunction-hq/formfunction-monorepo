import { Tooltip } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import FlexBox from "components/layout/FlexBox";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

type Props = {
  children: JSX.Element;
  tooltipContent: JSX.Element | string;
  tooltipPlacement?: TooltipPlacement;
};

export default function WrapWithTooltip({
  children,
  tooltipContent,
  tooltipPlacement,
}: Props) {
  const contentToShow =
    typeof tooltipContent === "string" ? (
      <Body2 colorClass={ColorClass.Primary}>{tooltipContent}</Body2>
    ) : (
      tooltipContent
    );

  return (
    <Tooltip
      color={ColorValue.WebsiteBackground}
      title={contentToShow}
      placement={tooltipPlacement}
    >
      {/* The extra div is needed due to a bug in the component.
      See https://github.com/ant-design/ant-design/issues/15909 */}
      {children.type === "div" ? (
        children
      ) : (
        <FlexBox alignItems="center">{children}</FlexBox>
      )}
    </Tooltip>
  );
}
