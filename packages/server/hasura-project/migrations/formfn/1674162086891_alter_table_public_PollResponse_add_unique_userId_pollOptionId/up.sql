alter table "public"."PollResponse" add constraint "PollResponse_userId_pollOptionId_key" unique ("userId", "pollOptionId");
