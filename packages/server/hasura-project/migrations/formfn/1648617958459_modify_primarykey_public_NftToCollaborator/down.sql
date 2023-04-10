alter table "public"."NftToCollaborator" drop constraint "NftToCollaborator_pkey";
alter table "public"."NftToCollaborator"
    add constraint "NftToCollaborator_pkey"
    primary key ("id");
