alter table "public"."Post"
  add constraint "Post_airdropMasterEditionMint_fkey"
  foreign key ("airdropMasterEditionMint")
  references "public"."Nft"
  ("mint") on update cascade on delete cascade;
