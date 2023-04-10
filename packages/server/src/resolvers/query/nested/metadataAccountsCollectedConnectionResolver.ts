import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  MetadataAccount,
  MetadataAccountsCollectedInput,
  MetadataAccountsConnection,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import getOwnerFilter from "src/utils/prisma/where/getOwnerFilter";
import getCreatorNotFilter from "src/utils/prisma/where/getCreatorNotFilter";
import getUserFilter from "src/utils/prisma/where/getUserFilter";
import SOLD_TRANSACTION_TYPES from "src/constants/SoldTransactionTypes";

// We want pNFTs and airdrops to be shown last
export const ORDER_BY = [
  { isPnft: "asc" },
  {
    AirdropStandardEdition: {
      standardEditionMint: { nulls: "first", sort: "asc" },
    },
  },
  { timeCreated: "desc" },
] satisfies Prisma.Enumerable<Prisma.NftOrderByWithRelationInput>;

/**
 * Returns the union of the following:
 * 1. The user collected the NFT (won an auction, instant sale, etc.)
 * 2. The user currently owns the NFT.
 */
export default async function metadataAccountsCollectedConnectionResolver(
  _context: MyContext,
  after: Maybe<string>,
  first: number,
  input: MetadataAccountsCollectedInput
): Promise<MetadataAccountsConnection> {
  validateFirstInput(first);
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();

  const where: Prisma.NftWhereInput = {
    AND: [
      getCreatorNotFilter(input.collectorAddress, input.collectorUsername),
      {
        Creator: {
          isWhitelisted: true,
        },
      },
      { status: { not: NftStatusExpress_Enum.Burned } },
    ],
    OR: [
      {
        NftTransaction: {
          some: {
            To: getUserFilter(input.collectorAddress, input.collectorUsername),
            type: {
              in: [
                NftTransactionTypeExpress_Enum.ClaimedPnft,
                ...SOLD_TRANSACTION_TYPES,
              ],
            },
          },
        },
      },
      getOwnerFilter(input.collectorAddress, input.collectorUsername),
    ],
  };

  const [nftsCollected, totalCount] = await Promise.all([
    prisma.nft.findMany({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      orderBy: ORDER_BY,
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.nft.count({ where }),
  ]);

  const metadataAccounts: Array<MetadataAccount> = nftsCollected.map((nft) =>
    convertNftToMetadataAccount(nft)
  );

  return createOffsetPaginationConnection(
    metadataAccounts,
    Typename.MetadataAccountsEdge,
    Typename.MetadataAccountsConnection,
    after,
    first,
    totalCount
  );
}
