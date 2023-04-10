alter table "public"."NftMetadata" alter column "edition" drop not null;
alter table "public"."NftMetadata" add column "edition" int4;
