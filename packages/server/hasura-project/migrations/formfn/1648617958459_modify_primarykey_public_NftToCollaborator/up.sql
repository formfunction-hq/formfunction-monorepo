BEGIN TRANSACTION;
ALTER TABLE "public"."NftToCollaborator" DROP CONSTRAINT "NftToCollaborator_pkey";

ALTER TABLE "public"."NftToCollaborator"
    ADD CONSTRAINT "NftToCollaborator_pkey" PRIMARY KEY ("collaboratorId", "nftId");
COMMIT TRANSACTION;
