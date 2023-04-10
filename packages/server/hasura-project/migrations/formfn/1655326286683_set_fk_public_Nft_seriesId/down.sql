alter table "public"."Nft" drop constraint "Nft_seriesId_fkey",
  add constraint "Nft_seriesId_fkey"
  foreign key ("seriesId")
  references "public"."Series"
  ("id") on update restrict on delete restrict;
