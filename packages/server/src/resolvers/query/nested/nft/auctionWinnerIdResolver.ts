import { NftExpress, NftStatusExpress_Enum } from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getWinningBidForNft from "src/utils/prisma/getWinningBidForNft";

export default async function auctionWinnerIdResolver(
  nft: NftExpress
): Promise<Maybe<string>> {
  if (nft.status !== NftStatusExpress_Enum.Auction) {
    return null;
  }

  const winningBid = await getWinningBidForNft(nft);
  return winningBid?.fromUserId ?? null;
}
