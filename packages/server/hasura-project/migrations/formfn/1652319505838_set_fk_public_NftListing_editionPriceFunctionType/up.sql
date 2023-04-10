alter table "public"."NftListing"
  add constraint "NftListing_editionPriceFunctionType_fkey"
  foreign key ("editionPriceFunctionType")
  references "public"."PriceFunctionType"
  ("value") on update restrict on delete restrict;
