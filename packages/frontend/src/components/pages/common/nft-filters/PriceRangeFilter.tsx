import PriceInput from "components/input/PriceInput";
import NftFilterSection from "components/pages/common/nft-filters/NftFilterSection";
import CurrencySelect from "components/select/CurrencySelect";
import SOLANA_CURRENCY_CONFIG from "constants/SolanaCurrencyConfig";
import styles from "css/pages/common/nft-filters/PriceRangeFilter.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useState } from "react";
import CurrencyConfig from "types/CurrencyConfig";
import CurrencyNameExpress_enum from "types/relay/Currency";
import nullIfEmptyStringElseNumber from "utils/nullIfEmptyStringElseNumber";

type Props = {
  currencyConfig: Maybe<CurrencyConfig>;
  currencyNameFromUrlParam: Maybe<CurrencyNameExpress_enum>;
  highPrice: Maybe<number>;
  lowPrice: Maybe<number>;
  setCurrencyConfig: (val: Maybe<CurrencyConfig>) => void;
  setHighPrice: (val: Maybe<number>) => void;
  setLowPrice: (val: Maybe<number>) => void;
};

export default function PriceRangeFilter({
  currencyConfig,
  currencyNameFromUrlParam,
  highPrice,
  lowPrice,
  setCurrencyConfig,
  setHighPrice,
  setLowPrice,
}: Props) {
  const [highPriceInner, setHighPriceInner] = useState(
    highPrice?.toString() ?? ""
  );
  const [lowPriceInner, setLowPriceInner] = useState(
    lowPrice?.toString() ?? ""
  );

  return (
    <NftFilterSection title="Currency & Price">
      <div className={styles.currencySelect}>
        <CurrencySelect
          currencyConfig={currencyConfig}
          defaultCurrencyOnLoad={currencyNameFromUrlParam}
          setCurrencyConfig={(config: Maybe<CurrencyConfig>) => {
            if (config == null) {
              setHighPrice(null);
              setHighPriceInner("");
              setLowPrice(null);
              setLowPriceInner("");
            }
            setCurrencyConfig(config);
          }}
          hasShowAllCurrenciesOption
          fullWidth
        />
      </div>
      <div className={styles.priceInputs}>
        <PriceInput
          currencyConfig={currencyConfig ?? SOLANA_CURRENCY_CONFIG}
          disabled={currencyConfig == null}
          placeholder="Low price"
          price={lowPriceInner}
          setPrice={(price: string) => {
            setLowPriceInner(price);
            setLowPrice(nullIfEmptyStringElseNumber(price));
          }}
          showUsdPrice={false}
        />
        <PriceInput
          currencyConfig={currencyConfig ?? SOLANA_CURRENCY_CONFIG}
          disabled={currencyConfig == null}
          placeholder="High price"
          price={highPriceInner}
          setPrice={(price: string) => {
            setHighPriceInner(price);
            setHighPrice(nullIfEmptyStringElseNumber(price));
          }}
          showUsdPrice={false}
        />
      </div>
    </NftFilterSection>
  );
}
