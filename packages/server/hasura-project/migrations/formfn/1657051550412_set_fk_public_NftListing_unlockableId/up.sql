alter table "public"."NftListing"
  add constraint "NftListing_unlockableId_fkey"
  foreign key ("unlockableId")
  references "public"."Unlockable"
  ("id") on update restrict on delete restrict;
