export default function shouldClearPnftId(
  primarySaleHappened: boolean,
  transactionType: "Sold" | "SoldAcceptedOffer" | "SoldInstantSale"
) {
  return !primarySaleHappened && transactionType === "SoldAcceptedOffer";
}
