import { PublicKey } from "@solana/web3.js";
import dayjs from "dayjs";
import DEFAULT_AUCTION_COUNT from "src/constants/DefaultAuctionCount";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import Typename from "src/types/enums/Typename";
import convertUser from "src/utils/convert/convertUser";
import getEditionUpdateFields from "src/utils/nft/getEditionUpdateFields";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import getPrisma from "src/utils/prisma/getPrisma";
import findNftOwnerFromTxs from "src/utils/solana/txs/findNftOwnerFromTxs";
import findNftPriceFromTxs from "src/utils/solana/txs/findNftPriceFromTxs";
import findNftStatusFromTxs from "src/utils/solana/txs/findNftStatusFromTxs";
import getNftTxs from "src/utils/solana/txs/getNftTxs";
import { NftExpress, NftStatusExpress_Enum } from "src/__generated__/generated";

export default async function getOffPlatformNft(
  mint: PublicKey
): Promise<NftExpress> {
  const [txs, creatorAndAddress, masterEditionUpdateFields] = await Promise.all(
    [
      getNftTxs(mint),
      getNftCreatorFromMint(mint),
      getEditionUpdateFields(mint.toString()),
    ]
  );

  const ownerAddress = findNftOwnerFromTxs(txs);
  const [price, status] = await Promise.all([
    findNftPriceFromTxs(mint.toString(), txs),
    findNftStatusFromTxs(mint.toString(), txs),
  ]);

  const prisma = getPrisma();
  const owner = await prisma.user.findUnique({
    include: CONVERT_USER_INCLUDE,
    where: { id: ownerAddress ?? "" },
  });
  const convertedOwner = owner == null ? null : convertUser(owner);

  return {
    Creator: creatorAndAddress.creator,
    Owner: convertedOwner,
    __typename: Typename.Nft,
    auctionCount: DEFAULT_AUCTION_COUNT,
    auctionDurationInSeconds: -1,
    creatorId: creatorAndAddress.creatorAddress ?? "",
    editionAllowlistEnabled: false,
    // Make ID unique from id of Nft GraphQL type
    id: `${mint}-${Typename.Nft}`,
    isAirdrop: false,
    isImported: false,
    isMasterEdition: masterEditionUpdateFields?.isMasterEdition ?? true,
    isOffPlatform: true,
    isPnft: false,
    maxSupply: masterEditionUpdateFields?.maxSupply,
    mint: mint.toString(),
    ownerId: ownerAddress!,
    price,
    status: status ?? NftStatusExpress_Enum.Owned,
    tickSizeInfo: {
      __typename: Typename.TickSizeInfo as const,
    },
    timeCreated:
      txs.length > 0 ? txs[txs.length - 1].timeCreated : dayjs().toDate(),
    timeExtensionDurationInSeconds: -1,
  };
}
