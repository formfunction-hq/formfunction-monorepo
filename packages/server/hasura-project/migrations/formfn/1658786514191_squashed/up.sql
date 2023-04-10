
CREATE TABLE "public"."Spotlight" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "type" Text NOT NULL, "objectId" text, "heroUnitLayout" text NOT NULL, "startTime" timestamptz NOT NULL, "endTime" timestamptz NOT NULL, "url" text, "assetId" text, "title" text, "description" text, "status" text, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."SpotlightHeroUnitLayout" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."SpotlightHeroUnitLayout"("value") VALUES (E'Standard');

INSERT INTO "public"."SpotlightHeroUnitLayout"("value") VALUES (E'TwoColumnSquareImage');

alter table "public"."Spotlight"
  add constraint "Spotlight_heroUnitLayout_fkey"
  foreign key ("heroUnitLayout")
  references "public"."SpotlightHeroUnitLayout"
  ("value") on update restrict on delete restrict;

CREATE TABLE "public"."SpotlightType" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."SpotlightType"("value") VALUES (E'Campaign');

INSERT INTO "public"."SpotlightType"("value") VALUES (E'Nft');

INSERT INTO "public"."SpotlightType"("value") VALUES (E'Series');

INSERT INTO "public"."SpotlightType"("value") VALUES (E'Merchandise');

INSERT INTO "public"."SpotlightType"("value") VALUES (E'Adhoc');

alter table "public"."Spotlight"
  add constraint "Spotlight_type_fkey"
  foreign key ("type")
  references "public"."SpotlightType"
  ("value") on update restrict on delete restrict;
