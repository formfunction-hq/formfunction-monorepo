alter table "public"."Series"
  add constraint "Series_logoAssetId_fkey"
  foreign key ("logoAssetId")
  references "public"."Asset"
  ("id") on update cascade on delete set null;
