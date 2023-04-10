import assertUnreachable from "utils/assertUnreachable";
import invariant from "tiny-invariant";
import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";

// Narrows a Union type base on N
// See https://stackoverflow.com/a/50499316/3923882 for more info
type NarrowUnion<T, N> = T extends { priceFunctionType: N } ? T : never;

interface ConstantParams {
  priceFunctionType: PriceFunctionType.Constant;
}

interface LinearParams {
  maxPriceInLamports?: number;
  priceFunctionType: PriceFunctionType.Linear;
  priceIncrementInLamports: number;
}

type ParamsUnion = ConstantParams | LinearParams;

export default function parseEditionPriceParams<
  N extends ParamsUnion["priceFunctionType"]
>(
  priceFunctionType: N,
  priceParams: ReadonlyArray<number>
): NarrowUnion<ParamsUnion, N> {
  switch (priceFunctionType) {
    case PriceFunctionType.Constant:
      // Can't get this to work without any
      return { priceFunctionType } as any;
    case PriceFunctionType.Linear:
      invariant(priceParams.length >= 1);
      // Can't get this to work without any
      return {
        maxPriceInLamports: priceParams.length > 1 ? priceParams[1] : undefined,
        priceFunctionType,
        priceIncrementInLamports: priceParams[0],
      } as any;
    default:
      return assertUnreachable(priceFunctionType);
  }
}
