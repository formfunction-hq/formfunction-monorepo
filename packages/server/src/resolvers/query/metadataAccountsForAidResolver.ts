import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import hasAuctionEndedForNft from "src/utils/dates/hasAuctionEndedForNft";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  MetadataAccount,
  MetadataAccountsForAidInput,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";

function compareByStatus(a: MetadataAccount, b: MetadataAccount) {
  let aStatus: string = a.nft.status;
  let bStatus: string = b.nft.status;

  aStatus =
    aStatus === NftStatusExpress_Enum.Auction &&
    hasAuctionEndedForNft(aStatus, a.nft.auctionEndTime)
      ? // Put these at end
        "Z-auction-ended"
      : aStatus;

  bStatus =
    bStatus === NftStatusExpress_Enum.Auction &&
    hasAuctionEndedForNft(bStatus, b.nft.auctionEndTime)
      ? // Put these at end
        "Z-auction-ended"
      : bStatus;

  return aStatus.localeCompare(bStatus);
}

export default async function metadataAccountsForAidResolver(
  _input: MaybeUndef<MetadataAccountsForAidInput>
): Promise<Array<MetadataAccount>> {
  const prisma = getPrisma();

  const mintsToInclude = await getLdFlag(
    LaunchDarklyFlag.AuctionsForAidMints,
    []
  );
  const prismaNfts = await prisma.nft.findMany({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    orderBy: {
      timeCreated: "desc",
    },
    where: {
      mint: {
        in: mintsToInclude,
      },
      status: {
        not: "Burned",
      },
    },
  });

  const nfts = prismaNfts.map((nft) => convertNftToMetadataAccount(nft));

  return nfts.sort(compareByStatus);
}
