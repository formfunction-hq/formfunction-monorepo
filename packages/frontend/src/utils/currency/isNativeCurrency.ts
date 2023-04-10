import Currency from "types/relay/Currency";

export default function isNativeCurrency(currency: Currency) {
  return currency === "Solana";
}
