BEGIN TRANSACTION;
ALTER TABLE "public"."TwitterAuth" DROP CONSTRAINT "TwitterAuth_pkey";

ALTER TABLE "public"."TwitterAuth"
    ADD CONSTRAINT "TwitterAuth_pkey" PRIMARY KEY ("userId");
COMMIT TRANSACTION;
