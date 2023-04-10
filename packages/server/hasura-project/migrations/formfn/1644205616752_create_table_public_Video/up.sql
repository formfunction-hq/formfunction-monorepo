CREATE TABLE "public"."Video" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "playbackId" text NOT NULL, "status" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("playbackId"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
