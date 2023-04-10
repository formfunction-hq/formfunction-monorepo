import { NftEdition } from "@metaplex-foundation/js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";

export default async function getEditionUpdateFields(
  mint: string,
  shouldLog = true
): Promise<
  Maybe<
    | {
        isMasterEdition: true;
        masterEdition: string;
        maxSupply: Maybe<number>;
      }
    | {
        edition: number;
        isMasterEdition: false;
        masterEdition: string;
        maxSupply: null;
        standardEdition: string;
      }
  >
> {
  let edition: Maybe<NftEdition> = null;
  try {
    edition = await AccountLoader.loadEditionAccount(mint, "info");
  } catch (e: any) {
    if (shouldLog) {
      await logError(
        AnalyticsEvent.GetMasterEditionUpdateFieldsError,
        `failed to get edition info for ${mint}`
      );
    }
    return null;
  }

  if (edition == null) {
    return null;
  }

  if (edition.isOriginal === true) {
    return {
      isMasterEdition: true,
      masterEdition: edition.address.toString(),
      maxSupply: edition.maxSupply?.toNumber() ?? null,
    };
  }

  return {
    edition: edition.number.toNumber(),
    isMasterEdition: false,
    masterEdition: edition.parent.toString(),
    maxSupply: null,
    standardEdition: edition.address.toString(),
  };
}
