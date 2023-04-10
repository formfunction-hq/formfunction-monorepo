CREATE TABLE "public"."CollectorSurvey" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "recommend" integer NOT NULL, "seanEllis" text NOT NULL, "why1" text NOT NULL, "why2" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
