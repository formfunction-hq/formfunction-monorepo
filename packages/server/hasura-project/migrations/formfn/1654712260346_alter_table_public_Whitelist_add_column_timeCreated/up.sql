alter table "public"."Whitelist" add column "timeCreated" timestamptz
 null default now();
