import { SeverityLevel } from "@sentry/node";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import retryFn from "src/utils/solana/rpc/retryFn";
import {
  Metaplex,
  Nft,
  NftEdition,
  NftOriginalEdition,
  NftPrintEdition,
} from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";

export default class AccountLoader {
  static async loadEditionAccount(
    mint: PublicKeyOrString,
    severity: SeverityLevel = "error"
  ): Promise<Maybe<NftEdition>> {
    try {
      const account = await retryFn(
        async (connection) => {
          const metaplex = new Metaplex(connection);
          const nft = (await metaplex
            .nfts()
            .findByMint({ mintAddress: new PublicKey(mint) })) as Nft;
          return nft.edition;
        },
        "findByMint",
        { mint },
        (result) => result != null,
        severity ?? "error"
      );
      return account;
    } catch {
      return null;
    }
  }

  static async loadMasterEditionAccount(
    mint: PublicKeyOrString,
    severity: SeverityLevel = "error"
  ): Promise<Maybe<NftOriginalEdition>> {
    const edition = await AccountLoader.loadEditionAccount(mint, severity);
    return edition?.isOriginal === true ? edition : null;
  }

  static async loadNft(
    mint: PublicKeyOrString,
    severity: SeverityLevel = "error"
  ): Promise<Maybe<Nft>> {
    try {
      const account = await retryFn(
        async (connection) => {
          const metaplex = new Metaplex(connection);
          const nft = (await metaplex.nfts().findByMint({
            mintAddress: new PublicKey(mint),
          })) as Nft;
          return nft;
        },
        "Metadata.load",
        { mint },
        (result) => result != null,
        severity
      );
      return account;
    } catch {
      return null;
    }
  }

  static async loadStandardEditionAccount(
    mint: PublicKeyOrString,
    severity: SeverityLevel = "error"
  ): Promise<Maybe<NftPrintEdition>> {
    const edition = await AccountLoader.loadEditionAccount(mint, severity);
    return edition?.isOriginal === false ? edition : null;
  }
}
