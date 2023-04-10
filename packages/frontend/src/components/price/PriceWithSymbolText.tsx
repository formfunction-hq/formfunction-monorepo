import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useFormattedNftPrice from "hooks/useFormattedNftPrice";
import useNftPriceSymbol from "hooks/useNftPriceSymbol";
import { PriceWithSymbolText_Price$key } from "components/price/__generated__/PriceWithSymbolText_Price.graphql";

const fragment = graphql`
  fragment PriceWithSymbolText_Price on Price {
    ...useFormattedNftPrice_Price
    ...useNftPriceSymbol_Price
  }
`;

type Props = {
  price: Maybe<PriceWithSymbolText_Price$key>;
};

export default function PriceWithSymbolText({
  price,
}: Props): Maybe<JSX.Element> {
  const priceData = useFragment(fragment, price);
  const priceFormatted = useFormattedNftPrice(priceData);
  const { shortSymbol, symbol } = useNftPriceSymbol(priceData) || {};

  if (priceData == null) {
    return null;
  }

  return (
    <>
      {priceFormatted} {shortSymbol ?? symbol ?? null}
    </>
  );
}
