import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import PNFT_CLAIMANT_LIMIT from "src/constants/pnftClaimantLimit";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

type CreateClaim = {
  auctionNftId: string;
  userId: string;
};

export default async function createClaimsForAuctionBidders(
  auctionMint: string,
  auctionCount: number
): Promise<Array<CreateClaim>> {
  const prisma = getPrisma();
  const txs = await prisma.nftTransaction.findMany({
    orderBy: {
      timeCreated: "asc",
    },
    // We take more than the limit and then de-dedupe by user and reduce to the actual limit below.
    take: PNFT_CLAIMANT_LIMIT * 2,
    where: {
      auctionCount,
      mint: auctionMint,
      type: NftTransactionTypeExpress_Enum.Bid,
    },
  });

  const claims: Array<CreateClaim> = txs.map(({ fromUserId }) => ({
    auctionNftId: auctionMint,
    userId: fromUserId,
  }));

  const dedupedClaims = removeDuplicatesWithComparison(
    claims,
    (val1, val2) => val1.userId === val2.userId
  );

  const dedupedClaimsUpToMaxLimit = dedupedClaims.slice(0, PNFT_CLAIMANT_LIMIT);

  // If this ever happens see more info here: https://github.com/formfunction-hq/formfn-monorepo/pull/2042
  if (dedupedClaimsUpToMaxLimit.length === PNFT_CLAIMANT_LIMIT) {
    logError(
      AnalyticsEvent.PnftClaimantLimitReached,
      `Limit of ${PNFT_CLAIMANT_LIMIT} unique claimants reached for pNFT drop for mint ${auctionMint}. Extra bidders over the limit will be excluded from the pNFT drop.`,
      undefined,
      {
        auctionCount,
        auctionMint,
        claimantLimit: PNFT_CLAIMANT_LIMIT,
        totalNumberOfClaimants: claims.length,
        totalNumberOfDedupedClaimants: dedupedClaims.length,
      }
    );
  }

  return Promise.all(
    dedupedClaimsUpToMaxLimit.map((claim) =>
      prisma.claim.upsert({
        create: claim,
        update: claim,
        where: {
          userId_auctionNftId: {
            auctionNftId: claim.auctionNftId,
            userId: claim.userId,
          },
        },
      })
    )
  );
}
