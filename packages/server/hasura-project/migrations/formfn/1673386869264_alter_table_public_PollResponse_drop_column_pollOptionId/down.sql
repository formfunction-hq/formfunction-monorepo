comment on column "public"."PollResponse"."pollOptionId" is E'Responses to a Poll, Responses are tied to PollOptions as well';
alter table "public"."PollResponse" alter column "pollOptionId" drop not null;
alter table "public"."PollResponse" add column "pollOptionId" text;
