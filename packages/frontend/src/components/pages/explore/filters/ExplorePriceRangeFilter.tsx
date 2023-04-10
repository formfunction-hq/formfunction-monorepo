import PriceRangeFilter from "components/pages/common/nft-filters/PriceRangeFilter";
import useExploreContext from "hooks/useExploreContext";

export default function ExplorePriceRangeFilter() {
  const {
    currencyConfig,
    currencyNameFromUrlParam,
    highPrice,
    lowPrice,
    setCurrencyConfig,
    setHighPrice,
    setLowPrice,
  } = useExploreContext();

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
