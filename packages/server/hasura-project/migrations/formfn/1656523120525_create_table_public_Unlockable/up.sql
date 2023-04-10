CREATE TABLE "public"."Unlockable" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "assetId" uuid NOT NULL, "name" text NOT NULL, "description" text, "activationPriceInLamports" bigint, "timeCreated" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("assetId") REFERENCES "public"."Asset"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"), UNIQUE ("assetId"));COMMENT ON TABLE "public"."Unlockable" IS E'Tracks unlockable items which are attached to auctions and instant sales';
CREATE EXTENSION IF NOT EXISTS pgcrypto;