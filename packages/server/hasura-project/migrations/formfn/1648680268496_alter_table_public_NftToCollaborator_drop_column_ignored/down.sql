comment on column "public"."NftToCollaborator"."ignored" is E'An NFT may have multiple "creators," with whom primary and secondary sales are split. We call these people "collaborators".';
alter table "public"."NftToCollaborator" alter column "ignored" drop not null;
alter table "public"."NftToCollaborator" add column "ignored" bool;
