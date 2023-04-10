alter table "public"."CampaignToTeamMember"
  add constraint "CampaignToTeamMember_role_fkey"
  foreign key ("role")
  references "public"."CampaignTeamMemberRole"
  ("value") on update cascade on delete cascade;
