
alter table "public"."NftTransaction" drop constraint "NftTransaction_currencyId_fkey";

alter table "public"."NftTransaction" drop column "currencyId" cascade
alter table "public"."NftTransaction" drop column "currencyId";
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."NftListing" drop constraint "NftListing_currencyId_fkey";

alter table "public"."NftListing" drop column "currencyId" cascade
alter table "public"."NftListing" drop column "currencyId";
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."Nft" drop constraint "Nft_currencyId_fkey";

alter table "public"."Nft" drop column "currencyId" cascade
alter table "public"."Nft" drop column "currencyId";
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;
