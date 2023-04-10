alter table "public"."NftToCollaborator" add column "requestId" uuid
 not null unique;
