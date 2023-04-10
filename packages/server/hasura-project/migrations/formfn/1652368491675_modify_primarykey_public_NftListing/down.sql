alter table "public"."NftListing" drop constraint "NftListing_pkey";
alter table "public"."NftListing"
    add constraint "NftListing_pkey"
    primary key ("id");
