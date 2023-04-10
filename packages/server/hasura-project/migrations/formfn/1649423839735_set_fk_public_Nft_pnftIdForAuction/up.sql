alter table "public"."Nft"
  add constraint "Nft_pnftIdForAuction_fkey"
  foreign key ("pnftIdForAuction")
  references "public"."Nft"
  ("id") on update restrict on delete restrict;
