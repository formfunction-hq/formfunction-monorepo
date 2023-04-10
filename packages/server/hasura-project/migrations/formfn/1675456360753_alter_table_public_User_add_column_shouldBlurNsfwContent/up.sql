alter table "public"."User" add column "shouldBlurNsfwContent" boolean
 not null default 'true';
