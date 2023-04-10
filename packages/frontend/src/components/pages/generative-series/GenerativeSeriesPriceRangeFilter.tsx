import PriceRangeFilter from "components/pages/common/nft-filters/PriceRangeFilter";
import useGenerativeSeriesContext from "hooks/useGenerativeSeriesContext";

export default function GenerativeSeriesPriceRangeFilter() {
  const {
    currencyConfig,
    currencyNameFromUrlParam,
    highPrice,
    lowPrice,
    setCurrencyConfig,
    setHighPrice,
    setLowPrice,
  } = useGenerativeSeriesContext();

  return (
    <PriceRangeFilter
      currencyConfig={currencyConfig}
      currencyNameFromUrlParam={currencyNameFromUrlParam}
      highPrice={highPrice}
      lowPrice={lowPrice}
      setCurrencyConfig={setCurrencyConfig}
      setHighPrice={setHighPrice}
      setLowPrice={setLowPrice}
    />
  );
}
