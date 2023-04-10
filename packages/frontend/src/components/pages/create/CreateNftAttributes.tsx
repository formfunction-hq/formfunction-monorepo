import styles from "css/pages/create/CreateNftAttributes.module.css";
import PlainButton from "components/buttons/PlainButton";
import TextButton from "components/buttons/TextButton";
import PlusIcon from "components/icons/PlusIcon";
import CrossIcon from "components/icons/CrossIcon";
import InputLabel from "components/input/InputLabel";
import TextInput from "components/input/TextInput";
import { MAXIMUM_NFT_ATTRIBUTES_LENGTH } from "formfn-shared/dist/constants/NftAttributesValidationConstants";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import useWindowDimensions from "hooks/useWindowDimensions";
import GlobalClass from "types/enums/GlobalClass";
import isValidTraitType from "formfn-shared/dist/utils/validation/isValidTraitType";
import isValidTraitValue from "formfn-shared/dist/utils/validation/isValidTraitValue";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import useColorModeContext from "hooks/useColorModeContext";

const PLACEHOLDER_CUTOFF_WIDTH = 1160;

export default function CreateNftAttributes() {
  const { width } = useWindowDimensions();
  const {
    showErrors,
    attributes,
    addAttribute,
    setAttributeTraitType,
    setAttributeValue,
    removeAttribute,
  } = useCreateNftDetailsContext();
  const { isDarkMode } = useColorModeContext();

  return (
    <div className={styles.container}>
      <InputLabel
        label="Attributes"
        subLabel="You can optionally add attributes to describe the characteristics of this NFT."
      />
      {attributes.map((attribute, index) => {
        const { id, traitType, value } = attribute;
        return (
          <div key={id} className={styles.attributesInputContainer}>
            <div className={styles.attributeInput}>
              <TextInput
                hasError={
                  showErrors &&
                  traitType === "" &&
                  (value !== "" || attributes.length > 1)
                }
                maxLength={MAXIMUM_NFT_ATTRIBUTES_LENGTH}
                maxLengthIndicator={false}
                value={traitType}
                onChange={(val) => {
                  if (isValidTraitType(val) || val === "") {
                    setAttributeTraitType(val, index);
                  }
                }}
                placeholder={
                  width > PLACEHOLDER_CUTOFF_WIDTH
                    ? "Attribute type (e.g. Color)"
                    : "Attribute type"
                }
              />
            </div>
            <div className={styles.attributeInput}>
              <TextInput
                hasError={
                  showErrors &&
                  value === "" &&
                  (traitType !== "" || attributes.length > 1)
                }
                maxLength={MAXIMUM_NFT_ATTRIBUTES_LENGTH}
                maxLengthIndicator={false}
                value={value}
                onPressEnter={addAttribute}
                onChange={(val) => {
                  if (isValidTraitValue(val) || val === "") {
                    setAttributeValue(val, index);
                  }
                }}
                placeholder={
                  width > PLACEHOLDER_CUTOFF_WIDTH
                    ? "Value (e.g. Blue)"
                    : "Value"
                }
              />
            </div>
            <PlainButton
              className={GlobalClass.HideText}
              onClick={() => removeAttribute(index)}
            >
              <CrossIcon colorValue={ColorValue.Secondary} />
            </PlainButton>
          </div>
        );
      })}
      <TextButton
        onClick={addAttribute}
        fontClass={FontClass.Body1}
        buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
        icon={
          <PlusIcon
            colorValue={
              isDarkMode ? ColorValue.BrightPurple : ColorValue.Purple
            }
          />
        }
      >
        Add an attribute
      </TextButton>
    </div>
  );
}
