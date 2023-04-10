alter table "public"."UserFollows" add constraint "UserFollows_followedId_followerId_key" unique ("followedId", "followerId");
