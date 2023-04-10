/* eslint-disable no-plusplus */
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
  OpenBid,
  OpenBidsInput,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import Typename from "src/types/enums/Typename";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";

/**
 * Returns info about open bids.
 *
 * A bid is open if the auction for which the bid was placed is still ongoing (has not been settled).
 *
 * As a counterexample, if you place a bid, and then the NFT is sold, and then a new auction starts...
 * that is not an open bid.
 */
async function openBidsResolver(input: OpenBidsInput): Promise<Array<OpenBid>> {
  const { userId } = input;

  const prisma = getPrisma();
  const bids = await prisma.nftTransaction.findMany({
    include: {
      Nft: {
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
      },
    },
    orderBy: NFT_TRANSACTION_ORDER_BY,
    where: {
      Nft: {
        status: NftStatusExpress_Enum.Auction,
      },
      fromUserId: userId,
      timeCreated: {
        // Auctions only last 1 day—but after that, the auction needs to be settled (or,
        // you need to withdraw your bid to get the funds back).
        gte: dayjs().subtract(10, "day").toDate(),
      },
      type: NftTransactionTypeExpress_Enum.Bid,
    },
  });

  const filtered = bids.filter(
    (bid) =>
      // TODO: would be nicer to filter for this using SQL
      // NFT may be up for auction by someone else.
      bid.Nft.ownerId === bid.toUserId
  );

  const metadataAccountsFiltered = filtered.map((bid) => ({
    __typename: Typename.OpenBid as Typename.OpenBid,
    metadataAccount: convertNftToMetadataAccount(bid.Nft),
  }));

  return removeDuplicatesWithComparison(
    metadataAccountsFiltered,
    (account1, account2) =>
      account1.metadataAccount.mint === account2.metadataAccount.mint
  );
}

export default openBidsResolver;
