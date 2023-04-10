import ColorValue from "types/enums/ColorValue";
import FlexBox from "components/layout/FlexBox";
import { AlignItems } from "flexbox-react";

type Props = {
  alignSelf?: AlignItems;
  children: any;
  colorValue?: ColorValue;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
};

export default function PillWithTextAndIcon({
  alignSelf,
  children,
  colorValue = ColorValue.Shader,
  icon,
  iconPosition = "right",
}: Props): JSX.Element {
  return (
    <FlexBox
      style={{
        backgroundColor: colorValue,
        borderRadius: "12px",
        flexShrink: 0,
      }}
      alignSelf={alignSelf}
      flexDirection="row"
      alignItems="center"
      gap={8}
      padding="10px 16px"
    >
      {icon != null && iconPosition === "left" && icon}
      {children}
      {icon != null && iconPosition === "right" && icon}
    </FlexBox>
  );
}
