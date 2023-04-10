alter table "public"."User" alter column "lastSeenActivityId" drop not null;
alter table "public"."User" add column "lastSeenActivityId" text;
