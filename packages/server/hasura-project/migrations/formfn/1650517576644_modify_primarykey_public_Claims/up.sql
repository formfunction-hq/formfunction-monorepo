BEGIN TRANSACTION;
ALTER TABLE "public"."Claims" DROP CONSTRAINT "Claims_pkey";

ALTER TABLE "public"."Claims"
    ADD CONSTRAINT "Claims_pkey" PRIMARY KEY ("userId", "auctionNftId");
COMMIT TRANSACTION;
