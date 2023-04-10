alter table "public"."Poll" alter column "isMultiSelect" set not null;
alter table "public"."Poll" alter column "isMultiSelect" set default 'true';
