import CheckmarkGradientIcon from "components/icons/CheckmarkGradientIcon";
import CrossIcon from "components/icons/CrossIcon";
import FlexBox from "components/layout/FlexBox";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

export default function ChecklistItem({
  done,
  text,
}: {
  done: boolean;
  text: string;
}) {
  return (
    <FlexBox flexDirection="row" alignItems="center" gap={8}>
      {done ? (
        <CheckmarkGradientIcon />
      ) : (
        <CrossIcon colorValue={ColorValue.Red} />
      )}
      <Body1 colorClass={ColorClass.Primary}>{text}</Body1>
    </FlexBox>
  );
}
