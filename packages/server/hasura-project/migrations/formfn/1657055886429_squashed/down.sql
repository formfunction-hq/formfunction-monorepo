
alter table "public"."CreatorInvite" rename column "inviteLinkTimeCreated" to "InviteLinkTimeCreated";

alter table "public"."CreatorInvite" rename column "InviteLinkTimeCreated" to "timeInviteLinkCreated";

alter table "public"."CreatorInvite" rename column "timeInviteLinkCreated" to "inviteLinkCreatedDate";


alter table "public"."CreatorInvite" rename column "inviteLinkExpirationTime" to "inviteLinkExpiryDate";

alter table "public"."CreatorInvite" rename column "expirationTime" to "expiryDate";

alter table "public"."CreatorInvite" rename column "timeCreated" to "createdDate";

alter table "public"."CreatorInvite" rename column "timeAccepted" to "acceptedDate";

alter table "public"."CreatorInvite" alter column "inviteLinkToken" set not null;

alter table "public"."CreatorInvite" drop constraint "CreatorInvite_pkey";
alter table "public"."CreatorInvite"
    add constraint "CreatorInvite_pkey"
    primary key ("id", "inviteLinkToken");

alter table "public"."CreatorInvite" drop constraint "CreatorInvite_issueReason_fkey";

DELETE FROM "public"."CreatorInviteIssueReason" WHERE "value" = 'AdvocateProgram';

DROP TABLE "public"."CreatorInviteIssueReason";

DROP TABLE "public"."CreatorInvite";
