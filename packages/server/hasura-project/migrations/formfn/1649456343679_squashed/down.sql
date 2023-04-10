
alter table "public"."Claims" drop constraint "Claims_claimNftTransactionId_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."Claims" add column "claimNftTransactionId" uuid
--  null unique;

comment on column "public"."Claims"."claimTxid" is E'Tracks eligible claims for participation NFT distributions to auction bidders';
alter table "public"."Claims" add constraint "Claims_claimTxid_key" unique (claimTxid);
alter table "public"."Claims" alter column "claimTxid" drop not null;
alter table "public"."Claims" add column "claimTxid" text;

DROP TABLE "public"."Claims";
