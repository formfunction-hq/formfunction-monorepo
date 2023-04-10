import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import getSeriesNftsWhere from "src/utils/series/getSeriesNftsWhere";
import getSortedNfts from "src/utils/nft/getSortedNfts";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import {
  UpdateSeriesIdForNftsResponse,
  UpdateSeriesIdForNftsInput,
} from "src/__generated__/generated";

export default async function updateSeriesIdForNftsResolver(
  _context: MyContext,
  after: Maybe<string>,
  first: number,
  input: UpdateSeriesIdForNftsInput
): Promise<UpdateSeriesIdForNftsResponse> {
  validateFirstInput(first);
  const prisma = getPrisma();
  const [numNftsAddedTo] = await Promise.all([
    prisma.nft.updateMany({
      data: { seriesId: input.seriesId },
      where: {
        mint: { in: input.mintsToAdd ?? [] },
      },
    }),
    prisma.nft.updateMany({
      data: { seriesId: null },
      where: {
        mint: { in: input.mintsToRemove ?? [] },
      },
    }),
  ]);

  const [series, nfts, nftsRemovedFromSeries] = await Promise.all([
    prisma.series.update({
      data: {
        nftOrder: input.order!,
        timeLastAddedTo: numNftsAddedTo.count > 0 ? new Date() : undefined,
      },
      where: { id: input.seriesId },
    }),
    prisma.nft.findMany({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      where: getSeriesNftsWhere(input.seriesId),
    }),
    prisma.nft.findMany({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      where: { mint: { in: input.mintsToRemove || [] } },
    }),
  ]);
  const sortedNfts = getSortedNfts(
    series.nftOrder as Maybe<Array<string>>,
    nfts,
    after,
    first
  );

  return {
    __typename: Typename.UpdateSeriesIdForNftsResponse,
    metadataAccountsInSeries: createOffsetPaginationConnection(
      sortedNfts.map((nft) => convertNftToMetadataAccount(nft)),
      Typename.MetadataAccountsEdge,
      Typename.MetadataAccountsConnection,
      after,
      first,
      sortedNfts.length
    ),
    metadataAccountsRemovedFromSeries: nftsRemovedFromSeries.map((nft) =>
      convertNftToMetadataAccount(nft)
    ),
  };
}
