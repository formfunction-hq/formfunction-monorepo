alter table "public"."Offer"
  add constraint "Offer_userId_fkey"
  foreign key ("userId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
