alter table "public"."Asset" drop constraint "Asset_userId_fkey",
  add constraint "Asset_userId_fkey"
  foreign key ("userId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
