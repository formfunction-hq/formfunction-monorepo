alter table "public"."Nft"
  add constraint "Nft_campaignFundingTierId_fkey"
  foreign key ("campaignFundingTierId")
  references "public"."CampaignFundingTier"
  ("id") on update cascade on delete set null;
