alter table "public"."ArtistSubmission"
  add constraint "ArtistSubmission_status_fkey"
  foreign key ("status")
  references "public"."ArtistSubmissionStatus"
  ("value") on update restrict on delete restrict;
