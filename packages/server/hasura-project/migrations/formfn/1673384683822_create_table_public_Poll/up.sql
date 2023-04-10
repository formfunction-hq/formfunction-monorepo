CREATE TABLE "public"."Poll" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , UNIQUE ("id"));COMMENT ON TABLE "public"."Poll" IS E'Polls that live on the Post table';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
