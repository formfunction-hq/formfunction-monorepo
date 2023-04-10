import PlainButton from "components/buttons/PlainButton";
import CheckmarkIcon from "components/icons/CheckmarkIcon";
import styles from "css/buttons/CheckboxButton.module.css";
import ColorValue from "types/enums/ColorValue";

type Props = {
  isActive: boolean;
  onClick?: () => void;
};

export default function CheckboxButton({
  isActive,
  onClick,
}: Props): JSX.Element {
  const className = isActive ? styles.active : styles.inactive;
  const children = isActive ? (
    <CheckmarkIcon colorValue={ColorValue.White} />
  ) : null;

  if (onClick == null) {
    return <div className={className}>{children}</div>;
  }

  return (
    <PlainButton className={className} onClick={onClick} type="button">
      {children}
    </PlainButton>
  );
}
