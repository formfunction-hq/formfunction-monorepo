alter table "public"."NftToCollaborator" add column "timeCreated" timestamptz
 not null default now();
