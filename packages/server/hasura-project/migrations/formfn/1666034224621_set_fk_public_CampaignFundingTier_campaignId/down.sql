alter table "public"."CampaignFundingTier" drop constraint "CampaignFundingTier_campaignId_fkey",
  add constraint "CampaignFundingTier_campaignId_fkey"
  foreign key ("campaignId")
  references "public"."Campaign"
  ("id") on update restrict on delete restrict;
