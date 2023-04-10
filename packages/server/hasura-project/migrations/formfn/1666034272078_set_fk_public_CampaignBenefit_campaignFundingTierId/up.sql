alter table "public"."CampaignBenefit" drop constraint "CampaignBenefit_campaignFundingTierId_fkey",
  add constraint "CampaignBenefit_campaignFundingTierId_fkey"
  foreign key ("campaignFundingTierId")
  references "public"."CampaignFundingTier"
  ("id") on update cascade on delete cascade;
