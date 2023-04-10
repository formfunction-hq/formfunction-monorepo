import {
  CurrencyNameExpress_Enum,
  MetadataAccount,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
  RefundableAmount,
  RefundableAmountsInput,
  RefundableAmountsResponse,
} from "src/__generated__/generated";
import MyContext from "src/types/MyContext";
import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";
import getBuyerEscrowBalance from "src/utils/solana/getBuyerEscrowBalance";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import dayjs from "src/utils/dates/dayjsex";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import auctionWinnerIdResolver from "src/resolvers/query/nested/nft/auctionWinnerIdResolver";
import convertPrice from "src/utils/convert/convertPrice";
import { Currency } from "@prisma/client";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";

async function getRefundableAmount(
  auctionHouseSdk: AuctionHouseSdk,
  metadataAccount: MetadataAccount,
  userId: string,
  currency: Maybe<Currency>
): Promise<RefundableAmount> {
  const { balance: lamports } = await getBuyerEscrowBalance(
    auctionHouseSdk,
    userId,
    metadataAccount.mint
  );

  const auctionWinnerId = await auctionWinnerIdResolver(metadataAccount.nft);
  const isWinningBidder = userId === auctionWinnerId;

  // If you are the winning bidder, the escrow balance cannot dip below your winning bid amount.
  const amount = isWinningBidder
    ? lamports - Number(metadataAccount.nft.price!)
    : lamports;

  return {
    __typename: Typename.RefundableAmount,
    amount: convertPrice(amount, currency)!,
    amountInLamports: amount,
    metadataAccount,
    userId,
  };
}

export async function refundableAmountsResolver(
  _context: Maybe<MyContext>,
  input: RefundableAmountsInput
): Promise<RefundableAmountsResponse> {
  const prisma = getPrisma();
  const bids = await prisma.nftTransaction.findMany({
    include: {
      Currency: true,
      Nft: {
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
      },
    },
    orderBy: NFT_TRANSACTION_ORDER_BY,
    where: {
      Nft: {
        // Otherwise, it's impossible to have a refund available
        OR: [{ status: NftStatusExpress_Enum.Auction }, { hasBeenSold: true }],
      },
      fromUserId: input.userId ?? undefined,
      timeCreated: {
        // Assume user refunds within 5 days...
        gte: dayjs().subtract(5, "day").toDate(),
      },
      type: NftTransactionTypeExpress_Enum.Bid,
    },
  });

  const metadataAccounts = bids.map((bid) => ({
    currency: bid.Nft.PriceLastSoldCurrency,
    metadataAccount: convertNftToMetadataAccount(bid.Nft),
    userId: bid.fromUserId,
  }));

  const metadataAccountsUnique = removeDuplicatesWithComparison(
    metadataAccounts,
    (account1, account2) =>
      account1.metadataAccount.mint === account2.metadataAccount.mint &&
      account1.userId === account2.userId
  );

  const amounts = await Promise.all(
    metadataAccountsUnique.map(async ({ metadataAccount, userId, currency }) =>
      getRefundableAmount(
        getAuctionHouseSdk(currency.name as CurrencyNameExpress_Enum),
        metadataAccount,
        userId,
        currency
      )
    )
  );

  return {
    __typename: Typename.RefundableAmountsResponse,
    amounts: amounts.filter(
      ({ amountInLamports }) => Number(amountInLamports) > 0
    ),
  };
}

export default refundableAmountsResolver;
