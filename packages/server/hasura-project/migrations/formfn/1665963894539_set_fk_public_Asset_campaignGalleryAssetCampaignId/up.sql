alter table "public"."Asset"
  add constraint "Asset_campaignGalleryAssetCampaignId_fkey"
  foreign key ("campaignGalleryAssetCampaignId")
  references "public"."Campaign"
  ("id") on update cascade on delete cascade;
