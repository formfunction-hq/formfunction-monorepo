comment on column "public"."NftToCollaborator"."verified" is E'An NFT may have multiple "creators," with whom primary and secondary sales are split. We call these people "collaborators".';
alter table "public"."NftToCollaborator" alter column "verified" drop not null;
alter table "public"."NftToCollaborator" add column "verified" bool;
