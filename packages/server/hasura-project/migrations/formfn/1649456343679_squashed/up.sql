
CREATE TABLE "public"."Claims" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "userId" text NOT NULL, "auctionNftId" text NOT NULL, "claimTxid" text, "timeCreated" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("auctionNftId") REFERENCES "public"."Nft"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"), UNIQUE ("claimTxid"), UNIQUE ("userId", "auctionNftId"));COMMENT ON TABLE "public"."Claims" IS E'Tracks eligible claims for participation NFT distributions to auction bidders';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."Claims" drop column "claimTxid" cascade;

alter table "public"."Claims" add column "claimNftTransactionId" uuid
 null unique;

alter table "public"."Claims"
  add constraint "Claims_claimNftTransactionId_fkey"
  foreign key ("claimNftTransactionId")
  references "public"."NftTransaction"
  ("id") on update restrict on delete restrict;
