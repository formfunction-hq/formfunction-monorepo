
alter table "public"."Nft" drop column "priceInLamports" cascade;

alter table "public"."Nft" drop column "auctionEndTime" cascade;

alter table "public"."Nft" drop column "auctionDurationInSeconds" cascade;

alter table "public"."Nft" drop column "isPnftDropActive" cascade;

alter table "public"."Nft" drop constraint "Nft_pnftIdForAuction_fkey";

alter table "public"."Nft" drop column "pnftIdForAuction" cascade;

alter table "public"."Nft" drop column "scheduledAuctionTime" cascade;

alter table "public"."Nft" drop column "timeExtensionDurationInSeconds" cascade;
