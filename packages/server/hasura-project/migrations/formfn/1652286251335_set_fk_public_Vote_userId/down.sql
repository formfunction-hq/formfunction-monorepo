alter table "public"."Vote" drop constraint "Vote_userId_fkey",
  add constraint "Vote_userId_fkey"
  foreign key ("userId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
