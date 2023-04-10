import BodyText from "components/text/BodyText";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import HeaderText from "components/text/HeaderText";
import styles from "css/input/GenericInput.module.css";

type Props = {
  // input element
  children: JSX.Element | Array<JSX.Element | null | boolean>;
  description?: string;
  descriptionFontClass?: FontClass;
  hint?: string;
  hintLengthIndicatorFontClass?: FontClass;
  label?: string | JSX.Element;
  labelFontClass?: FontClass;
  labelTextTransform?: "none" | "uppercase";
  subLabel?: string;
  subLabelFontClass?: FontClass;
};

export default function GenericInput({
  children,
  description,
  descriptionFontClass = FontClass.Body1,
  label,
  labelFontClass = FontClass.TinyLabel,
  labelTextTransform = "none",
  hint,
  hintLengthIndicatorFontClass = FontClass.Body2,
  subLabel,
  subLabelFontClass = FontClass.Body2,
}: Props): JSX.Element {
  return (
    <div style={{ flexGrow: 1 }}>
      {(label != null || subLabel != null) && (
        <div className={styles.labels}>
          {label != null && (
            <BodyText
              className={styles.label}
              colorClass={ColorClass.Secondary}
              fontClass={labelFontClass}
              textTransform={labelTextTransform}
            >
              {label}
            </BodyText>
          )}
          {subLabel != null && (
            <HeaderText
              className={styles.subLabel}
              colorClass={ColorClass.Tertiary}
              fontClass={subLabelFontClass}
            >
              {subLabel}
            </HeaderText>
          )}
        </div>
      )}
      {description != null && (
        <BodyText
          className={styles.description}
          colorClass={ColorClass.Secondary}
          fontClass={descriptionFontClass}
        >
          {description}
        </BodyText>
      )}
      {children}
      {hint != null && (
        <BodyText
          className={styles.hint}
          colorClass={ColorClass.Secondary}
          fontClass={hintLengthIndicatorFontClass}
        >
          {hint}
        </BodyText>
      )}
    </div>
  );
}
