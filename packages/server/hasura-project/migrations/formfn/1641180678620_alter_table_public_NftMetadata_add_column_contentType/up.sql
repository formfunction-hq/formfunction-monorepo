alter table "public"."NftMetadata" add column "contentType" text
 not null default 'image/png';
