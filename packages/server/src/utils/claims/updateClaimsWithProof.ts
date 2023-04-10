import {
  ClaimantInfo,
  constructProofForClaimants,
} from "@formfunction-hq/formfunction-gumdrop";
import { PublicKey } from "@solana/web3.js";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function updateClaimsWithProof(
  pnftId: string,
  auctionNftId: string,
  claimants: Array<ClaimantInfo>
) {
  const claimantsWithProof = constructProofForClaimants(
    new PublicKey(pnftId),
    claimants
  );

  const serializedClaims = claimantsWithProof.map((claimant) => ({
    ...claimant,
    proof: claimant.serializedProof,
  }));

  const prisma = getPrisma();
  return Promise.all(
    serializedClaims.map((claim) =>
      prisma.claim.update({
        data: {
          proof: claim.proof,
        },
        where: {
          userId_auctionNftId: {
            auctionNftId,
            userId: claim.address.toString(),
          },
        },
      })
    )
  );
}
