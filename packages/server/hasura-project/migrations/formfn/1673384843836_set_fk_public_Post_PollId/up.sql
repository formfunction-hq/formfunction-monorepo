alter table "public"."Post"
  add constraint "Post_PollId_fkey"
  foreign key ("PollId")
  references "public"."Poll"
  ("id") on update restrict on delete restrict;
