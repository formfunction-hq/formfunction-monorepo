alter table "public"."Asset" drop constraint "Asset_artistSubmissionId_fkey",
  add constraint "Asset_artistSubmissionId_fkey"
  foreign key ("artistSubmissionId")
  references "public"."ArtistSubmission"
  ("id") on update restrict on delete cascade;
