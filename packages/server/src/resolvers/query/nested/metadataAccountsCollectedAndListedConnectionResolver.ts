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
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import getOwnerFilter from "src/utils/prisma/where/getOwnerFilter";
import getCreatorNotFilter from "src/utils/prisma/where/getCreatorNotFilter";
import LISTED_NFT_STATUSES from "src/constants/ListedNftStatuses";
import { ORDER_BY } from "src/resolvers/query/nested/metadataAccountsCollectedConnectionResolver";

/**
 * Returns the NFTs that the user owns and has listed.
 */
export default async function metadataAccountsCollectedAndListedConnectionResolver(
  _context: MyContext,
  after: Maybe<string>,
  first: number,
  input: MetadataAccountsCollectedInput
): Promise<MetadataAccountsConnection> {
  validateFirstInput(first);
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();

  const where: Prisma.NftWhereInput = {
    Creator: {
      isWhitelisted: true,
    },
    status: { in: LISTED_NFT_STATUSES },
    ...getCreatorNotFilter(input.collectorAddress, input.collectorUsername),
    ...getOwnerFilter(input.collectorAddress, input.collectorUsername),
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
