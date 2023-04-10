alter table "public"."PollResponse"
  add constraint "PollResponse_pollOptionId_fkey"
  foreign key ("pollOptionId")
  references "public"."PollOption"
  ("id") on update cascade on delete cascade;
