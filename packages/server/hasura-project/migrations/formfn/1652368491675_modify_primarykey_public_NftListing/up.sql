BEGIN TRANSACTION;
ALTER TABLE "public"."NftListing" DROP CONSTRAINT "NftListing_pkey";

ALTER TABLE "public"."NftListing"
    ADD CONSTRAINT "NftListing_pkey" PRIMARY KEY ("nftId");
COMMIT TRANSACTION;
