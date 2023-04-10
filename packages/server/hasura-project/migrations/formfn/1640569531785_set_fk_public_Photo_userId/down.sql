alter table "public"."Photo" drop constraint "Photo_userId_fkey",
  add constraint "Photo_userId_fkey"
  foreign key ("userId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
