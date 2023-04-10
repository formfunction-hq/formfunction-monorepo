alter table "public"."DiscordAuth" drop constraint "DiscordAuth_userId_fkey",
  add constraint "DiscordAuth_userId_fkey"
  foreign key ("userId")
  references "public"."User"
  ("id") on update cascade on delete cascade;
