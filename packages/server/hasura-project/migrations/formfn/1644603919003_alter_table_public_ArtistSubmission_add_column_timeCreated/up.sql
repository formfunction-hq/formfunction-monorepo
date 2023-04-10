alter table "public"."ArtistSubmission" add column "timeCreated" timestamptz
 null default now();
