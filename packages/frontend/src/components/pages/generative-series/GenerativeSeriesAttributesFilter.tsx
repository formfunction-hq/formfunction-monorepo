import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import PlainButton from "components/buttons/PlainButton";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import ChevronUpIcon from "components/icons/ChevronUpIcon";
import NftFilterSection from "components/pages/common/nft-filters/NftFilterSection";
import NavLink from "components/text/NavLink";
import styles from "css/pages/generative-series/GenerativeSeriesAttributesFilter.module.css";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import useGenerativeSeriesContext from "hooks/useGenerativeSeriesContext";
import { useState } from "react";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import intersperseFn from "utils/intersperseFn";

type TraitValue = {
  count: number;
  value: string;
};

export type SelectedTrait = {
  traitName: string;
  traitValue: string;
};

type SingleTrait = {
  traitName: string;
  traitValues: Array<TraitValue>;
};

function TraitValueLabel({ traitValue }: { traitValue: TraitValue }) {
  return (
    <div className={styles.traitValueLabel}>
      <NavLink colorClass={ColorClass.Primary}>{traitValue.value}</NavLink>
      <NavLink colorClass={ColorClass.Secondary} whiteSpace="nowrap">
        {traitValue.count}
      </NavLink>
    </div>
  );
}

function SingleTraitSection({ singleTrait }: { singleTrait: SingleTrait }) {
  const [showValues, setShowValues] = useState(false);
  const { dispatchSelectedTraits, selectedTraits } =
    useGenerativeSeriesContext();

  return (
    <div className={styles.singleTrait}>
      <PlainButton
        className={styles.singleTraitName}
        onClick={() => setShowValues((curr) => !curr)}
      >
        <NavLink colorClass={ColorClass.Primary}>
          {singleTrait.traitName}
        </NavLink>
        {showValues ? (
          <ChevronUpIcon colorValue={ColorValue.Secondary} />
        ) : (
          <ChevronDownIcon colorValue={ColorValue.Secondary} size={24} />
        )}
      </PlainButton>
      {showValues && (
        <div className={styles.singleTraitValues}>
          {singleTrait.traitValues
            .sort(getCompareByProperty("value"))
            .map((traitValue) => {
              const isActive = selectedTraits.some(
                (trait) =>
                  trait.traitName === singleTrait.traitName &&
                  trait.traitValue === traitValue.value
              );
              return (
                <CheckboxButtonWithLabel
                  key={traitValue.value}
                  isActive={isActive}
                  label={<TraitValueLabel traitValue={traitValue} />}
                  onClick={() =>
                    dispatchSelectedTraits({
                      trait: {
                        traitName: singleTrait.traitName,
                        traitValue: traitValue.value,
                      },
                      type: isActive ? "unselect_trait" : "select_trait",
                    })
                  }
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

type Props = {
  traits: Array<SingleTrait>;
};

export default function GenerativeSeriesAttributesFilter({ traits }: Props) {
  const sections = traits.map((trait) => (
    <SingleTraitSection key={trait.traitName} singleTrait={trait} />
  ));

  return (
    <NftFilterSection title="Attributes">
      <div className={styles.sections}>
        {intersperseFn(sections, (index) => (
          <div key={index} className={styles.separator} />
        ))}
      </div>
    </NftFilterSection>
  );
}
