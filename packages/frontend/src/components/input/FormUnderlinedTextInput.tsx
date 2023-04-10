import BodyText from "components/text/BodyText";
import FontClass from "types/enums/FontClass";
import { UseFormRegisterReturn } from "react-hook-form";
import joinClasses from "utils/joinClasses";
import styles from "css/input/UnderlinedTextInput.module.css";
import ColorClass from "types/enums/ColorClass";

type Props = {
  className?: string;
  hasError?: boolean;
  label: string;
  maxLength?: number;
  permaPlaceholder?: string;
  placeholder?: string;
  registerResult: UseFormRegisterReturn;
};

export default function FormUnderlinedTextInput({
  className,
  hasError = false,
  label,
  maxLength,
  permaPlaceholder,
  placeholder = "",
  registerResult,
}: Props): JSX.Element {
  return (
    <div>
      <BodyText colorClass={ColorClass.Primary} fontClass={FontClass.Body2}>
        {label}
      </BodyText>
      <div className={styles.container}>
        {permaPlaceholder && (
          <BodyText
            className={styles.permaPlaceholder}
            colorClass={ColorClass.Ghost}
            fontClass={FontClass.Body1}
          >
            {permaPlaceholder}
          </BodyText>
        )}
        <input
          {...registerResult}
          className={joinClasses(
            styles.input,
            FontClass.Body1,
            hasError ? styles.inputError : null,
            className
          )}
          maxLength={maxLength}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
