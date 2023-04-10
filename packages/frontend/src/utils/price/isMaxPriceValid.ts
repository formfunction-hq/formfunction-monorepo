import isValidPrice from "utils/price/isValidPrice";

export default function isMaxPriceValid(
  maxPrice: string,
  startingPrice: string,
  decimals: number
): boolean {
  return (
    maxPrice === "" ||
    (isValidPrice(maxPrice, decimals) &&
      isValidPrice(startingPrice, decimals) &&
      Number(maxPrice) >= Number(startingPrice))
  );
}
