alter table "public"."User" add column "emailBlocklist" jsonb
 not null default jsonb_build_array();
