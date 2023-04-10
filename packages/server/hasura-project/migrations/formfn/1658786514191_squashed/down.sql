
alter table "public"."Spotlight" drop constraint "Spotlight_type_fkey";

DELETE FROM "public"."SpotlightType" WHERE "value" = 'Adhoc';

DELETE FROM "public"."SpotlightType" WHERE "value" = 'Merchandise';

DELETE FROM "public"."SpotlightType" WHERE "value" = 'Series';

DELETE FROM "public"."SpotlightType" WHERE "value" = 'Nft';

DELETE FROM "public"."SpotlightType" WHERE "value" = 'Campaign';

DROP TABLE "public"."SpotlightType";

alter table "public"."Spotlight" drop constraint "Spotlight_heroUnitLayout_fkey";

DELETE FROM "public"."SpotlightHeroUnitLayout" WHERE "value" = 'TwoColumnSquareImage';

DELETE FROM "public"."SpotlightHeroUnitLayout" WHERE "value" = 'Standard';

DROP TABLE "public"."SpotlightHeroUnitLayout";

DROP TABLE "public"."Spotlight";
