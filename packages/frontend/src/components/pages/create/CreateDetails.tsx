import ButtonWithText from "components/buttons/ButtonWithText";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import TextArea from "components/input/TextArea";
import TextInput from "components/input/TextInput";
import CreateBodyContainer from "components/pages/create/CreateBodyContainer";
import CreateListingPreview from "components/pages/create/CreateListingPreview";
import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import styles from "css/pages/create/CreateDetails.module.css";
import useCreateContext from "hooks/useCreateContext";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import CreateStep from "types/enums/CreateStep";
import FontClass from "types/enums/FontClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import isNumber from "formfn-shared/dist/utils/numbers/isNumber";
import ShowAdvancedButton from "components/buttons/ShowAdvancedButton";
import CreateNftAttributes from "components/pages/create/CreateNftAttributes";
import CreateCreatorSplits from "components/pages/create/CreateCreatorSplits";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import CreateMintType from "types/enums/CreateMintType";
import RadioButtonWithLabel from "components/buttons/RadioButtonWithLabel";
import CreateEditionType from "types/enums/CreateEditionType";
import isPositiveInteger from "utils/isPositiveInteger";
import isValidEditionSupply from "utils/validation/isValidEditionSupply";
import MAX_EDITION_SUPPLY from "constants/MaxEditionSupply";
import NavLink from "components/text/NavLink";
import { MAX_DESCRIPTION_LENGTH } from "constants/MaxLengths";
import CreateNftDisclosures from "components/pages/create/CreateNftDisclosures";

function EditionsInputSection() {
  const {
    editionSupply,
    editionType,
    showErrors,
    setEditionSupply,
    setEditionType,
  } = useCreateNftDetailsContext();

  return (
    <InputWithLabel
      input={
        <>
          <RadioButtonWithLabel
            isActive={editionType === CreateEditionType.LimitedEditions}
            label={
              <NavLink colorClass={ColorClass.Primary}>
                Limited Editions
              </NavLink>
            }
            description={`Set a fixed number of editions that people can buy as instant sales (max ${MAX_EDITION_SUPPLY}).`}
            onClick={() => setEditionType(CreateEditionType.LimitedEditions)}
          />
          <TextInput
            className={styles.editionSupplyInput}
            value={editionSupply != null ? String(editionSupply) : ""}
            maxLength={MAX_EDITION_SUPPLY.toString().length}
            maxLengthIndicator={false}
            hasError={showErrors && !isValidEditionSupply(editionSupply)}
            onChange={(val: string) => {
              if (
                (val !== "" && !isPositiveInteger(val)) ||
                Number(val) > MAX_EDITION_SUPPLY
              ) {
                return;
              }
              setEditionSupply(val === "" ? null : Number(val));
            }}
            placeholder="Set max supply"
          />
          <RadioButtonWithLabel
            isActive={editionType === CreateEditionType.UnlimitedEditions}
            label={
              <NavLink colorClass={ColorClass.Primary}>Open Editions</NavLink>
            }
            description="There is no limit on how many editions can be purchased. You can close the mint whenever you want."
            onClick={() => {
              setEditionType(CreateEditionType.UnlimitedEditions);
              setEditionSupply(null);
            }}
          />
        </>
      }
      label={<InputLabel label="Type of editions" />}
    />
  );
}

export default function CreateDetails(): Maybe<JSX.Element> {
  const { createMintType, step, setNextStep } = useCreateContext();
  const {
    description,
    disableNextButton,
    hasError,
    royalties,
    showErrors,
    title,
    setDescription,
    setRoyalties,
    setShowErrors,
    setTitle,
  } = useCreateNftDetailsContext();
  const isBottomTabsWidth = useIsBottomTabsWidth();

  if (step !== CreateStep.Details) {
    return null;
  }

  return (
    <CreateBodyContainer nextDisabled={disableNextButton}>
      <div className={styles.container}>
        <div className={styles.preview}>
          <CreateListingPreview />
        </div>
        <div className={styles.inputsAndTitle}>
          {!isBottomTabsWidth && (
            <Header2 colorClass={ColorClass.Primary}>NFT details</Header2>
          )}
          <Body1
            className={styles.description}
            colorClass={ColorClass.Secondary}
          >
            Double check all these details—once your NFT has been minted on the
            blockchain, you will not be able to edit this information.
          </Body1>
          <div className={styles.inputs}>
            <InputWithLabel
              input={
                <TextInput
                  hasError={showErrors && title.length === 0}
                  value={title}
                  maxLength={32}
                  onChange={setTitle}
                  placeholder="Title of your piece"
                />
              }
              label={<InputLabel label="Title" />}
            />
            <InputWithLabel
              input={
                <TextArea
                  value={description}
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  onChange={setDescription}
                  placeholder="(Optional) Add a description about your piece"
                  rows={6}
                />
              }
              label={<InputLabel label="Description" />}
            />
            {createMintType === CreateMintType.Editions && (
              <EditionsInputSection />
            )}
            <InputWithLabel
              input={
                <TextInput
                  buttonInner={<Body1 colorClass={ColorClass.Primary}>%</Body1>}
                  value={royalties}
                  onChange={(val) => {
                    if (!isNumber(val) || val.includes(".")) {
                      return;
                    }

                    if (val !== "" && (Number(val) < 0 || Number(val) > 20)) {
                      return;
                    }

                    setRoyalties(val);
                  }}
                  placeholder="5"
                />
              }
              label={
                <InputLabel
                  label="Royalties"
                  subLabel="If someone resells this piece, you'll receive this percentage of the sale. Usually, this is between 5-15%. This number will be shown on this NFT's page."
                />
              }
            />
            <CreateNftDisclosures />
            <ShowAdvancedButton>
              <CreateCreatorSplits />
              <CreateNftAttributes />
            </ShowAdvancedButton>
          </div>
          {!isBottomTabsWidth && (
            <ButtonWithText
              buttonTheme={ButtonTheme.PurpleGradient}
              className={styles.nextButton}
              disabled={disableNextButton}
              fontClass={FontClass.NavLink}
              icon={<ArrowRightIcon colorValue={ColorValue.White} size={20} />}
              onClick={() => {
                if (hasError) {
                  setShowErrors(true);
                } else {
                  setNextStep();
                }
              }}
            >
              Next
            </ButtonWithText>
          )}
        </div>
      </div>
    </CreateBodyContainer>
  );
}
