CREATE TABLE "public"."NftTransactionRaw" ("txid" text NOT NULL, "timeCreated" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("txid") , UNIQUE ("txid"));
