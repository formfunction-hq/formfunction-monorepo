alter table "public"."Claims" drop constraint "Claims_pkey";
alter table "public"."Claims"
    add constraint "Claims_pkey"
    primary key ("id");
