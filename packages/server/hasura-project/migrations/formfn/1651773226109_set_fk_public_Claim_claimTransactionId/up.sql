alter table "public"."Claim"
  add constraint "Claim_claimTransactionId_fkey"
  foreign key ("claimTransactionId")
  references "public"."NftTransaction"
  ("id") on update restrict on delete restrict;
