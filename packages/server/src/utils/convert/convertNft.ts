import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import Typename from "src/types/enums/Typename";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import bigintToNumber from "src/utils/bigintToNumber";
import convertUser from "src/utils/convert/convertUser";
import getOnchainNftStatus from "src/utils/getOnchainNftStatus";
import getPrisma from "src/utils/prisma/getPrisma";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";
import { NftExpress } from "src/__generated__/generated";

export default async function convertNft(
  prismaNft: ConvertNftToMetadataAccountType
): Promise<{ nft: NftExpress; transactions: Array<NftTransactionOnchain> }> {
  const convertedCreator = convertUser(prismaNft.Creator);

  const [{ price, ownerId, status, txs }, masterEditionAccount] =
    await Promise.all([
      getOnchainNftStatus(prismaNft),
      AccountLoader.loadMasterEditionAccount(prismaNft.mint),
    ]);

  const prisma = getPrisma();
  const owner = await prisma.user.findUnique({
    include: CONVERT_USER_INCLUDE,
    where: { id: ownerId ?? "" },
  });
  const convertedOwner = owner == null ? null : convertUser(owner);
  const {
    auctionDurationInSeconds,
    auctionEndTime,
    editionAllowlistEnabled,
    editionAllowlistSaleStartTime,
    editionPublicSaleStartTime,
    isPnftDropActive,
    pnftIdForAuction,
    tickSizeConstantInLamports,
    timeExtensionDurationInSeconds,
  } = prismaNft.NftListing!;

  const nft: NftExpress = {
    Creator: convertedCreator,
    Owner: convertedOwner,
    __typename: Typename.Nft as Typename.Nft,
    auctionCount: prismaNft.auctionCount,
    auctionDurationInSeconds,
    auctionEndTime,
    creatorId: prismaNft.creatorId,
    editionAllowlistEnabled,
    editionAllowlistSaleStartTime,
    editionPublicSaleStartTime,
    // Make ID unique from id of Nft GraphQL type
    id: `${prismaNft.id}-${Typename.Nft}`,
    // Will get replaced by downstream resolver
    isAirdrop: false,
    isImported: prismaNft.isImported,
    isMasterEdition: prismaNft.isMasterEdition,
    isOffPlatform: false,
    isPnft: prismaNft.isPnft,
    isPnftDropActive,
    masterEditionMint: prismaNft.masterEditionMint,
    maxSupply: masterEditionAccount?.maxSupply?.toNumber(),
    mint: prismaNft.mint,
    ownerId: ownerId!,
    pnftIdForAuction,
    price,
    status,
    tickSizeInfo: {
      __typename: Typename.TickSizeInfo as const,
      tickSizeConstantInLamports: bigintToNumber(tickSizeConstantInLamports),
    },
    timeCreated: prismaNft.timeCreated,
    timeExtensionDurationInSeconds,
  };

  return { nft, transactions: txs };
}
