BEGIN TRANSACTION;
ALTER TABLE "public"."Claim" DROP CONSTRAINT "Claim_pkey";

ALTER TABLE "public"."Claim"
    ADD CONSTRAINT "Claim_pkey" PRIMARY KEY ("userId", "auctionNftId");
COMMIT TRANSACTION;
