import graphql from "babel-plugin-relay/macro";
import useFormattedNftPrice from "hooks/useFormattedNftPrice";
import InputWithLabel from "components/input/InputWithLabel";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import useNftPriceSymbol from "hooks/useNftPriceSymbol";
import PriceInput from "components/input/PriceInput";
import { BuyEditionModalPriceInput_Price$key } from "components/modal/__generated__/BuyEditionModalPriceInput_Price.graphql";
import useExchangeRatesContext from "hooks/useExchangeRatesContext";
import { useFragment } from "react-relay";
import useGetCurrencyConfigForPrice from "hooks/useGetCurrencyConfigForPrice";

const fragment = graphql`
  fragment BuyEditionModalPriceInput_Price on Price {
    currencyInfo {
      name
    }

    ...PriceWithSymbol_Price
    ...useGetCurrencyConfigForPrice_Price
    ...useFormattedNftPrice_Price
    ...useNftPriceSymbol_Price
  }
`;

type Props = {
  chosenPrice: string;
  price: BuyEditionModalPriceInput_Price$key;
  setChosenPrice: (val: string) => void;
};

export default function BuyEditionModalPriceInput({
  chosenPrice,
  price,
  setChosenPrice,
}: Props): JSX.Element {
  const { priceToUsd } = useExchangeRatesContext();
  const priceData = useFragment(fragment, price);
  const currencyConfig = useGetCurrencyConfigForPrice(priceData);
  const formattedPrice = useFormattedNftPrice(priceData);
  const { shortSymbol, symbol } = useNftPriceSymbol(priceData);
  const usdPrice = priceToUsd(
    Number(formattedPrice),
    priceData?.currencyInfo.name ?? "Solana"
  );

  return (
    <InputWithLabel
      label={
        <Body2 colorClass={ColorClass.Primary}>
          You can pay at or above the minimum price of {formattedPrice}{" "}
          {shortSymbol ?? symbol} (~$
          {usdPrice} USD)
        </Body2>
      }
      input={
        <PriceInput
          currencyConfig={currencyConfig}
          price={chosenPrice}
          setPrice={setChosenPrice}
          showCurrencySymbol
          showUsdPrice
        />
      }
    />
  );
}
