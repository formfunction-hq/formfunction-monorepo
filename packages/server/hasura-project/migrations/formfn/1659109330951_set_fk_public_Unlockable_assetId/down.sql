alter table "public"."Unlockable" drop constraint "Unlockable_assetId_fkey",
  add constraint "Unlockable_assetId_fkey"
  foreign key ("assetId")
  references "public"."Asset"
  ("id") on update restrict on delete restrict;
