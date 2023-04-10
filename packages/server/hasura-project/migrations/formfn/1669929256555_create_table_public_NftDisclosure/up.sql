CREATE TABLE "public"."NftDisclosure" ("nftId" text NOT NULL, "type" text NOT NULL, "details" text, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("nftId","type") , FOREIGN KEY ("nftId") REFERENCES "public"."Nft"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
