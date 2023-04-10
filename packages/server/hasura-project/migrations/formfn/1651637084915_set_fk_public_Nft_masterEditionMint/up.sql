alter table "public"."Nft"
  add constraint "Nft_masterEditionMint_fkey"
  foreign key ("masterEditionMint")
  references "public"."Nft"
  ("id") on update restrict on delete restrict;
