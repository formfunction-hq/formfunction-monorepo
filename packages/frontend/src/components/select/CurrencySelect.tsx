import graphql from "babel-plugin-relay/macro";
import CustomSelect from "components/select/CustomSelect";
import Currency from "types/relay/Currency";
import { useLazyLoadQuery } from "react-relay";
import {
  CurrencySelect_Query,
  CurrencySelect_Query$data,
} from "components/select/__generated__/CurrencySelect_Query.graphql";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import ColorValue from "types/enums/ColorValue";
import CurrencyConfig from "types/CurrencyConfig";
import useBreakpoint from "hooks/useBreakpoint";
import { Suspense, useEffect, useState } from "react";
import CurrencySelectSkeleton from "components/select/skeleton/CurrencySelectSkeleton";
import { PublicKey } from "@solana/web3.js";
import invariant from "tiny-invariant";
import useFlagsTyped from "hooks/useFlagsTyped";
import useUserContext from "hooks/useUserContext";

const SHOW_ALL_CURRENCIES_OPTION_VALUE = "" as const;
const SHOW_ALL_CURRENCIES_OPTION = {
  label: "Show all currencies",
  value: SHOW_ALL_CURRENCIES_OPTION_VALUE,
} as const;

type Option = {
  label: string;
  value: Currency | "";
};

function getLabel({
  symbol,
  shortSymbol,
}: {
  shortSymbol: Maybe<string>;
  symbol: string;
}) {
  return `${symbol}${shortSymbol != null ? ` ${shortSymbol}` : ""}`;
}

function getOptionForCurrencyConfig(config: CurrencyConfig) {
  return {
    label: getLabel(config),
    value: config.name as Currency,
  };
}

function getCurrencyDataByName(
  name: MaybeUndef<Currency>,
  data: CurrencySelect_Query["response"]
) {
  return data.Currency.find((c) => c.name === name);
}

function getCurrencyConfigByCurrencyName(
  name: Currency,
  data: CurrencySelect_Query["response"]
) {
  const currencyData = getCurrencyDataByName(name, data)!;
  return {
    decimals: currencyData.decimals,
    mint: new PublicKey(currencyData.mint),
    name: currencyData.name,
    shortSymbol: currencyData.shortSymbol,
    symbol: currencyData.symbol,
  };
}

function getDefaultValue(
  currencyConfig: Maybe<CurrencyConfig>,
  allowedCurrencyNames: MaybeUndef<Array<Currency>>,
  data: CurrencySelect_Query$data
): Option {
  if (allowedCurrencyNames != null && allowedCurrencyNames.length > 0) {
    const nameToUse = allowedCurrencyNames.find(
      (name: Currency) => currencyConfig == null || name === currencyConfig.name
    );
    if (nameToUse == null) {
      // If the currency config is not in the allowed currencies, use the first
      // allowed currency
      return getOptionForCurrencyConfig(
        getCurrencyConfigByCurrencyName(allowedCurrencyNames[0], data)
      );
    }
    return getOptionForCurrencyConfig(
      getCurrencyConfigByCurrencyName(nameToUse, data)
    );
  }

  return currencyConfig != null
    ? getOptionForCurrencyConfig(currencyConfig)
    : SHOW_ALL_CURRENCIES_OPTION;
}

const query = graphql`
  query CurrencySelect_Query {
    Currency {
      decimals
      iconSrc
      name
      shortSymbol
      symbol
      mint
    }
  }
`;

function Content({
  currencyConfig,
  data,
  defaultValue,
  fullWidth,
  hasShowAllCurrenciesOption,
  setCurrencyConfig,
}: {
  currencyConfig: Maybe<CurrencyConfig>;
  data: CurrencySelect_Query["response"];
  defaultValue: MaybeUndef<Option>;
  fullWidth?: boolean;
  hasShowAllCurrenciesOption?: boolean;
  setCurrencyConfig: (config: Maybe<CurrencyConfig>) => void;
}): JSX.Element {
  const { isTabletBreakpoint } = useBreakpoint();

  // https://react-select.com/home#custom-styles
  const singleValueStyles = (iconSrc: MaybeUndef<string>) =>
    iconSrc != null
      ? {
          ":after": {
            background: `center / cover no-repeat url(${iconSrc})`,
            content: '" "',
            display: "block",
            height: 20,
            marginLeft: 8,
            width: 20,
          },
          alignItems: "center",
          color: ColorValue.Primary,
          display: "flex",
        }
      : {
          alignItems: "center",
          color: ColorValue.Primary,
          display: "flex",
        };

  return (
    <CustomSelect
      // To force a reload when `defaultValue` is changed
      key={defaultValue?.value ?? ""}
      showCursor={false}
      customStyles={{
        container: (styles) => ({
          ...styles,
          width: fullWidth === true ? undefined : 140,
        }),
        singleValue: (styles) => {
          const currencyData = getCurrencyDataByName(
            currencyConfig?.name,
            data
          )!;

          return {
            ...styles,
            ...singleValueStyles(
              currencyData == null || currencyData.shortSymbol != null
                ? null
                : currencyData?.iconSrc
            ),
          };
        },
      }}
      defaultValue={defaultValue}
      height={isTabletBreakpoint ? 46 : 58}
      onChange={(selectedOption) => {
        const { value } = selectedOption as Option;
        if (value === SHOW_ALL_CURRENCIES_OPTION_VALUE) {
          setCurrencyConfig(null);
          return;
        }

        setCurrencyConfig(
          getCurrencyConfigByCurrencyName(value as Currency, data)
        );
      }}
      options={[
        ...(hasShowAllCurrenciesOption ? [SHOW_ALL_CURRENCIES_OPTION] : []),
        ...data.Currency.map((c) => ({
          label: getLabel(c),
          value: c.name,
        })),
      ]}
      placeholder=""
    />
  );
}

type Props = {
  // Takes precedence over all other settings
  allowedCurrencyNames?: Array<Currency>;
  currencyConfig: Maybe<CurrencyConfig>;
  defaultCurrencyOnLoad?: Maybe<Currency>;
  fullWidth?: boolean;
  hasShowAllCurrenciesOption?: boolean;
  listingCurrencyAllowlistOverride?: Currency;
  setCurrencyConfig: (config: Maybe<CurrencyConfig>) => void;
};

function DataLoader({
  allowedCurrencyNames,
  currencyConfig,
  defaultCurrencyOnLoad,
  fullWidth,
  hasShowAllCurrenciesOption = false,
  listingCurrencyAllowlistOverride,
  setCurrencyConfig,
}: Props): JSX.Element {
  const data = useLazyLoadQuery<CurrencySelect_Query>(query, {});
  const { currencyAllowlist } = useFlagsTyped();
  const { user } = useUserContext();

  const filteredData = data.Currency.filter(
    // Important that we do === here, since undefined would mean that
    // it is not specified which should default to off
    (currency) => {
      if (allowedCurrencyNames == null) {
        return (
          currency.name === listingCurrencyAllowlistOverride ||
          currencyAllowlist[currency.name] === null ||
          currencyAllowlist[currency.name]?.includes(user?.id ?? "")
        );
      }

      return allowedCurrencyNames.includes(currency.name);
    }
  );

  const defaultValueInit = getDefaultValue(
    currencyConfig,
    allowedCurrencyNames,
    data
  );
  const [defaultValue, setDefaultValue] =
    useState<MaybeUndef<Option>>(defaultValueInit);

  useEffect(() => {
    // TODO[@arcticmatt] this logic is kinda jank, should refactor
    if (defaultValueInit.value !== "") {
      // If the currency config is not in the allowed currencies, we need
      // to modify it to be valid.
      setCurrencyConfig(
        getCurrencyConfigByCurrencyName(defaultValueInit.value, data)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  invariant(
    (hasShowAllCurrenciesOption === false && currencyConfig != null) ||
      hasShowAllCurrenciesOption === true
  );

  useEffect(() => {
    if (data == null) {
      return;
    }

    if (defaultCurrencyOnLoad != null) {
      const config = getCurrencyConfigByCurrencyName(
        defaultCurrencyOnLoad,
        data
      );
      setCurrencyConfig(config);
      setDefaultValue(getOptionForCurrencyConfig(config));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, defaultCurrencyOnLoad]);

  return (
    <Content
      currencyConfig={currencyConfig}
      data={{ Currency: filteredData }}
      defaultValue={defaultValue}
      fullWidth={fullWidth}
      hasShowAllCurrenciesOption={hasShowAllCurrenciesOption}
      setCurrencyConfig={setCurrencyConfig}
    />
  );
}

export default function CurrencySelect({
  allowedCurrencyNames,
  currencyConfig,
  defaultCurrencyOnLoad,
  fullWidth,
  hasShowAllCurrenciesOption,
  listingCurrencyAllowlistOverride,
  setCurrencyConfig,
}: Props): JSX.Element {
  return (
    <Suspense fallback={<CurrencySelectSkeleton />}>
      <DataLoader
        allowedCurrencyNames={allowedCurrencyNames}
        currencyConfig={currencyConfig}
        defaultCurrencyOnLoad={defaultCurrencyOnLoad}
        fullWidth={fullWidth}
        hasShowAllCurrenciesOption={hasShowAllCurrenciesOption}
        listingCurrencyAllowlistOverride={listingCurrencyAllowlistOverride}
        setCurrencyConfig={setCurrencyConfig}
      />
    </Suspense>
  );
}
