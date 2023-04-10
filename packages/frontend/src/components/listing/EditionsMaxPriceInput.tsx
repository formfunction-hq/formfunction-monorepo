import ToggleButton from "components/buttons/ToggleButton";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import PriceInput from "components/input/PriceInput";
import CurrencyConfig from "types/CurrencyConfig";

type Props = {
  currencyConfig: CurrencyConfig;
  hasError?: boolean;
  isMaxPriceEnabled: boolean;
  price: string;
  setIsMaxPriceEnabled: (val: boolean) => void;
  setPrice: (val: string) => void;
};

export default function EditionsMaxPriceInput({
  currencyConfig,
  hasError,
  isMaxPriceEnabled,
  price,
  setIsMaxPriceEnabled,
  setPrice,
}: Props) {
  return (
    <InputWithLabel
      label={
        <InputLabel
          label="Max price"
          subLabel="If you set a max price, the price will no longer increase upon reaching the specified price."
        />
      }
      input={
        <>
          <ToggleButton
            label="Enable"
            enabled={isMaxPriceEnabled}
            onChange={setIsMaxPriceEnabled}
          />
          {isMaxPriceEnabled && (
            <PriceInput
              hasError={hasError}
              placeholder="Enter max price"
              price={price}
              setPrice={setPrice}
              currencyConfig={currencyConfig}
              showUsdPrice
              showCurrencySymbol
            />
          )}
        </>
      }
    />
  );
}
