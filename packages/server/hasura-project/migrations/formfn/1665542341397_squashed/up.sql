
CREATE TABLE "public"."CampaignBenefitStatus" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."CampaignBenefitStatus"("value") VALUES (E'Granted');

INSERT INTO "public"."CampaignBenefitStatus"("value") VALUES (E'Ongoing');

INSERT INTO "public"."CampaignBenefitStatus"("value") VALUES (E'Pending');

CREATE TABLE "public"."CampaignCategory" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Art');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Brand');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Comics');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Culture');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'DanceAndTheater');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Design');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Education');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Fashion');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'FilmAndVideo');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Food');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Games');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Music');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Photography');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Podcasts');

INSERT INTO "public"."CampaignCategory"("value") VALUES (E'Writing');

CREATE TABLE "public"."CampaignColorScheme" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."CampaignColorScheme"("value") VALUES (E'BrightGrayMediumBlue');

INSERT INTO "public"."CampaignColorScheme"("value") VALUES (E'AliceBlueSinopia');

INSERT INTO "public"."CampaignColorScheme"("value") VALUES (E'CulturedCadmiumGreen');

INSERT INTO "public"."CampaignColorScheme"("value") VALUES (E'SeashellMaximumRed');

INSERT INTO "public"."CampaignColorScheme"("value") VALUES (E'BrightGrayMidnightBlue');

INSERT INTO "public"."CampaignColorScheme"("value") VALUES (E'AntiFlashWhiteDarkGunmetal');

CREATE TABLE "public"."CampaignGoalType" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."CampaignGoalType"("value") VALUES (E'Monetary');

INSERT INTO "public"."CampaignGoalType"("value") VALUES (E'SaleCount');

CREATE TABLE "public"."CampaignStatus" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."CampaignStatus"("value") VALUES (E'Approved');

INSERT INTO "public"."CampaignStatus"("value") VALUES (E'Concluded');

INSERT INTO "public"."CampaignStatus"("value") VALUES (E'Draft');

INSERT INTO "public"."CampaignStatus"("value") VALUES (E'Pending');

INSERT INTO "public"."CampaignStatus"("value") VALUES (E'Published');

INSERT INTO "public"."CampaignStatus"("value") VALUES (E'Rejected');

CREATE TABLE "public"."CampaignFundingTierType" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."CampaignFundingTierType"("value") VALUES (E'Gacha');

INSERT INTO "public"."CampaignFundingTierType"("value") VALUES (E'Standard');
