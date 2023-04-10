alter table "public"."Offer"
  add constraint "Offer_saleTransactionId_fkey"
  foreign key ("saleTransactionId")
  references "public"."NftTransaction"
  ("id") on update restrict on delete restrict;
