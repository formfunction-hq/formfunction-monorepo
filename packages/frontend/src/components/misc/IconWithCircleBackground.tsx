import FlexBox from "components/layout/FlexBox";
import ColorValue from "types/enums/ColorValue";

type Props = {
  backgroundColorValue: ColorValue;
  icon: JSX.Element;
};

export default function IconWithCircleBackground({
  backgroundColorValue,
  icon,
}: Props) {
  return (
    <FlexBox
      style={{
        backgroundColor: backgroundColorValue,
        borderRadius: "50%",
        padding: "12px",
      }}
      alignItems="center"
    >
      {icon}
    </FlexBox>
  );
}
