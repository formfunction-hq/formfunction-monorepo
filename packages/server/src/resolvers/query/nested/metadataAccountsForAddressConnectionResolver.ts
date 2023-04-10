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
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import validateFirstInput from "src/utils/validation/validateFirstInput";

/**
 * Returns NFTs that the user collected or created on FormFn.
 */
export default async function metadataAccountsForAddressConnectionResolver(
  context: MyContext,
  after: Maybe<string>,
  first: number,
  address: string,
  status: Maybe<NftStatusExpress_Enum>
): Promise<MetadataAccountsConnection> {
  validateFirstInput(first);
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();

  const where: Prisma.NftWhereInput = {
    OR: [
      {
        // We don't want to show standard editions the creator has created,
        // unless they are imported (because sometimes we import standard editions from Holaplex).
        OR: [{ isMasterEdition: true }, { isImported: true }],
        creatorId: address,
        // Also limit this clause to non-pNFTs as we handle pNFT master editions separately below
        isPnft: false,
      },
      // Fetch pNFT master editions that the user has created, only if it
      // is associated with an auction nft
      {
        AuctionNft: {
          some: {
            pnftIdForAuction: { not: null },
          },
        },
        creatorId: address,
        isMasterEdition: true,
        isPnft: true,
      },
      // An NFT you collaborated on should show up under Created
      {
        NftToCollaborator: {
          some: {
            collaboratorId: address,
          },
        },
        isPnft: false,
      },
    ],
    status: status ?? { not: NftStatusExpress_Enum.Burned },
  };

  const [nftsCreatedOrOwned, totalCount] = await Promise.all([
    prisma.nft.findMany({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      orderBy: { timeCreated: "desc" },
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.nft.count({ where }),
  ]);

  const metadataAccounts: Array<MetadataAccount> = nftsCreatedOrOwned.map(
    (nft) => convertNftToMetadataAccount(nft)
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
