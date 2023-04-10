
DELETE FROM "public"."CampaignFundingTierType" WHERE "value" = 'Standard';

DELETE FROM "public"."CampaignFundingTierType" WHERE "value" = 'Gacha';

DROP TABLE "public"."CampaignFundingTierType";

DELETE FROM "public"."CampaignStatus" WHERE "value" = 'Rejected';

DELETE FROM "public"."CampaignStatus" WHERE "value" = 'Published';

DELETE FROM "public"."CampaignStatus" WHERE "value" = 'Pending';

DELETE FROM "public"."CampaignStatus" WHERE "value" = 'Draft';

DELETE FROM "public"."CampaignStatus" WHERE "value" = 'Concluded';

DELETE FROM "public"."CampaignStatus" WHERE "value" = 'Approved';

DROP TABLE "public"."CampaignStatus";

DELETE FROM "public"."CampaignGoalType" WHERE "value" = 'SaleCount';

DELETE FROM "public"."CampaignGoalType" WHERE "value" = 'Monetary';

DROP TABLE "public"."CampaignGoalType";

DELETE FROM "public"."CampaignColorScheme" WHERE "value" = 'AntiFlashWhiteDarkGunmetal';

DELETE FROM "public"."CampaignColorScheme" WHERE "value" = 'BrightGrayMidnightBlue';

DELETE FROM "public"."CampaignColorScheme" WHERE "value" = 'SeashellMaximumRed';

DELETE FROM "public"."CampaignColorScheme" WHERE "value" = 'CulturedCadmiumGreen';

DELETE FROM "public"."CampaignColorScheme" WHERE "value" = 'AliceBlueSinopia';

DELETE FROM "public"."CampaignColorScheme" WHERE "value" = 'BrightGrayMediumBlue';

DROP TABLE "public"."CampaignColorScheme";

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Writing';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Podcasts';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Photography';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Music';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Games';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Food';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'FilmAndVideo';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Fashion';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Education';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Design';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'DanceAndTheater';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Culture';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Comics';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Brand';

DELETE FROM "public"."CampaignCategory" WHERE "value" = 'Art';

DROP TABLE "public"."CampaignCategory";

DELETE FROM "public"."CampaignBenefitStatus" WHERE "value" = 'Pending';

DELETE FROM "public"."CampaignBenefitStatus" WHERE "value" = 'Ongoing';

DELETE FROM "public"."CampaignBenefitStatus" WHERE "value" = 'Granted';

DROP TABLE "public"."CampaignBenefitStatus";
