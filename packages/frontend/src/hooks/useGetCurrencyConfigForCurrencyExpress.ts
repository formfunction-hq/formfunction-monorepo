import { useFragment } from "react-relay";
import CurrencyConfig from "types/CurrencyConfig";
import graphql from "babel-plugin-relay/macro";
import { PublicKey } from "@solana/web3.js";
import { useGetCurrencyConfigForCurrencyExpress_CurrencyExpress$key } from "hooks/__generated__/useGetCurrencyConfigForCurrencyExpress_CurrencyExpress.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import SOLANA_CURRENCY_CONFIG from "constants/SolanaCurrencyConfig";

const fragment = graphql`
  fragment useGetCurrencyConfigForCurrencyExpress_CurrencyExpress on CurrencyExpress {
    decimals
    symbol
    shortSymbol
    name
    mint
  }
`;

export default function useGetCurrencyConfigForCurrencyExpress(
  currency: Maybe<useGetCurrencyConfigForCurrencyExpress_CurrencyExpress$key>
): CurrencyConfig {
  const currencyData = useFragment(fragment, currency);
  if (currencyData == null) {
    return SOLANA_CURRENCY_CONFIG;
  }

  const { decimals, symbol, shortSymbol, name, mint } = currencyData;

  return { decimals, mint: new PublicKey(mint), name, shortSymbol, symbol };
}
