import {
  NftExpress,
  NftStatusExpress_Enum,
  UserExpress,
} from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import convertUser from "src/utils/convert/convertUser";
import getWinningBidForNft from "src/utils/prisma/getWinningBidForNft";

export default async function auctionWinnerResolver(
  nft: NftExpress
): Promise<Maybe<UserExpress>> {
  if (nft.status !== NftStatusExpress_Enum.Auction) {
    return null;
  }
  const winningBid = await getWinningBidForNft(nft);
  return winningBid?.From == null ? null : convertUser(winningBid.From);
}
