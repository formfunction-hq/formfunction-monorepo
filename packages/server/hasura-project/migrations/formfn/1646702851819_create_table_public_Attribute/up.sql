CREATE TABLE "public"."Attribute" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "traitType" text NOT NULL, "value" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("traitType", "value"));COMMENT ON TABLE "public"."Attribute" IS E'Attribute objects which represent NFT metadata attributes';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
