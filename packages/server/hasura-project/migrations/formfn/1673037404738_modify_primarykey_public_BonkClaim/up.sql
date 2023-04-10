BEGIN TRANSACTION;
ALTER TABLE "public"."BonkClaim" DROP CONSTRAINT "BonkClaim_pkey";

ALTER TABLE "public"."BonkClaim"
    ADD CONSTRAINT "BonkClaim_pkey" PRIMARY KEY ("userId");
COMMIT TRANSACTION;
