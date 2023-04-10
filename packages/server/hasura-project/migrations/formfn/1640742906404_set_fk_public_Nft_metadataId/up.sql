alter table "public"."Nft"
  add constraint "Nft_metadataId_fkey"
  foreign key ("metadataId")
  references "public"."NftMetadata"
  ("id") on update restrict on delete restrict;
