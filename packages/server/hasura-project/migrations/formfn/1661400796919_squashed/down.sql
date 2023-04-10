
alter table "public"."ActivityNotification" drop constraint "ActivityNotification_nftId_fkey",
  add constraint "ActivityNotification_nftId_fkey"
  foreign key ("nftTransactionId")
  references "public"."NftTransaction"
  ("id") on update cascade on delete cascade;

alter table "public"."ActivityNotification" drop constraint "ActivityNotification_nftTransactionId_fkey";

alter table "public"."ActivityNotification" drop constraint "ActivityNotification_nftId_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."ActivityNotification" add column "nftTransactionId" uuid
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."ActivityNotification" add column "nftId" text
--  null;
