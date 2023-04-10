import { CandyMachineMintPhase } from "@formfunction-hq/formfunction-candy-machine";
import graphql from "babel-plugin-relay/macro";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import useCandyMachineMintPhase from "hooks/candy-machine/useCandyMachineMintPhase";
import { useCandyMachineMintPrice_CandyMachineExpress$key } from "hooks/candy-machine/__generated__/useCandyMachineMintPrice_CandyMachineExpress.graphql";
import { useFragment } from "react-relay";

const candyMachineFragment = graphql`
  fragment useCandyMachineMintPrice_CandyMachineExpress on CandyMachineExpress {
    allowlistPrice {
      ...PriceWithSymbol_Price
      ...PriceWithSymbolText_Price
      ...BuyNowGenericModal_Price
      ...usePriceCurrencyNameAndAmount_Price
    }
    premintPrice {
      ...PriceWithSymbol_Price
      ...PriceWithSymbolText_Price
      ...BuyNowGenericModal_Price
      ...usePriceCurrencyNameAndAmount_Price
    }
    price {
      ...PriceWithSymbol_Price
      ...PriceWithSymbolText_Price
      ...BuyNowGenericModal_Price
      ...usePriceCurrencyNameAndAmount_Price
    }

    ...useCandyMachineMintPhase_CandyMachineExpress
  }
`;

export default function useCandyMachineMintPrice(
  candyMachine: useCandyMachineMintPrice_CandyMachineExpress$key
) {
  const candyMachineData = useFragment(candyMachineFragment, candyMachine);
  const mintPhase = useCandyMachineMintPhase(candyMachineData);
  const { price, allowlistPrice, premintPrice } = candyMachineData;

  switch (mintPhase) {
    case CandyMachineMintPhase.Premint:
      return premintPrice ?? price;
    case CandyMachineMintPhase.Allowlist:
      return allowlistPrice ?? price;
    case CandyMachineMintPhase.Public:
    case CandyMachineMintPhase.Expired:
      return price;
    default:
      return assertUnreachable(mintPhase);
  }
}
