import InfoIcon from "components/icons/InfoIcon";
import Body1 from "components/text/Body1";
import WrapWithTooltip from "components/tooltips/WrapWithTooltip";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

type Props = {
  infoIconColorValue: ColorValue;
  maxWidth?: number;
  tooltipText: string;
};

export default function InfoIconTooltip({
  infoIconColorValue,
  maxWidth = 350,
  tooltipText,
}: Props) {
  return (
    <WrapWithTooltip
      tooltipContent={
        <Body1
          colorClass={ColorClass.Primary}
          style={{ maxWidth }}
          textAlign="center"
        >
          {tooltipText}
        </Body1>
      }
    >
      <InfoIcon colorValue={infoIconColorValue} size={24} />
    </WrapWithTooltip>
  );
}
