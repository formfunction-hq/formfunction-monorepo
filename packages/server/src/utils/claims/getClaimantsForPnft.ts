import { ClaimantInfo } from "@formfunction-hq/formfunction-gumdrop";
import { Nft, NftListing, NftMetadata } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import getPrisma from "src/utils/prisma/getPrisma";

type ClaimsAddressMap = { [key: string]: number };

export default async function getClaimantsForPnft(
  auctionNft: Nft & {
    NftListing: Maybe<NftListing>;
    NftMetadata: NftMetadata;
  }
): Promise<Array<ClaimantInfo>> {
  const prisma = getPrisma();

  const { pnftIdForAuction } = auctionNft.NftListing ?? {};
  const allAuctionClaims = await prisma.nft.findMany({
    include: {
      Claim: {
        select: {
          userId: true,
        },
        where: {
          claimTransactionId: null,
        },
      },
    },
    where: {
      NftListing: {
        isPnftDropActive: true,
        pnftIdForAuction,
      },
    },
  });

  const claimUserIds = allAuctionClaims
    .map((val) => val.Claim.flat().map((claim) => claim.userId))
    .flat();

  const claimsMap: ClaimsAddressMap = claimUserIds.reduce(
    (addressToAmountMap: ClaimsAddressMap, userId) => {
      const amount = (addressToAmountMap[userId] ?? 0) + 1;
      return { ...addressToAmountMap, [userId]: amount };
    },
    {}
  );

  const result = Object.entries(claimsMap).map(([address, amount]) => ({
    address: new PublicKey(address),
    amount,
  }));

  return result.sort(getCompareByProperty("address"));
}
