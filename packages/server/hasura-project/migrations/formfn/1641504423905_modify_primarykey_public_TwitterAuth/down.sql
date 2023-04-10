alter table "public"."TwitterAuth" drop constraint "TwitterAuth_pkey";
alter table "public"."TwitterAuth"
    add constraint "TwitterAuth_pkey"
    primary key ("id");
