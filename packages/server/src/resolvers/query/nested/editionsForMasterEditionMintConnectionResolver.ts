import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import getEmptyConnection from "src/utils/graphql/getEmptyConnection";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  EditionsForMasterEditionMintInput,
  MetadataAccountsConnection,
} from "src/__generated__/generated";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import { Prisma } from "@prisma/client";
import validateFirstInput from "src/utils/validation/validateFirstInput";

async function editionsForMasterEditionMintConnectionResolver(
  _context: Undef<MyContext>,
  after: Maybe<string>,
  first: number,
  input: EditionsForMasterEditionMintInput
): Promise<MetadataAccountsConnection> {
  validateFirstInput(first);
  const prisma = getPrisma();
  const afterNumber = after == null ? 0 : Number(after);

  const where: Prisma.NftWhereInput = {
    isMasterEdition: false,
    masterEditionMint: input.masterEditionMint,
  };
  const [editions, totalCount] = await Promise.all([
    prisma.nft.findMany({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      orderBy: { edition: "asc" },
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.nft.count({ where }),
  ]);

  if (totalCount === 0) {
    return getEmptyConnection(Typename.MetadataAccountsConnection);
  }

  const converted = editions.map((edition) =>
    convertNftToMetadataAccount(edition)
  );

  return createOffsetPaginationConnection(
    converted,
    Typename.MetadataAccountsEdge,
    Typename.MetadataAccountsConnection,
    after,
    first,
    totalCount
  );
}

export default editionsForMasterEditionMintConnectionResolver;
