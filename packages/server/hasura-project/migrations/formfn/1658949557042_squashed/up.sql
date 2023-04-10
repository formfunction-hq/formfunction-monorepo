
alter table "public"."Spotlight" add column "label" text
 null;

alter table "public"."Spotlight" drop column "assetId" cascade;

alter table "public"."Spotlight" add column "assetId" uuid
 not null;

alter table "public"."Spotlight" alter column "assetId" drop not null;

alter table "public"."Spotlight"
  add constraint "Spotlight_assetId_fkey"
  foreign key ("assetId")
  references "public"."Asset"
  ("id") on update restrict on delete restrict;

alter table "public"."Spotlight" alter column "assetId" set not null;

alter table "public"."Spotlight" alter column "assetId" drop not null;
