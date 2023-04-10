CREATE TABLE "public"."VoteReason" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));COMMENT ON TABLE "public"."VoteReason" IS E'Reason for making a vote';
