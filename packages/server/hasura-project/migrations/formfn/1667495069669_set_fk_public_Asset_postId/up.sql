alter table "public"."Asset"
  add constraint "Asset_postId_fkey"
  foreign key ("postId")
  references "public"."Post"
  ("id") on update cascade on delete cascade;
