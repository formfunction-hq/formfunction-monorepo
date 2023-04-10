CREATE TABLE "public"."Post" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "timeCreated" timestamptz NOT NULL DEFAULT now(), "title" text NOT NULL, "body" text, "link" text, "campaignId" uuid, PRIMARY KEY ("id") , FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
