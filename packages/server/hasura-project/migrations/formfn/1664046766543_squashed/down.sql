
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."CandyMachine" add column "allowlistPrice" int8
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."CandyMachine" add column "premintPrice" int8
--  null;

alter table "public"."CandyMachine" drop constraint "CandyMachine_creatorAuthorityId_fkey";

comment on column "public"."CandyMachine"."creatorAuthorityId" is NULL;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."CandyMachine" add column "creatorAuthorityId" text
--  not null;

alter table "public"."CandyMachine" drop constraint "CandyMachine_mintPreviewAssetId_fkey",
  add constraint "CandyMachine_mintPreviewAssetId_fkey"
  foreign key ("mintPreviewAssetId")
  references "public"."Asset"
  ("id") on update restrict on delete cascade;

alter table "public"."Asset" drop constraint "Asset_premintPreviewAssetCandyMachineId_fkey",
  add constraint "Asset_premintPreviewAssetCandyMachineId_fkey"
  foreign key ("premintPreviewAssetCandyMachineId")
  references "public"."CandyMachine"
  ("id") on update restrict on delete restrict;

alter table "public"."CandyMachine" drop constraint "CandyMachine_seriesId_fkey",
  add constraint "CandyMachine_seriesId_fkey"
  foreign key ("seriesId")
  references "public"."Series"
  ("id") on update restrict on delete restrict;

alter table "public"."CandyMachine" drop constraint "CandyMachine_mintPreviewAssetId_fkey",
  add constraint "CandyMachine_mintPreviewAssetId_fkey"
  foreign key ("mintPreviewAssetId")
  references "public"."Asset"
  ("id") on update restrict on delete restrict;

alter table "public"."CandyMachine" drop constraint "CandyMachine_currencyId_fkey",
  add constraint "CandyMachine_currencyId_fkey"
  foreign key ("currencyId")
  references "public"."Currency"
  ("id") on update restrict on delete restrict;

alter table "public"."CandyMachine" drop constraint "CandyMachine_candyMachineAuthorityId_fkey",
  add constraint "CandyMachine_candyMachineAuthorityId_fkey"
  foreign key ("candyMachineAuthorityId")
  references "public"."User"
  ("id") on update restrict on delete cascade;

alter table "public"."CandyMachine" drop constraint "CandyMachine_candyMachineAuthorityId_fkey",
  add constraint "CandyMachine_authorityId_fkey"
  foreign key ("candyMachineAuthorityId")
  references "public"."User"
  ("id") on update restrict on delete restrict;

alter table "public"."CandyMachine" rename column "candyMachineAuthorityId" to "authorityId";
comment on column "public"."CandyMachine"."authorityId" is NULL;
