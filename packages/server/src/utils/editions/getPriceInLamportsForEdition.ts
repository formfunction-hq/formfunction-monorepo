import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { PriceFunctionTypeExpress_Enum } from "src/__generated__/generated";
import parseEditionPriceParams from "formfn-shared/dist/utils/price/parseEditionPriceParams";
import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";

/**
 * IMPORTANT: keep in sync with get_price_for_edition in auction house program
 *
 * TODO[@arcticmatt][auctionHouse] auction house SDK should export this
 */
export default function getPriceInLamportsForEdition(
  // Starts at 1
  edition: number,
  priceFunctionType: PriceFunctionTypeExpress_Enum,
  priceParamsRaw: Array<number>,
  startingPriceInLamports: number
): number {
  switch (priceFunctionType) {
    case PriceFunctionTypeExpress_Enum.Constant:
    case PriceFunctionTypeExpress_Enum.Minimum:
      return startingPriceInLamports;
    case PriceFunctionTypeExpress_Enum.Linear: {
      const priceParams = parseEditionPriceParams(
        PriceFunctionType.Linear,
        priceParamsRaw
      );
      const maxPriceInLamports =
        priceParams.maxPriceInLamports ?? Number.MAX_SAFE_INTEGER;
      return Math.min(
        startingPriceInLamports +
          (edition - 1) * priceParams.priceIncrementInLamports,
        maxPriceInLamports
      );
    }
    default:
      return assertUnreachable(priceFunctionType);
  }
}
