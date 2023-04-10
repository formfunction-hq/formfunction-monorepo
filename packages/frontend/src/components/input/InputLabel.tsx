import ArtName from "components/text/ArtName";
import Body2 from "components/text/Body2";
import styles from "css/input/InputLabel.module.css";
import ColorClass from "types/enums/ColorClass";

type Props = {
  className?: string;
  label: string;
  required?: boolean;
  subLabel?: string | JSX.Element;
};

export default function InputLabel({
  className,
  label,
  required = false,
  subLabel,
}: Props): JSX.Element {
  return (
    <div className={className}>
      <ArtName colorClass={ColorClass.Primary}>
        {label}
        {required ? " *" : ""}
      </ArtName>
      {subLabel != null && (
        <Body2 className={styles.subLabel} colorClass={ColorClass.Primary}>
          {subLabel}
        </Body2>
      )}
    </div>
  );
}
