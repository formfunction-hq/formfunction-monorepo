import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import getSortedNfts from "src/utils/nft/getSortedNfts";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  MetadataAccount,
  MetadataAccountsConnection,
} from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default async function metadataAccountsForCampaignFundingTierStandardConnectionResolver(
  _context: MyContext,
  after: Maybe<string>,
  first: number,
  campaignFundingTierId: string
): Promise<MetadataAccountsConnection> {
  const prisma = getPrisma();

  const [campaignFundingTier, allNfts] = await Promise.all([
    prisma.campaignFundingTier.findUnique({
      where: { id: campaignFundingTierId },
    }),
    // We manually sort these records as we store the order in the
    // CampaignFundingTier object as opposed to another table. This was mostly
    // for ease of updating (since storing on the Nft or another table would require
    // sweeping updates on many rows when re-ordering)
    prisma.nft.findMany({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      where: {
        campaignFundingTierId,
        // We don't want to display standard editions as a part of campaign funding tiers.
        isMasterEdition: true,
      },
    }),
  ]);
  invariant(campaignFundingTier != null);

  const sortedNfts = getSortedNfts(
    campaignFundingTier.nftOrder as Maybe<Array<string>>,
    allNfts,
    after,
    first,
    false
  );

  const metadataAccounts: Array<MetadataAccount> = sortedNfts.map((nft) =>
    convertNftToMetadataAccount(nft)
  );

  return createOffsetPaginationConnection(
    metadataAccounts,
    Typename.MetadataAccountsEdge,
    Typename.MetadataAccountsConnection,
    after,
    first,
    allNfts.length
  );
}
