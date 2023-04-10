alter table "public"."ArtistSubmission" drop constraint "ArtistSubmission_userId_fkey",
  add constraint "ArtistSubmission_userId_fkey"
  foreign key ("userId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
