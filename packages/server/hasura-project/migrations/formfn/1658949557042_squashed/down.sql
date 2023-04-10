
alter table "public"."Spotlight" alter column "assetId" set not null;

alter table "public"."Spotlight" alter column "assetId" drop not null;

alter table "public"."Spotlight" drop constraint "Spotlight_assetId_fkey";

alter table "public"."Spotlight" alter column "assetId" set not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."Spotlight" add column "assetId" uuid
--  not null;

alter table "public"."Spotlight" alter column "assetId" drop not null;
alter table "public"."Spotlight" add column "assetId" text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."Spotlight" add column "label" text
--  null;
