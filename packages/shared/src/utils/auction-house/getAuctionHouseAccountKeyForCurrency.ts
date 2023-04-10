import { PublicKey } from "@solana/web3.js";
import Currency from "types/enums/Currency";
import Environment from "types/Environment";
import assertUnreachable from "utils/assertUnreachable";

export default function getAuctionHouseAccountKeyForCurrency(
  environment: Environment,
  currency: Currency
): PublicKey {
  switch (environment) {
    case Environment.Production:
      switch (currency) {
        case Currency.Ash:
          return new PublicKey("FAEXa6G1yZJhzon572CXKac6oM7vEFDKtd4UVnwoV8XA");
        case Currency.Bonk:
          return new PublicKey("CfyQQDi7hhAgnQVgXyMTTTBV2nEt8TbPkgLMbM6G5GEV");
        case Currency.Solana:
          return new PublicKey("u5pLTMPar2nvwyPPVKbJ3thqfv7hPADdn3eR8zo1Q2M");
        case Currency.UsdCoin:
          return new PublicKey("3TPU8SuKEghJgE1EBcbZgVfQKAFoAPkc1NfHDZYJyF77");
        case Currency.FamousFoxFederation:
          return new PublicKey("4QZDroaPxHMJmR3ByWHz1QeLAkSRC68gQ2u4G3wrtd2T");
        case Currency.Particles:
          return new PublicKey("HtsczT1hN9SdPPiLCt8k8dRUhPLhqc3tcSMu4n6uYFw2");
        case Currency.SkeletonCrew:
          return new PublicKey("GVoQ2aXF4beQwc2AmPJyiSKcaHbyphn1GsPD43yyxPtx");
        default:
          return assertUnreachable(currency);
      }
    // NOTE: for all environments other than prod, we just use the same auction house
    // for SPL tokens as they have no practical difference.
    case Environment.Development:
    case Environment.Local:
      switch (currency) {
        case Currency.Solana:
          return new PublicKey("DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN");
        case Currency.Ash:
        case Currency.Bonk:
        case Currency.UsdCoin:
        case Currency.FamousFoxFederation:
        case Currency.Particles:
        case Currency.SkeletonCrew:
          return new PublicKey("CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs");
        default:
          return assertUnreachable(currency);
      }
    case Environment.Testnet:
      switch (currency) {
        case Currency.Solana:
          return new PublicKey("BnYmzPQitxZ3Q736LrC25bcvBN8hPLth1q3z4JJxyY7s");
        case Currency.Ash:
        case Currency.Bonk:
        case Currency.UsdCoin:
        case Currency.FamousFoxFederation:
        case Currency.Particles:
        case Currency.SkeletonCrew:
          return new PublicKey("CDNhFyynrvPSDgKqttX6QoSLTAPeEbgZMG7FJSGWkaLk");
        default:
          return assertUnreachable(currency);
      }
    default:
      return assertUnreachable(environment);
  }
}
