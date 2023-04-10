import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import CurrencyNameExpress_enum from "types/relay/Currency";
import { usePriceCurrencyNameAndAmount_Price$key } from "hooks/candy-machine/__generated__/usePriceCurrencyNameAndAmount_Price.graphql";

const fragment = graphql`
  fragment usePriceCurrencyNameAndAmount_Price on Price {
    amount
    currencyInfo {
      name
    }
  }
`;

export default function usePriceCurrencyNameAndAmount(
  price: usePriceCurrencyNameAndAmount_Price$key
): { amount: number; name: CurrencyNameExpress_enum } {
  const { amount, currencyInfo } = useFragment(fragment, price);
  return { amount, name: currencyInfo.name };
}
