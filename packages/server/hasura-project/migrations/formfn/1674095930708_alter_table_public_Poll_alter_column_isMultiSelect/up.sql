ALTER TABLE "public"."Poll" ALTER COLUMN "isMultiSelect" drop default;
alter table "public"."Poll" alter column "isMultiSelect" drop not null;
