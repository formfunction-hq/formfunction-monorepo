alter table "public"."CampaignToTeamMember" add constraint "CampaignToTeamMember_campaignId_memberId_key" unique ("campaignId", "memberId");
