alter table "public"."DiscordAuthToDiscordRole" add column "timeCreated" timestamptz
 not null default now();
