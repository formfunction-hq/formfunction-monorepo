alter table "public"."NftMetadata"
  add constraint "NftMetadata_nonstandardAssetId_fkey"
  foreign key ("nonstandardAssetId")
  references "public"."Asset"
  ("id") on update cascade on delete set null;
