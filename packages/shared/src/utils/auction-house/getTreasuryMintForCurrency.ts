import { PublicKey } from "@solana/web3.js";
import { WRAPPED_SOL_MINT } from "constants/SolanaConstants";
import Currency from "types/enums/Currency";
import Environment from "types/Environment";
import assertUnreachable from "utils/assertUnreachable";

export default function getTreasuryMintForCurrency(
  environment: Environment,
  currency: Currency
): PublicKey {
  // Special case, same for all environments
  if (currency === Currency.Solana) {
    return WRAPPED_SOL_MINT;
  }

  switch (environment) {
    case Environment.Production:
      switch (currency) {
        case Currency.Ash:
          // https://explorer.solana.com/address/ASHTTPcMddo7RsYHEyTv3nutMWvK8S4wgFUy3seAohja
          return new PublicKey("ASHTTPcMddo7RsYHEyTv3nutMWvK8S4wgFUy3seAohja");
        case Currency.Bonk:
          // https://explorer.solana.com/address/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263
          return new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263");
        case Currency.UsdCoin:
          // https://explorer.solana.com/address/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
          return new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
        case Currency.FamousFoxFederation:
          // https://explorer.solana.com/address/FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq
          return new PublicKey("FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq");
        case Currency.Particles:
          // https://explorer.solana.com/address/BDNRJZ6MA3YRhHcewYMjRDEc7oWQCxHknXU98wwTsSxu
          return new PublicKey("BDNRJZ6MA3YRhHcewYMjRDEc7oWQCxHknXU98wwTsSxu");
        case Currency.SkeletonCrew:
          // https://explorer.solana.com/address/SKu11EypaFU3gvr8VSAbi13zEC2CPvqbz9s83N3tWHM
          return new PublicKey("SKu11EypaFU3gvr8VSAbi13zEC2CPvqbz9s83N3tWHM");
        default:
          return assertUnreachable(currency);
      }
    // NOTE: for all environments that are not production, we just use the same
    // dummy SPL token as defined in the link below
    case Environment.Development:
    case Environment.Local:
    case Environment.Testnet:
      switch (currency) {
        case Currency.Ash:
        case Currency.Bonk:
        case Currency.UsdCoin:
        case Currency.FamousFoxFederation:
        case Currency.Particles:
        case Currency.SkeletonCrew:
          // https://spl-token-faucet.com/
          return new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");
        default:
          return assertUnreachable(currency);
      }
    default:
      return assertUnreachable(environment);
  }
}
