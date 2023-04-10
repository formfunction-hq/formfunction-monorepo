import BodyText from "components/text/BodyText";
import FontClass from "types/enums/FontClass";
import GenericInput from "components/input/GenericInput";
import inputStyles from "css/input/InputStyles.module.css";
import joinClasses from "utils/joinClasses";
import styles from "css/input/TextInput.module.css";
import getStrNumBytes from "utils/getStrNumBytes";
import ColorClass from "types/enums/ColorClass";

type Props = {
  autoFocus?: boolean;
  button?: JSX.Element;
  buttonInner?: JSX.Element;
  className?: string;
  disablePermaPlaceholderGap?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  label?: string;
  labelFontClass?: FontClass;
  labelTextTransform?: "none" | "uppercase";
  maxLength?: number;
  maxLengthIndicator?: boolean;
  onChange: (val: string) => void;
  onPressEnter?: () => void;
  permaPlaceholder?: string | JSX.Element;
  placeholder?: string;
  readOnly?: boolean;
  subLabel?: string;
  value: string;
};

export default function TextInput({
  autoFocus = false,
  button,
  buttonInner,
  className,
  disablePermaPlaceholderGap,
  disabled,
  hasError = false,
  label,
  labelFontClass,
  labelTextTransform = "none",
  maxLength,
  maxLengthIndicator = true,
  onChange,
  onPressEnter,
  permaPlaceholder,
  placeholder,
  readOnly,
  subLabel,
  value,
}: Props): JSX.Element {
  const hint =
    maxLength != null && maxLengthIndicator
      ? `${maxLength - getStrNumBytes(value)} characters left`
      : undefined;

  return (
    <GenericInput
      hint={hint}
      label={label}
      labelFontClass={labelFontClass}
      labelTextTransform={labelTextTransform}
      subLabel={subLabel}
    >
      <div className={styles.container}>
        <div
          className={joinClasses(
            styles.inputContainer,
            permaPlaceholder != null || buttonInner != null
              ? styles.inputContainerButtonInner
              : undefined
          )}
        >
          {permaPlaceholder != null &&
            (typeof permaPlaceholder === "string" ? (
              <BodyText
                colorClass={ColorClass.Ghost}
                fontClass={FontClass.Body1}
              >
                {permaPlaceholder}
              </BodyText>
            ) : (
              permaPlaceholder
            ))}
          <input
            disabled={disabled}
            readOnly={readOnly}
            className={joinClasses(
              inputStyles.textInput,
              className,
              FontClass.Body1,
              hasError ? inputStyles.textInputError : null,
              disabled === true ? inputStyles.disabled : undefined,
              disablePermaPlaceholderGap === true && permaPlaceholder != null
                ? inputStyles.disablePermaPlaceholderGap
                : undefined
            )}
            onChange={(e) => {
              const val = e.target.value;
              if (maxLength != null && getStrNumBytes(val) > maxLength) {
                return;
              }

              onChange(val);
            }}
            onKeyDown={(key) => {
              if (key.code === "Enter" && onPressEnter !== undefined) {
                onPressEnter();
              }
            }}
            ref={(val) => {
              if (autoFocus) {
                setTimeout(() => val?.focus({ preventScroll: true }), 0);
              }
            }}
            placeholder={placeholder}
            type="text"
            value={value}
          />
          {buttonInner ?? button}
        </div>
      </div>
    </GenericInput>
  );
}
