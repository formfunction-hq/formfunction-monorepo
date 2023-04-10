import ColorValue from "types/enums/ColorValue";
import CrossIcon from "components/icons/CrossIcon";
import PlainButton from "components/buttons/PlainButton";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import CrossWithBorderIcon from "components/icons/CrossWithBorderIcon";

type Props = {
  className?: string;
  colorValue: ColorValue;
  isShown?: boolean;
  onClick?: () => void;
  withBorder?: boolean;
};

export default function CloseButton({
  className,
  colorValue,
  isShown = true,
  onClick = emptyFunction,
  withBorder = false,
}: Props): JSX.Element {
  return (
    <PlainButton
      className={className}
      onClick={onClick}
      style={{ fontSize: 0, visibility: isShown ? undefined : "hidden" }}
      type="button"
    >
      {withBorder ? (
        <CrossWithBorderIcon colorValue={colorValue} />
      ) : (
        <CrossIcon colorValue={colorValue} />
      )}
    </PlainButton>
  );
}
