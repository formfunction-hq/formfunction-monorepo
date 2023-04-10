alter table "public"."UnlockableWinner" drop constraint "UnlockableWinner_userId_fkey",
  add constraint "UnlockableWinner_userId_fkey"
  foreign key ("userId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
