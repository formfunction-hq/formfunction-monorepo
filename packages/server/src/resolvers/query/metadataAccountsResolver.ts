import MyContext from "src/types/MyContext";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import convertMetadataAccount from "src/utils/convert/convertMetadataAccount";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import getOnPlatformMetadataAccounts from "src/utils/prisma/getOnPlatformMetadataAccounts";
import getPrisma from "src/utils/prisma/getPrisma";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import {
  MetadataAccount,
  MetadataAccountsInput,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import pLimit from "p-limit";
import getOffPlatformOwnedMints from "src/utils/solana/getOffPlatformOwnedMints";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";

const limit = pLimit(20);

async function getCreatedOrOwnedMints(input: MetadataAccountsInput) {
  const prisma = getPrisma();
  const { address, status } = input;
  const nftsCreatedOrOwned = await prisma.nft.findMany({
    where: {
      OR: filterNulls([
        input.includeCreator === false ? null : { creatorId: address },
        input.includeOwner === false ? null : { ownerId: address },
      ]),
      status: status ?? { not: NftStatusExpress_Enum.Burned },
    },
  });

  return nftsCreatedOrOwned.map((nft) => nft.mint);
}

/**
 * Returns NFTs that the user owns + NFTs that the user created on FormFn.
 *
 * It would take too long to fetch all the NFTs that the user created in general (i.e. not on FormFn).
 */
async function metadataAccountsResolver(
  context: MyContext,
  input: MetadataAccountsInput
): Promise<Array<MetadataAccount>> {
  const [onPlatformMints, offPlatformMints] = await Promise.all([
    getCreatedOrOwnedMints(input),
    input.includeOffPlatform === true
      ? getOffPlatformOwnedMints(input.address)
      : [],
  ]);

  const onPlatformMetadata = await getOnPlatformMetadataAccounts(
    onPlatformMints
  );
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

  const merged = removeDuplicatesWithComparison(
    [...onPlatformMetadata, ...offPlatformMetadata],
    (account1, account2) => account1.mint === account2.mint
  );

  const sorted = merged.sort(
    getCompareByProperty("timeCreated", SortOrder.Desc)
  );

  return sorted;
}

export default metadataAccountsResolver;
