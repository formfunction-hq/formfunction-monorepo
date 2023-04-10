alter table "public"."PollResponse" drop constraint "PollResponse_userId_fkey",
  add constraint "PollResponse_userId_fkey"
  foreign key ("userId")
  references "public"."User"
  ("id") on update cascade on delete cascade;
