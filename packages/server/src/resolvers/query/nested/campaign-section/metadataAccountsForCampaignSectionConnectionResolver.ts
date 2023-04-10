import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import MyContext from "src/types/MyContext";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import { MetadataAccountsConnection } from "src/__generated__/generated";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import Typename from "src/types/enums/Typename";
import { Prisma } from "@prisma/client";

export default async function metadataAccountsForCampaignSectionConnectionResolver(
  _context: MyContext,
  after: Maybe<string>,
  first: number,
  nftMints: Array<string>
): Promise<MetadataAccountsConnection> {
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();
  const where: Prisma.NftWhereInput = {
    mint: {
      in: nftMints,
    },
  };
  const [nfts, totalCount] = await Promise.all([
    prisma.nft.findMany({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      orderBy: {
        timeCreated: "desc",
      },
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.nft.count({ where }),
  ]);

  return createOffsetPaginationConnection(
    nfts.map((nft) => convertNftToMetadataAccount(nft)),
    Typename.MetadataAccountsEdge,
    Typename.MetadataAccountsConnection,
    after,
    first,
    totalCount
  );
}
