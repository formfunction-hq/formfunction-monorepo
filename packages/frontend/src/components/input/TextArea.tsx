import FontClass from "types/enums/FontClass";
import GenericInput from "components/input/GenericInput";
import inputStyles from "css/input/InputStyles.module.css";
import joinClasses from "utils/joinClasses";
import { CSSProperties } from "react";

type Props = {
  button?: JSX.Element;
  className?: string;
  hasError?: boolean;
  label?: string;
  labelFontClass?: FontClass;
  labelTextTransform?: "none" | "uppercase";
  maxLength?: number;
  onChange: (val: string) => void;
  placeholder?: string;
  resize?: CSSProperties["resize"];
  rows?: number;
  value: string;
};

export default function TextArea({
  button,
  className,
  hasError = false,
  label,
  labelFontClass,
  labelTextTransform = "none",
  maxLength,
  onChange,
  placeholder,
  resize = "none",
  rows = 2,
  value,
}: Props): JSX.Element {
  const hint =
    maxLength != null
      ? `${maxLength - (value?.length ?? 0)} characters left`
      : undefined;

  return (
    <GenericInput
      hint={hint}
      label={label}
      labelFontClass={labelFontClass}
      labelTextTransform={labelTextTransform}
    >
      <>
        <div
          className={joinClasses(
            inputStyles.textAreaContainer,
            hasError ? inputStyles.textAreaContainerError : null
          )}
        >
          <textarea
            className={joinClasses(
              inputStyles.textArea,
              className,
              FontClass.Body1
            )}
            maxLength={maxLength}
            onChange={(e) => {
              const val = e.target.value;
              if (maxLength != null && val.length > maxLength) {
                return;
              }

              onChange(val);
            }}
            placeholder={placeholder}
            rows={rows}
            style={{ resize }}
            value={value}
          />
        </div>
        {button}
      </>
    </GenericInput>
  );
}
