alter table "public"."Asset"
  add constraint "Asset_premintPreviewAssetCandyMachineId_fkey"
  foreign key ("premintPreviewAssetCandyMachineId")
  references "public"."CandyMachine"
  ("id") on update restrict on delete restrict;
