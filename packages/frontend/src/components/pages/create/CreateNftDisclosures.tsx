import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import TextButton from "components/buttons/TextButton";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import TextInput from "components/input/TextInput";
import FlexBox from "components/layout/FlexBox";
import Body1 from "components/text/Body1";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import useFlagsTyped from "hooks/useFlagsTyped";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import NftDisclosureTypeExpress_enum from "types/relay/NftDisclosureTypeExpress_enum";
import getHumanReadableDisclosureType from "utils/nft/disclosures/getHumanReadableDisclosureType";

function InputForDisclosureType({
  disclosureType,
  placeholder,
  showDetailsInput,
}: {
  disclosureType: NftDisclosureTypeExpress_enum;
  placeholder?: string;
  showDetailsInput: boolean;
}) {
  const { disclosures, dispatchDisclosures } = useCreateNftDetailsContext();
  const disclosure = disclosures.find(
    (disclosureInner) => disclosureInner.type === disclosureType
  );
  const isActive = disclosure?.enabled === true;

  return (
    <CheckboxButtonWithLabel
      enableLabelOnClick={false}
      fontClass={FontClass.Body1}
      isActive={isActive}
      label={
        <FlexBox flexDirection="column" gap={16}>
          <Body1 colorClass={ColorClass.Primary}>
            {getHumanReadableDisclosureType(disclosureType, "long")}
          </Body1>
          {isActive && showDetailsInput && (
            <TextInput
              onChange={(val) =>
                dispatchDisclosures({
                  details: val,
                  disclosureType,
                  type: "set_details",
                })
              }
              placeholder={placeholder}
              value={disclosure.details ?? ""}
            />
          )}
        </FlexBox>
      }
      noBorder
      onClick={() =>
        dispatchDisclosures({
          disclosureType,
          type: isActive ? "disable" : "enable",
        })
      }
      style={{ alignItems: "flex-start" }}
    />
  );
}

export default function CreateNftDisclosures(): JSX.Element {
  const { enableNsfwDisclosure } = useFlagsTyped();

  return (
    <InputWithLabel
      input={
        <FlexBox flexDirection="column" gap={16}>
          <InputForDisclosureType
            disclosureType="AiArt"
            placeholder="Add details on the AI tools or processes used"
            showDetailsInput
          />
          <InputForDisclosureType
            disclosureType="Derivative"
            placeholder="Add details on what this piece is derived from"
            showDetailsInput
          />
          {enableNsfwDisclosure && (
            <InputForDisclosureType
              disclosureType="Nsfw"
              showDetailsInput={false}
            />
          )}
        </FlexBox>
      }
      label={
        <InputLabel
          label="Disclosures"
          subLabel={
            <>
              If this piece was created with AI tools, is a derivative of
              others&apos; artwork, or is NSFW, you must disclose it.{" "}
              <TextButton
                buttonThemeOrColorClass={TextButtonTheme.BrightPurple}
                display="inline"
                fontClass={FontClass.Body2}
                href="https://help.formfunction.xyz/en/articles/5969135-formfunction-community-guidelines"
                type="link_external"
              >
                Learn more about our guidelines.
              </TextButton>
            </>
          }
        />
      }
    />
  );
}
