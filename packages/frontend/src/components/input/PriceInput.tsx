import TextInput from "components/input/TextInput";
import Body1 from "components/text/Body1";
import useExchangeRatesContext from "hooks/useExchangeRatesContext";
import ColorClass from "types/enums/ColorClass";
import styles from "css/input/PriceInput.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import isValidPriceInput from "utils/price/isValidPriceInput";
import MaxDecimals from "types/enums/MaxDecimals";
import Currency from "types/relay/Currency";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import CurrencyConfig from "types/CurrencyConfig";

const DEFAULT_PLACEHOLDER_DESKTOP = "Enter your price";
const DEFAULT_PLACEHOLDER_MOBILE = "Enter price";

type Props = {
  currencyConfig: CurrencyConfig;
  disabled?: boolean;
  hasError?: boolean;
  maxDecimals?: MaxDecimals;
  placeholder?: string;
  price: string;
  setPrice: (val: string) => void;
  showCurrencySymbol?: boolean;
  showUsdPrice?: boolean;
};

const CURRENCY_TO_CLASSNAME: Record<Currency, string> = {
  Ash: styles.priceInputAshPadding,
  Bonk: styles.priceInputBonkPadding,
  FamousFoxFederation: styles.priceInputFoxyPadding,
  Particles: styles.priceInputParticlesPadding,
  [RELAY_FUTURE_ADDED_VALUE]: "",
  SkeletonCrew: styles.priceInputSkeletonCrewPadding,
  Solana: styles.priceInputSolPadding,
  UsdCoin: styles.priceInputUsdcPadding,
};

export default function PriceInput({
  currencyConfig,
  disabled,
  hasError,
  maxDecimals = MaxDecimals.Price,
  placeholder,
  price,
  setPrice,
  showCurrencySymbol = false,
  showUsdPrice = true,
}: Props): JSX.Element {
  const { priceToUsd } = useExchangeRatesContext();
  const { width } = useWindowDimensions();

  const usd = priceToUsd(Number(price), currencyConfig.name);

  const usdPrice =
    usd != null ? (
      <Body1 className={styles.usdPrice} colorClass={ColorClass.Secondary}>
        {price.length === 0 || Number.isNaN(Number(price))
          ? "~ USD"
          : `~$${usd} USD`}
      </Body1>
    ) : null;

  return (
    <TextInput
      className={
        showCurrencySymbol === true
          ? CURRENCY_TO_CLASSNAME[currencyConfig.name]
          : undefined
      }
      disabled={disabled}
      buttonInner={showUsdPrice && usdPrice != null ? usdPrice : undefined}
      hasError={hasError}
      value={price}
      onChange={(val) => {
        if (!isValidPriceInput(val, maxDecimals, currencyConfig.decimals)) {
          return;
        }

        setPrice(val);
      }}
      permaPlaceholder={
        showCurrencySymbol === true ? (
          <Body1
            colorClass={ColorClass.Secondary}
            className={styles.priceSymbol}
          >
            {currencyConfig.shortSymbol ?? currencyConfig.symbol}
          </Body1>
        ) : undefined
      }
      placeholder={
        placeholder != null
          ? placeholder
          : width < 800
          ? DEFAULT_PLACEHOLDER_MOBILE
          : DEFAULT_PLACEHOLDER_DESKTOP
      }
    />
  );
}
