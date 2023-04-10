import PlainButton from "components/buttons/PlainButton";
import styles from "css/buttons/RadioButton.module.css";

type Props = {
  isActive: boolean;
  onClick?: () => void;
};

export default function RadioButton({ isActive, onClick }: Props): JSX.Element {
  const className = isActive ? styles.active : styles.inactive;

  if (onClick == null) {
    return <div className={className} />;
  }

  return <PlainButton className={className} onClick={onClick} />;
}
