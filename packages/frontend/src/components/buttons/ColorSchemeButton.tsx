import ColorScheme from "types/ColorScheme";
import styles from "css/buttons/ColorSchemeButton.module.css";
import PlainButton from "components/buttons/PlainButton";
import ColorValue from "types/enums/ColorValue";

function ColorCircle({ colorValue }: { colorValue: ColorValue }): JSX.Element {
  return (
    <div
      className={styles.colorCircle}
      style={{ backgroundColor: colorValue }}
    />
  );
}

type Props = {
  colorScheme: ColorScheme;
  isActive: boolean;
  onClick: () => void;
};

export default function ColorSchemeButton({
  colorScheme,
  isActive,
  onClick,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <PlainButton className={styles.button} onClick={onClick} type="button">
        <ColorCircle colorValue={colorScheme.background.colorValue} />
        <div className={styles.foreground}>
          <ColorCircle colorValue={colorScheme.foreground.colorValue} />
        </div>
      </PlainButton>
      {isActive && <div className={styles.active} />}
    </div>
  );
}
