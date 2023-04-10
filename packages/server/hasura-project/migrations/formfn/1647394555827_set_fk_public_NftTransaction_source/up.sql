alter table "public"."NftTransaction"
  add constraint "NftTransaction_source_fkey"
  foreign key ("source")
  references "public"."NftTransactionSource"
  ("value") on update restrict on delete restrict;
