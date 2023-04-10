alter table "public"."Post"
  add constraint "Post_creatorId_fkey"
  foreign key ("creatorId")
  references "public"."User"
  ("id") on update cascade on delete cascade;
