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
  MetadataAccountsForSeriesInput,
} from "src/__generated__/generated";
import getEmptyConnection from "src/utils/graphql/getEmptyConnection";
import { Prisma } from "@prisma/client";
import invariant from "tiny-invariant";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import getSeriesNftsWhere from "src/utils/series/getSeriesNftsWhere";
import getSeriesUniqueWhereClause from "src/utils/series/getSeriesUniqueWhereClause";
import getSortedNfts from "src/utils/nft/getSortedNfts";

async function getWhereClauseFromInput({
  seriesId,
  slugInput,
}: MetadataAccountsForSeriesInput): Promise<
  Prisma.SeriesFindUniqueArgs["where"]
> {
  if (seriesId != null) {
    return { id: seriesId };
  }

  invariant(slugInput != null);
  return getSeriesUniqueWhereClause(
    slugInput.creatorId,
    slugInput.creatorUsername,
    slugInput.seriesSlug
  );
}

/**
 * Returns NFTs that are part of the specified Series.
 */
export default async function metadataAccountsForSeriesConnectionResolver(
  _context: MyContext,
  after: Maybe<string>,
  first: number,
  input: MetadataAccountsForSeriesInput
): Promise<MetadataAccountsConnection> {
  validateFirstInput(first);
  const prisma = getPrisma();
  const series = await prisma.series.findUnique({
    where: await getWhereClauseFromInput(input),
  });
  if (series == null) {
    // TODO: return null instead
    return getEmptyConnection(Typename.MetadataAccountsConnection);
  }

  const nftsInSeries =
    // We manually sort these records as we store the order in the
    // Series object as opposed to the Nft object. This was mostly
    // for ease of updating (since storing on the Nft would require
    // sweeping updates on many Nfts when re-ordering)
    await prisma.nft.findMany({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      where: getSeriesNftsWhere(series.id),
    });

  const sortedNfts = getSortedNfts(
    series.nftOrder as Maybe<Array<string>>,
    nftsInSeries,
    after,
    first,
    input.shouldLoop ?? false
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
    nftsInSeries.length
  );
}
