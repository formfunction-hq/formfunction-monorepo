alter table "public"."Post"
  add constraint "Post_visibility_fkey"
  foreign key ("visibility")
  references "public"."PostVisibility"
  ("value") on update cascade on delete cascade;
