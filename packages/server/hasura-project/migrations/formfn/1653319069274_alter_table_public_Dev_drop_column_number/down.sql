comment on column "public"."Dev"."number" is E'Table used for development/testing';
alter table "public"."Dev" alter column "number" drop not null;
alter table "public"."Dev" add column "number" int4;
