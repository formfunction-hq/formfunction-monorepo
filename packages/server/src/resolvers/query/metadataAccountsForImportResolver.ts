import MyContext from "src/types/MyContext";
import convertMetadataAccount from "src/utils/convert/convertMetadataAccount";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import getOnPlatformMetadataAccounts from "src/utils/prisma/getOnPlatformMetadataAccounts";
import {
  MetadataAccountsForImportInput,
  MetadataAccountsForImportResponse,
} from "src/__generated__/generated";
import pLimit from "p-limit";
import Typename from "src/types/enums/Typename";
import dayjs from "src/utils/dates/dayjsex";
import printTimeElapsed from "src/utils/dates/printTimeElapsed";
import getNftMintOwner from "src/utils/solana/getNftMintOwner";
import { PublicKey } from "@solana/web3.js";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";

const limit = pLimit(20);

export default async function metadataAccountsForImportResolver(
  context: MyContext,
  input: MetadataAccountsForImportInput
): Promise<MetadataAccountsForImportResponse> {
  const onPlatformMetadata = await getOnPlatformMetadataAccounts(
    input.mintAddresses
  );

  const offPlatformMints = input.mintAddresses.filter(
    (mint) =>
      onPlatformMetadata.find((metadata) => metadata.mint === mint) == null
  );

  const startTime = dayjs();
  const offPlatformMetadata = filterNulls(
    await Promise.all(
      offPlatformMints.map((mint) =>
        limit(async () => {
          const [metadataAccount, owner] = await Promise.all([
            AccountLoader.loadNft(mint),
            getNftMintOwner(new PublicKey(mint)),
          ]);
          if (metadataAccount == null || owner == null) {
            return null;
          }
          return convertMetadataAccount(metadataAccount, context.req);
        })
      )
    )
  );
  printTimeElapsed(startTime, "get offPlatformMetadata");

  // NOTE: on client, should not allow people to import NFTs that are already on FF
  return {
    __typename: Typename.MetadataAccountsForImportResponse,
    metadataAccounts: [...onPlatformMetadata, ...offPlatformMetadata],
  };
}
