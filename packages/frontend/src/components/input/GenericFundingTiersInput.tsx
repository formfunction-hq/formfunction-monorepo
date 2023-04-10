import graphql from "babel-plugin-relay/macro";
import ButtonWithPopover from "components/buttons/ButtonWithPopover";
import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import FlexBox from "components/layout/FlexBox";
import Body1 from "components/text/Body1";
import useGetElementWidth from "hooks/useGetElementWidth";
import styles from "css/input/GenericFundingTiersInput.module.css";
import { useState } from "react";
import { useFragment } from "react-relay";
import invariant from "tiny-invariant";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import ElementId from "types/enums/ElementId";
import FontClass from "types/enums/FontClass";
import { GenericFundingTiersInput_CampaignFundingTierStandard$key } from "components/input/__generated__/GenericFundingTiersInput_CampaignFundingTierStandard.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const fragment = graphql`
  fragment GenericFundingTiersInput_CampaignFundingTierStandard on CampaignFundingTierStandard
  @relay(plural: true) {
    id
    title
  }
`;

const POPOVER_HORIZONTAL_PADDING = 24 * 2;

function SelectFundingTiersPopoverContent({
  fundingTiers,
  selectedFundingTierIds,
  setSelectedFundingTierIds,
  showAllSupportersOption,
}: {
  fundingTiers: GenericFundingTiersInput_CampaignFundingTierStandard$key;
  selectedFundingTierIds: Set<string>;
  setSelectedFundingTierIds: (val: Set<string>) => void;
  showAllSupportersOption: boolean;
}) {
  const fundingTiersData = useFragment(fragment, fundingTiers);
  invariant(fundingTiersData != null);

  const audienceSelectButtonWidth = useGetElementWidth(
    ElementId.FundingTiersInputButton
  );

  return (
    <FlexBox
      flexDirection="column"
      gap={24}
      width={audienceSelectButtonWidth - POPOVER_HORIZONTAL_PADDING}
    >
      {showAllSupportersOption && (
        <CheckboxButtonWithLabel
          fontClass={FontClass.Body1}
          isActive={selectedFundingTierIds.size === fundingTiersData.length}
          label="All supporters of this project"
          noBorder
          onClick={() => {
            if (selectedFundingTierIds.size === fundingTiersData.length) {
              setSelectedFundingTierIds(new Set());
              return;
            }

            setSelectedFundingTierIds(
              new Set(fundingTiersData.map(({ id }) => id!))
            );
          }}
        />
      )}
      {fundingTiersData.map((fundingTier) => (
        <CheckboxButtonWithLabel
          key={fundingTier.id!}
          fontClass={FontClass.Body1}
          isActive={selectedFundingTierIds.has(fundingTier.id!)}
          label={`Supporters of ${fundingTier.title}`}
          noBorder
          onClick={() => {
            if (selectedFundingTierIds.has(fundingTier.id!)) {
              setSelectedFundingTierIds(
                new Set(
                  Array.from(selectedFundingTierIds).filter(
                    (id) => id !== fundingTier.id
                  )
                )
              );
              return;
            }

            setSelectedFundingTierIds(
              new Set([...Array.from(selectedFundingTierIds), fundingTier.id!])
            );
          }}
        />
      ))}
    </FlexBox>
  );
}

export default function GenericFundingTiersInput({
  buttonText,
  fundingTiers,
  selectedFundingTierIds,
  setSelectedFundingTierIds,
  showAllSupportersOption = true,
}: {
  buttonText: string;
  fundingTiers: Maybe<GenericFundingTiersInput_CampaignFundingTierStandard$key>;
  selectedFundingTierIds: Set<string>;
  setSelectedFundingTierIds: (val: Set<string>) => void;
  showAllSupportersOption?: boolean;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const fundingTiersData = useFragment(fragment, fundingTiers);
  if (fundingTiersData == null || fundingTiersData.length === 0) {
    return (
      <div
        id={ElementId.FundingTiersInputButton}
        className={styles.audienceSelectButton}
      >
        <Body1 colorClass={ColorClass.Primary}>
          You do not have any supporters yet
        </Body1>
        <ChevronDownIcon size={24} colorValue={ColorValue.Primary} />
      </div>
    );
  }

  return (
    <ButtonWithPopover
      className={styles.popover}
      placement="bottom"
      popoverOpen={isPopoverOpen}
      popoverOnOpenChange={(open) => setIsPopoverOpen(open)}
      popoverContent={
        <SelectFundingTiersPopoverContent
          showAllSupportersOption={showAllSupportersOption}
          fundingTiers={fundingTiers!}
          selectedFundingTierIds={selectedFundingTierIds}
          setSelectedFundingTierIds={setSelectedFundingTierIds}
        />
      }
    >
      <div
        id={ElementId.FundingTiersInputButton}
        className={styles.audienceSelectButton}
      >
        <Body1 colorClass={ColorClass.Primary}>{buttonText}</Body1>
        <ChevronDownIcon size={24} colorValue={ColorValue.Primary} />
      </div>
    </ButtonWithPopover>
  );
}
