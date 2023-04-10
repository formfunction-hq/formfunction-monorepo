alter table "public"."UnlockableWinner" add column "timeCreated" timestamptz
 not null default now();
