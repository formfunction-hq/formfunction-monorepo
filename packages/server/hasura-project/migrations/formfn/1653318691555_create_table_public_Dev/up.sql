CREATE TABLE "public"."Dev" ("name" text NOT NULL, "date" timestamptz, "number" integer NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , UNIQUE ("id"));COMMENT ON TABLE "public"."Dev" IS E'Table used for development/testing';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
