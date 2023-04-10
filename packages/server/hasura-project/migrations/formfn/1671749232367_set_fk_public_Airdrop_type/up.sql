alter table "public"."Airdrop"
  add constraint "Airdrop_type_fkey"
  foreign key ("type")
  references "public"."AirdropType"
  ("value") on update cascade on delete cascade;
