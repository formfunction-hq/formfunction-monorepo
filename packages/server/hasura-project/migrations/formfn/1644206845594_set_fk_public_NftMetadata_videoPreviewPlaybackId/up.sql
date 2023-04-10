alter table "public"."NftMetadata"
  add constraint "NftMetadata_videoPreviewPlaybackId_fkey"
  foreign key ("videoPreviewPlaybackId")
  references "public"."Video"
  ("playbackId") on update restrict on delete restrict;
