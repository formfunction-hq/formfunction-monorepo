alter table "public"."UserFollows" drop constraint "UserFollows_followerId_fkey",
  add constraint "UserFollows_followerId_fkey"
  foreign key ("followerId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
