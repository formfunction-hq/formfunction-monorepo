BEGIN TRANSACTION;
ALTER TABLE "public"."UnlockableWinner" DROP CONSTRAINT "UnlockableWinner_pkey";

ALTER TABLE "public"."UnlockableWinner"
    ADD CONSTRAINT "UnlockableWinner_pkey" PRIMARY KEY ("unlockableId", "userId");
COMMIT TRANSACTION;
