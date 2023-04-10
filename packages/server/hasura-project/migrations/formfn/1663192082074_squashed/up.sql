
CREATE TABLE "public"."CandyMachine" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "authorityId" text NOT NULL, "currencyId" uuid NOT NULL, "seriesId" text NOT NULL, "price" bigint NOT NULL, "maxSupply" integer NOT NULL, "platformFeeBasisPoints" integer NOT NULL, "timeCreated" timestamptz NOT NULL DEFAULT now(), "allowlistSaleStartTime" timestamptz, "publicSaleStartTime" timestamptz NOT NULL, "publicSaleEndTime" timestamptz, "antiBotProtectionEnabled" boolean NOT NULL, "limitPerAddress" integer, "creatorWallets" JSONB NOT NULL, "omniMintWallets" jsonb, PRIMARY KEY ("id") , FOREIGN KEY ("authorityId") REFERENCES "public"."User"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("currencyId") REFERENCES "public"."Currency"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("seriesId") REFERENCES "public"."Series"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."CandyMachineMerkleAllowlistInfo" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "userId" text NOT NULL, "candyMachineId" uuid NOT NULL, "amountAllowed" integer NOT NULL, "proof" text NOT NULL, "rootIndex" integer NOT NULL, "timeCreated" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("candyMachineId") REFERENCES "public"."CandyMachine"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"), UNIQUE ("userId", "candyMachineId"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."SeriesType" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."SeriesType"("value") VALUES (E'UserCurated');

INSERT INTO "public"."SeriesType"("value") VALUES (E'GenerativeMint');
