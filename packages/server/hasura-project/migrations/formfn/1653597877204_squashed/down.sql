
alter table "public"."Nft" alter column "timeExtensionDurationInSeconds" set default 600;
alter table "public"."Nft" alter column "timeExtensionDurationInSeconds" drop not null;
alter table "public"."Nft" add column "timeExtensionDurationInSeconds" int4;

alter table "public"."Nft" alter column "scheduledAuctionTime" drop not null;
alter table "public"."Nft" add column "scheduledAuctionTime" timestamptz;

alter table "public"."Nft" alter column "pnftIdForAuction" drop not null;
alter table "public"."Nft" add column "pnftIdForAuction" text;

alter table "public"."Nft"
  add constraint "Nft_pnftIdForAuction_fkey"
  foreign key ("pnftIdForAuction")
  references "public"."Nft"
  ("id") on update restrict on delete restrict;

alter table "public"."Nft" alter column "isPnftDropActive" drop not null;
alter table "public"."Nft" add column "isPnftDropActive" bool;

alter table "public"."Nft" alter column "auctionDurationInSeconds" set default 86400;
alter table "public"."Nft" alter column "auctionDurationInSeconds" drop not null;
alter table "public"."Nft" add column "auctionDurationInSeconds" int4;

alter table "public"."Nft" alter column "auctionEndTime" drop not null;
alter table "public"."Nft" add column "auctionEndTime" timestamptz;

alter table "public"."Nft" alter column "priceInLamports" drop not null;
alter table "public"."Nft" add column "priceInLamports" int8;
