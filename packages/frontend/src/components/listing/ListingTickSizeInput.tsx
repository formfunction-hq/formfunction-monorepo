import RadioButtonWithLabel from "components/buttons/RadioButtonWithLabel";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import PriceInput from "components/input/PriceInput";
import Body1 from "components/text/Body1";
import DEFAULT_PRICE_INCREMENT_PERCENTAGE from "constants/DefaultPriceIncrementPercentage";
import useListingContext from "hooks/useListingContext";
import CurrencyConfig from "types/CurrencyConfig";
import ColorClass from "types/enums/ColorClass";
import MaxDecimals from "types/enums/MaxDecimals";
import TickSizeType from "types/enums/TickSizeType";
import isValidPrice from "utils/price/isValidPrice";

const TICK_SIZE_LABELS: {
  [key in TickSizeType]: { description: string; title: string };
} = {
  [TickSizeType.Default]: {
    description: `Each new bid must be at least ${DEFAULT_PRICE_INCREMENT_PERCENTAGE}% more than the current highest bid (rounded to nearest 0.1)`,
    title: "Default",
  },
  [TickSizeType.Fixed]: {
    description: `Each new bid must be a fixed amount more than the current highest bid (minimum 0.1)`,
    title: "Fixed",
  },
};

function RadioButtonForTickSize({
  currentTickSizeType,
  setTickSizeType,
  tickSizeTypeForButton,
}: {
  currentTickSizeType: TickSizeType;
  setTickSizeType: (val: TickSizeType) => void;
  tickSizeTypeForButton: TickSizeType;
}) {
  return (
    <RadioButtonWithLabel
      description={TICK_SIZE_LABELS[tickSizeTypeForButton].description}
      isActive={currentTickSizeType === tickSizeTypeForButton}
      label={
        <Body1 colorClass={ColorClass.Primary}>
          {TICK_SIZE_LABELS[tickSizeTypeForButton].title}
        </Body1>
      }
      onClick={() => setTickSizeType(tickSizeTypeForButton)}
    />
  );
}

export default function ListingTickSizeInput({
  currencyConfigOverride,
  setTickSizeConstantInSol,
  setTickSizeType,
  showErrors,
  tickSizeConstantInSol,
  tickSizeType,
}: {
  currencyConfigOverride?: CurrencyConfig;
  setTickSizeConstantInSol: (val: string) => void;
  setTickSizeType: (val: TickSizeType) => void;
  showErrors: boolean;
  tickSizeConstantInSol: string;
  tickSizeType: TickSizeType;
}): JSX.Element {
  const { currencyConfig: listingContextCurrencyConfig } = useListingContext();
  const currencyConfig = currencyConfigOverride ?? listingContextCurrencyConfig;

  return (
    <InputWithLabel
      label={<InputLabel label="Increment size" />}
      input={
        <>
          <RadioButtonForTickSize
            currentTickSizeType={tickSizeType}
            tickSizeTypeForButton={TickSizeType.Default}
            setTickSizeType={setTickSizeType}
          />
          <RadioButtonForTickSize
            currentTickSizeType={tickSizeType}
            tickSizeTypeForButton={TickSizeType.Fixed}
            setTickSizeType={setTickSizeType}
          />
          {tickSizeType === TickSizeType.Fixed && (
            <PriceInput
              currencyConfig={currencyConfig}
              hasError={
                showErrors &&
                !isValidPrice(
                  tickSizeConstantInSol,
                  currencyConfig.decimals,
                  MaxDecimals.TickSize
                )
              }
              maxDecimals={MaxDecimals.TickSize}
              placeholder="Enter tick size"
              price={tickSizeConstantInSol}
              setPrice={setTickSizeConstantInSol}
              showUsdPrice
              showCurrencySymbol
            />
          )}
        </>
      }
    />
  );
}
