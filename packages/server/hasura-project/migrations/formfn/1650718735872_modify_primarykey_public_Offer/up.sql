BEGIN TRANSACTION;
ALTER TABLE "public"."Offer" DROP CONSTRAINT "Offer_pkey";

ALTER TABLE "public"."Offer"
    ADD CONSTRAINT "Offer_pkey" PRIMARY KEY ("nftTransactionId");
COMMIT TRANSACTION;
