alter table "public"."PollResponse" drop constraint "PollResponse_userId_fkey",
  add constraint "PollResponse_userId_fkey"
  foreign key ("pollOptionId")
  references "public"."PollOption"
  ("id") on update cascade on delete cascade;
