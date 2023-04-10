alter table "public"."Comment"
  add constraint "Comment_parentCommentId_fkey"
  foreign key ("parentCommentId")
  references "public"."Comment"
  ("id") on update restrict on delete restrict;
