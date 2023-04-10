alter table "public"."Airdrop"
  add constraint "Airdrop_fromAddress_fkey"
  foreign key ("fromAddress")
  references "public"."User"
  ("id") on update cascade on delete cascade;
