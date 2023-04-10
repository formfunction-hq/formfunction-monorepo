alter table "public"."Claim"
  add constraint "Claim_auctionNftId_fkey"
  foreign key ("auctionNftId")
  references "public"."Nft"
  ("id") on update restrict on delete restrict;
