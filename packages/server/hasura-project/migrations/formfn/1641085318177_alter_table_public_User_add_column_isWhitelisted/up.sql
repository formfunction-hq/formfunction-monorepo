alter table "public"."User" add column "isWhitelisted" boolean
 not null default 'false';
