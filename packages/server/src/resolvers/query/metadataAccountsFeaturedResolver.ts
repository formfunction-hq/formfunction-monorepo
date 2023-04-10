import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import hasAuctionEndedForNft from "src/utils/dates/hasAuctionEndedForNft";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  MetadataAccount,
  MetadataAccountsFeaturedInput,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import { NftTransaction } from "@prisma/client";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";

function compareByStatus(
  a: ConvertNftToMetadataAccountType & {
    NftTransaction: Array<NftTransaction>;
  },
  b: ConvertNftToMetadataAccountType & {
    NftTransaction: Array<NftTransaction>;
  }
) {
  let aStatus: string = a.status;
  let bStatus: string = b.status;

  aStatus =
    aStatus === NftStatusExpress_Enum.Auction &&
    hasAuctionEndedForNft(aStatus, a.NftListing?.auctionEndTime)
      ? // Put these at end
        "Z-auction-ended"
      : aStatus;

  bStatus =
    bStatus === NftStatusExpress_Enum.Auction &&
    hasAuctionEndedForNft(bStatus, b.NftListing?.auctionEndTime)
      ? // Put these at end
        "Z-auction-ended"
      : bStatus;

  const statusCompare = aStatus.localeCompare(bStatus);
  if (statusCompare !== 0) {
    return statusCompare;
  }

  const aNumBids = a.NftTransaction.filter(
    (tx) => tx.auctionCount === a.auctionCount
  ).length;
  const bNumBids = b.NftTransaction.filter(
    (tx) => tx.auctionCount === b.auctionCount
  ).length;

  // If both have bids, don't do any additional sorting (NFTs are already sorted by auctionEndTime)
  if (aNumBids > 0 && bNumBids > 0) {
    return 0;
  }

  // If b has more bids for the current auction than a, it should come before a
  return bNumBids - aNumBids;
}

export default async function metadataAccountsFeaturedResolver(
  _input: MaybeUndef<MetadataAccountsFeaturedInput>
): Promise<Array<MetadataAccount>> {
  const prisma = getPrisma();
  const nfts = await prisma.nft.findMany({
    include: {
      ...CONVERT_NFT_TO_METADATA_INCLUDE,
      NftTransaction: {
        orderBy: NFT_TRANSACTION_ORDER_BY,
        take: 1,
        where: {
          type: NftTransactionTypeExpress_Enum.Bid,
        },
      },
    },
    orderBy: [{ status: "asc" }, { NftListing: { auctionEndTime: "asc" } }],
    // Query for more than 24 to account for removing duplicates by creator
    take: 100,
    where: {
      status: {
        in: [NftStatusExpress_Enum.Auction, NftStatusExpress_Enum.Listed],
      },
    },
  });

  const nftsUniqueByUser = removeDuplicatesWithComparison(
    nfts,
    (val1, val2) => val1.creatorId === val2.creatorId
  );
  const sorted = nftsUniqueByUser.sort(compareByStatus);
  const converted = sorted.map((nft) => convertNftToMetadataAccount(nft));

  const count = await getLdFlag(LaunchDarklyFlag.FeaturedArtCount, 24);

  return converted.slice(0, count);
}
