import { useGetCurrencyConfigForPrice_Price$key } from "hooks/__generated__/useGetCurrencyConfigForPrice_Price.graphql";
import { useFragment } from "react-relay";
import CurrencyConfig from "types/CurrencyConfig";
import graphql from "babel-plugin-relay/macro";
import useGetCurrencyConfigForCurrencyExpress from "hooks/useGetCurrencyConfigForCurrencyExpress";

const fragment = graphql`
  fragment useGetCurrencyConfigForPrice_Price on Price {
    currencyInfo {
      ...useGetCurrencyConfigForCurrencyExpress_CurrencyExpress
    }
  }
`;

export default function useGetCurrencyConfigForPrice(
  price: useGetCurrencyConfigForPrice_Price$key
): CurrencyConfig {
  const priceData = useFragment(fragment, price);
  return useGetCurrencyConfigForCurrencyExpress(priceData.currencyInfo);
}
