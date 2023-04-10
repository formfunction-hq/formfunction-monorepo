alter table "public"."CampaignBenefit"
  add constraint "CampaignBenefit_status_fkey"
  foreign key (status)
  references "public"."CampaignBenefitStatus"
  (value) on update restrict on delete restrict;
alter table "public"."CampaignBenefit" alter column "status" drop not null;
alter table "public"."CampaignBenefit" add column "status" text;
