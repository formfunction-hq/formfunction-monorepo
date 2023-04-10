CREATE TABLE "public"."PollOption" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "pollId" uuid NOT NULL, "text" Text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("pollId") REFERENCES "public"."Poll"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"));COMMENT ON TABLE "public"."PollOption" IS E'Option on a Poll';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
