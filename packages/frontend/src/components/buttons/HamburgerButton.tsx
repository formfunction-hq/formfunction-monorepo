import ColorValue from "types/enums/ColorValue";
import GlobalClass from "types/enums/GlobalClass";
import HamburgerIcon from "components/icons/HamburgerIcon";
import PlainButton from "components/buttons/PlainButton";

type Props = {
  colorValue: ColorValue;
  isShown?: boolean;
  onClick?: () => void;
};

export default function HamburgerButton({
  colorValue,
  isShown = true,
  onClick,
}: Props): JSX.Element {
  return (
    <PlainButton
      className={GlobalClass.HideText}
      onClick={onClick}
      type="button"
    >
      <div style={isShown ? {} : { visibility: "hidden" }}>
        <HamburgerIcon colorValue={colorValue} />
      </div>
    </PlainButton>
  );
}
