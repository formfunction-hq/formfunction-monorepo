alter table "public"."CandyMachine"
  add constraint "CandyMachine_mintPreviewAssetId_fkey"
  foreign key ("mintPreviewAssetId")
  references "public"."Asset"
  ("id") on update restrict on delete restrict;
