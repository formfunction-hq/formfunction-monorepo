alter table "public"."User" add column "seriesOrder" jsonb
 not null default jsonb_build_array();
