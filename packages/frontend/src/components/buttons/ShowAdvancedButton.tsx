import TextButton from "components/buttons/TextButton";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import ChevronRightIcon from "components/icons/ChevronRightIcon";
import { useState } from "react";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";

type Props = {
  children: any;
};

export default function ShowAdvancedButton({ children }: Props): JSX.Element {
  const [isAdvancedShown, setIsAdvancedShown] = useState(false);
  return (
    <>
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Primary}
        fontClass={FontClass.Body1Medium}
        icon={
          isAdvancedShown ? (
            <ChevronDownIcon colorValue={ColorValue.Primary} size={24} />
          ) : (
            <ChevronRightIcon colorValue={ColorValue.Primary} />
          )
        }
        iconPosition="right"
        onClick={() => setIsAdvancedShown(!isAdvancedShown)}
      >
        {isAdvancedShown ? "Hide" : "Show"} Advanced
      </TextButton>
      {isAdvancedShown && children}
    </>
  );
}
