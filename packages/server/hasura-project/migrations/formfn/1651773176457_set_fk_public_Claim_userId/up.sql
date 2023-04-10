alter table "public"."Claim"
  add constraint "Claim_userId_fkey"
  foreign key ("userId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
