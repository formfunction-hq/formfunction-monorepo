import styles from "css/pages/campaign/basic-info/CampaignGoalInput.module.css";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import CurrencySelect from "components/select/CurrencySelect";
import PriceInput from "components/input/PriceInput";
import CurrencyConfig from "types/CurrencyConfig";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useBreakpoint from "hooks/useBreakpoint";

type Props = {
  currencyConfig: CurrencyConfig;
  hasError: boolean;
  price: string;
  setCurrencyConfig: (currencyConfig: Maybe<CurrencyConfig>) => void;
  setPrice: (val: string) => void;
};

export default function CampaignGoalInput({
  price,
  currencyConfig,
  setPrice,
  hasError,
  setCurrencyConfig,
}: Props) {
  const { isMobileBreakpoint } = useBreakpoint();

  return (
    <InputWithLabel
      label={
        <InputLabel
          label="Campaign goal"
          subLabel="All NFTs you add to this campaign must be listed in the currency you select here."
        />
      }
      input={
        <div className={styles.inputs}>
          <CurrencySelect
            allowedCurrencyNames={["Solana", "UsdCoin"]}
            currencyConfig={currencyConfig}
            setCurrencyConfig={setCurrencyConfig}
          />
          <PriceInput
            hasError={hasError}
            currencyConfig={currencyConfig}
            placeholder={
              isMobileBreakpoint ? "Enter price" : "Enter your price"
            }
            price={price}
            setPrice={setPrice}
            showUsdPrice
          />
        </div>
      }
    />
  );
}
