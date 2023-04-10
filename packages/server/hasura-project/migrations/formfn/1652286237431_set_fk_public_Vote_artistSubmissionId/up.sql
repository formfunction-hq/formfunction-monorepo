alter table "public"."Vote" drop constraint "Vote_artistSubmissionId_fkey",
  add constraint "Vote_artistSubmissionId_fkey"
  foreign key ("artistSubmissionId")
  references "public"."ArtistSubmission"
  ("id") on update restrict on delete cascade;
