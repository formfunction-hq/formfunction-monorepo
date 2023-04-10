import styles from "css/input/InputWithSelectedItems.module.css";
import { useRef } from "react";
import FontClass from "types/enums/FontClass";
import joinClasses from "utils/joinClasses";
import ColorClass from "types/enums/ColorClass";
import PlainButton from "components/buttons/PlainButton";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import KeyboardEventKey from "types/enums/KeyboardEventKey";

type Props = {
  hasError?: boolean;
  icon?: JSX.Element;
  inputText: string;
  placeholder: string;
  removeLastItem?: () => void;
  selectedItems: Array<JSX.Element>;
  setInputText: (val: string) => void;
  wrap?: boolean;
};

export default function InputWithSelectedItems({
  hasError = false,
  icon,
  inputText,
  placeholder,
  removeLastItem,
  selectedItems,
  setInputText,
  wrap = false,
}: Props): JSX.Element {
  const inputRef = useRef<Maybe<HTMLInputElement>>(null);

  return (
    <div
      className={joinClasses(
        styles.container,
        hasError ? styles.containerError : null
      )}
    >
      <PlainButton
        className={joinClasses(
          styles.content,
          wrap === true ? styles.wrap : undefined
        )}
        onClick={() => {
          if (inputRef.current != null) {
            inputRef.current.focus();
          }
        }}
      >
        {selectedItems.length === 0 ? icon : selectedItems}
        <input
          className={joinClasses(
            styles.input,
            FontClass.Body1,
            ColorClass.Primary
          )}
          ref={(val) => {
            // If callback ref is not used, we get weird errors.
            // See https://github.com/formfunction-hq/formfn-monorepo/pull/3399 for more info.
            inputRef.current = val;
          }}
          onKeyDown={(e) => {
            if (
              inputText === "" &&
              e.key === KeyboardEventKey.Backspace &&
              removeLastItem != null
            ) {
              removeLastItem();
            }
          }}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={placeholder}
          // If there are any selected items, we want the input to reside on
          // its own line
          style={{ width: selectedItems.length === 0 ? "auto" : "100%" }}
          value={inputText}
        />
      </PlainButton>
    </div>
  );
}
