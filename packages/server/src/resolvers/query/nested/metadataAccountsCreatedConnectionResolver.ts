import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  MetadataAccount,
  MetadataAccountsConnection,
  MetadataAccountsCreatedInput,
  NftStatusExpress_Enum,
  RequestStatusExpress_Enum,
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import getCreatorFilter from "src/utils/prisma/where/getCreatorFilter";
import getUserFilter from "src/utils/prisma/where/getUserFilter";

export default async function metadataAccountsCreatedConnectionResolver(
  _context: MyContext,
  after: Maybe<string>,
  first: number,
  input: MetadataAccountsCreatedInput
): Promise<MetadataAccountsConnection> {
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();
  const creatorFilter = getCreatorFilter(
    input.creatorAddress,
    input.creatorUsername
  );

  const where: Prisma.NftWhereInput = {
    AND: [
      {
        OR: filterNulls([
          {
            // We don't want to show standard editions the creator has created,
            // unless they are imported (because sometimes we import standard editions from Holaplex).
            OR: [
              { isMasterEdition: true },
              { isImported: true, masterEditionMint: null },
            ],
            // Also limit this clause to non-pNFTs as we handle pNFT master editions separately below
            isPnft: false,
            ...creatorFilter,
          },
          // Fetch pNFT master editions that the user has created, only if they
          // are associated with an auction nft
          {
            AuctionNft: {
              some: {
                pnftIdForAuction: { not: null },
              },
            },
            isMasterEdition: true,
            isPnft: true,
            ...creatorFilter,
          },
          input.includeCollaborations ?? true
            ? {
                Creator: {
                  isWhitelisted: true,
                },
                NftToCollaborator: {
                  some: {
                    Request: {
                      status: RequestStatusExpress_Enum.Approved,
                    },
                    User: getUserFilter(
                      input.creatorAddress,
                      input.creatorUsername
                    ),
                  },
                },
              }
            : null,
        ]),
      },
      {
        // Exclude pieces in generative mints as we will use a separate query for those
        seriesRarityRanking: null,
        status: { not: NftStatusExpress_Enum.Burned },
      },
    ],
  };

  const [
    nftsCreatedWithoutGenerativeMints,
    totalCount,
    generativeSeriesWithNfts,
  ] = await Promise.all([
    prisma.nft.findMany({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      orderBy: { timeCreated: "desc" },
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.nft.count({ where }),
    // We use a separate query for NFTs that are part of generative mints
    // since otherwise it would quickly flood a user's "created" tab as these
    // mints tend to have 1000s of NFTs
    prisma.series.findMany({
      include: { Nft: { include: CONVERT_NFT_TO_METADATA_INCLUDE, take: 8 } },
      where: {
        OR: [
          { User: { id: input.creatorAddress ?? undefined } },
          { User: { username: input.creatorUsername ?? undefined } },
        ],
        type: "GenerativeMint",
      },
    }),
  ]);

  const nftsCreatedInGenerativeMints = generativeSeriesWithNfts
    .map((series) => series.Nft)
    .flat();
  const metadataAccounts: Array<MetadataAccount> = [
    ...nftsCreatedWithoutGenerativeMints,
    ...nftsCreatedInGenerativeMints,
  ].map((nft) => convertNftToMetadataAccount(nft));

  return createOffsetPaginationConnection(
    metadataAccounts,
    Typename.MetadataAccountsEdge,
    Typename.MetadataAccountsConnection,
    after,
    first,
    totalCount
  );
}
