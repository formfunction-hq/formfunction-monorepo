alter table "public"."NftDisclosure"
  add constraint "NftDisclosure_type_fkey"
  foreign key ("type")
  references "public"."NftDisclosureType"
  ("value") on update cascade on delete cascade;
