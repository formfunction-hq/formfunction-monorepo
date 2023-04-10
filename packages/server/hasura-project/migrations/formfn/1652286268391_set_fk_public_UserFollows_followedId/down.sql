alter table "public"."UserFollows" drop constraint "UserFollows_followedId_fkey",
  add constraint "UserFollows_followedId_fkey"
  foreign key ("followedId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
