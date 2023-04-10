alter table "public"."Unlockable"
  add constraint "Unlockable_activationPriceCurrencyId_fkey"
  foreign key ("activationPriceCurrencyId")
  references "public"."Currency"
  ("id") on update restrict on delete restrict;
