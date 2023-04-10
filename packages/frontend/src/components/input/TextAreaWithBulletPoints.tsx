import FormTextArea from "components/input/FormTextArea";
import { useRef, KeyboardEvent, MutableRefObject } from "react";
import KeyboardEventKey from "types/enums/KeyboardEventKey";
import { Maybe } from "graphql/jsutils/Maybe";
import { UseFormRegisterReturn } from "react-hook-form";

export const BULLET_STRING = "• ";

export function getDefaultValueWithBulletPoints(
  benefits: ReadonlyArray<string>
) {
  const benefitsCopy = [...benefits];
  if (
    benefitsCopy[0] != null &&
    benefitsCopy[0].length >= 2 &&
    benefitsCopy[0].slice(0, 2) !== BULLET_STRING
  ) {
    benefitsCopy[0] = BULLET_STRING + benefitsCopy[0];
  }
  return benefitsCopy.join(`\n${BULLET_STRING}`);
}

export function removeBulletPoints(benefits: string) {
  const removedFirstBulletBenefits =
    benefits.length >= 2 && benefits.slice(0, 2) === BULLET_STRING
      ? benefits.slice(2)
      : benefits;
  return removedFirstBulletBenefits.split(`\n${BULLET_STRING}`);
}

function checkKeyboardEventKey(event: KeyboardEvent): Maybe<KeyboardEventKey> {
  const key = KeyboardEventKey[event.key as KeyboardEventKey];
  if (key != null) {
    return key;
  }
  return null;
}

function insertBulletsOnKeyDown(
  setValue: (value: string) => void,
  benefitsInputRef: MutableRefObject<HTMLTextAreaElement | null>
) {
  return (event: any) => {
    const { value, selectionStart, selectionEnd } = event.target;
    const eventKey = checkKeyboardEventKey(event);
    const newValueOnEnterWithSelection = `${value.slice(
      0,
      selectionStart
    )}\n${BULLET_STRING}${value.slice(selectionEnd, value.length)}`;

    // event.preventDefault is only invoked if we want to override the normal typing behavior. It should not be called all the time.
    switch (eventKey) {
      case KeyboardEventKey.Backspace:
        // If bulletString is the the last two characaters then just delete both at once.
        if (value.length === 2 && value === BULLET_STRING) {
          event.preventDefault();
          setValue("");
          return;
        }

        // Do nothing if there is still text in the first line but they're trying to delete bullet point
        if (
          selectionStart === selectionEnd &&
          selectionStart === 2 &&
          value.length > 2 &&
          value.slice(0, 2) === BULLET_STRING &&
          value.slice(0, 3) !== `${BULLET_STRING}\n`
        ) {
          event.preventDefault();
          return;
        }
        // If selectionStart is at the very end and bulletString is the last character before a new line
        // then backspacing will remove the bulletString and new line all at once. Its for QOL
        if (
          selectionStart === selectionEnd &&
          value.substring(selectionStart - 3, selectionStart) ===
            `\n${BULLET_STRING}`
        ) {
          event.preventDefault();
          const newStartingIndex = selectionStart - 3;
          const valueCopy = `${value.slice(0, newStartingIndex)}${value.slice(
            selectionStart,
            value.length
          )}`;
          setValue(valueCopy);
          benefitsInputRef?.current?.setSelectionRange(
            newStartingIndex,
            newStartingIndex
          );
        }
        break;
      case KeyboardEventKey.Enter:
        // If the first key you press is enter, it will insert a bullet string instead of a new line
        if (value.length === 0) {
          event.preventDefault();

          setValue(BULLET_STRING);
          return;
        }

        // If your cursor is at the very end of the text and you press enter, it will append a new line
        // along with a bullet string.
        if (selectionStart === value.length) {
          event.preventDefault();

          setValue(`${value}\n${BULLET_STRING}`);
          return;
        }

        // This means your cursor is somewhere in the middle of the text when you pressed enter
        // We will just split up your text based on where your cursor is then add a bullet point
        event.preventDefault();

        setValue(newValueOnEnterWithSelection);
        // This will set the cursor to the same old location as you were at before.
        benefitsInputRef?.current?.setSelectionRange(
          selectionStart + 3,
          selectionStart + 3
        );
        return;

      default:
        // This will add a bullet string if you're typing your first character.
        if (value.length === 0 && event.key.length === 1) {
          event.preventDefault();

          if (event.key === " ") {
            setValue(BULLET_STRING);
          } else {
            setValue(`${BULLET_STRING}${event.key}`);
          }
        }
    }
  };
}

type Props = {
  placeholder: string;
  registeredFormField: UseFormRegisterReturn<"benefits" | "options">;
  setValue: (value: string) => void;
  value: string;
};

export default function TextAreaWithBulletPoints({
  value,
  setValue,
  registeredFormField,
  placeholder,
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const customRegisterResult = {
    ...registeredFormField,
    onKeyDown: insertBulletsOnKeyDown(setValue, inputRef),
    ref: (e: HTMLTextAreaElement) => {
      if (e != null) {
        if (registeredFormField) {
          registeredFormField.ref(e);
        }
        inputRef.current = e;
      }
    },
  };

  return (
    <FormTextArea
      placeholder={placeholder}
      registerResult={customRegisterResult}
      rows={4}
      value={value}
    />
  );
}
