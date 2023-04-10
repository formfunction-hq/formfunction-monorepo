
alter table "public"."Series" drop constraint "Series_type_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."Series" add column "type" text
--  not null default 'UserCurated';

DELETE FROM "public"."NotificationType" WHERE "value" = 'OwnerGenerativeMintSoldOut';

DELETE FROM "public"."NftTransactionType" WHERE "value" = 'SoldGenerativeMint';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."NftToAttribute" add column "rarityBasisPoints" integer
--  null;

alter table "public"."NftToAttribute" drop constraint "NftToAttribute_seriesId_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."NftToAttribute" add column "seriesId" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."Nft" add column "seriesRarityBasisPoints" integer
--  null;
