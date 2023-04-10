alter table "public"."NftMetadata"
  add constraint "NftMetadata_videoPlaybackId_fkey"
  foreign key ("videoPlaybackId")
  references "public"."Video"
  ("playbackId") on update restrict on delete restrict;
