alter table "public"."NftTransaction" add column "isCrossmint" boolean
 not null default 'false';
