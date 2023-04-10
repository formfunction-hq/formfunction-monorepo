import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { PriceWithSymbol_Price$key } from "components/price/__generated__/PriceWithSymbol_Price.graphql";
import BodyText from "components/text/BodyText";
import FontClass from "types/enums/FontClass";
import { CSSProperties } from "react";
import PriceWithSymbolText from "components/price/PriceWithSymbolText";

const fragment = graphql`
  fragment PriceWithSymbol_Price on Price {
    ...PriceWithSymbolText_Price
  }
`;

type Props = {
  className?: string;
  colorClass?: ColorClass;
  display?: CSSProperties["display"];
  fontClass?: FontClass | "inherit";
  price: Maybe<PriceWithSymbol_Price$key>;
  textAlign?: "center" | "left" | "right";
};

export default function PriceWithSymbol({
  className,
  colorClass,
  display,
  fontClass,
  price,
  textAlign,
}: Props): Maybe<JSX.Element> {
  const priceData = useFragment(fragment, price);

  if (priceData == null) {
    return null;
  }

  return (
    <BodyText
      className={className}
      colorClass={colorClass ?? ColorClass.Primary}
      display={display}
      fontClass={fontClass ?? FontClass.Price}
      textAlign={textAlign}
    >
      <PriceWithSymbolText price={priceData} />
    </BodyText>
  );
}
