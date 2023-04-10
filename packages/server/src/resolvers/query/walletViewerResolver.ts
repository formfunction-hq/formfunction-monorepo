import MyContext from "src/types/MyContext";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import convertMetadataAccount from "src/utils/convert/convertMetadataAccount";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import {
  MetadataAccount,
  WalletViewerInput,
} from "src/__generated__/generated";
import pLimit from "p-limit";
import getOffPlatformOwnedMints from "src/utils/solana/getOffPlatformOwnedMints";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";

const limit = pLimit(20);

async function walletViewerResolver(
  context: MyContext,
  input: WalletViewerInput
): Promise<Array<MetadataAccount>> {
  const offPlatformMints = await getOffPlatformOwnedMints(input.address);

  const offPlatformMetadata = filterNulls(
    await Promise.all(
      offPlatformMints.map((mint) =>
        limit(async () => {
          const metadataAccount = await AccountLoader.loadNft(mint);
          if (metadataAccount == null) {
            return null;
          }
          return convertMetadataAccount(metadataAccount, context.req);
        })
      )
    )
  );

  const sorted = offPlatformMetadata.sort(
    getCompareByProperty("timeCreated", SortOrder.Desc)
  );

  return sorted;
}

export default walletViewerResolver;
