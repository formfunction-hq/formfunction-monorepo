

CREATE TABLE "public"."CreatorInvite" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "acceptedDate" timestamptz, "createdDate" timestamptz NOT NULL DEFAULT now(), "issueReason" text NOT NULL, "ownerId" text NOT NULL, "receiverId" text, "expiryDate" timestamptz, "receiverEmail" text, "inviteLinkToken" text, "inviteLinkCreatedDate" timestamptz, "inviteLinkExpiryDate" timestamptz, PRIMARY KEY ("id","inviteLinkToken") , FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("receiverId") REFERENCES "public"."User"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"), UNIQUE ("inviteLinkToken"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."CreatorInviteIssueReason" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."CreatorInviteIssueReason"("value") VALUES (E'AdvocateProgram');

alter table "public"."CreatorInvite"
  add constraint "CreatorInvite_issueReason_fkey"
  foreign key ("issueReason")
  references "public"."CreatorInviteIssueReason"
  ("value") on update restrict on delete restrict;

BEGIN TRANSACTION;
ALTER TABLE "public"."CreatorInvite" DROP CONSTRAINT "CreatorInvite_pkey";

ALTER TABLE "public"."CreatorInvite"
    ADD CONSTRAINT "CreatorInvite_pkey" PRIMARY KEY ("id");
COMMIT TRANSACTION;

alter table "public"."CreatorInvite" alter column "inviteLinkToken" drop not null;

alter table "public"."CreatorInvite" rename column "acceptedDate" to "timeAccepted";

alter table "public"."CreatorInvite" rename column "createdDate" to "timeCreated";

alter table "public"."CreatorInvite" rename column "expiryDate" to "expirationTime";

alter table "public"."CreatorInvite" rename column "inviteLinkExpiryDate" to "inviteLinkExpirationTime";

alter table "public"."CreatorInvite" rename column "inviteLinkCreatedDate" to "timeInviteLinkCreated";

alter table "public"."CreatorInvite" rename column "timeInviteLinkCreated" to "InviteLinkTimeCreated";

alter table "public"."CreatorInvite" rename column "InviteLinkTimeCreated" to "inviteLinkTimeCreated";
