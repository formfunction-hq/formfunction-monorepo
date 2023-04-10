alter table "public"."Claim" drop constraint "Claim_pkey";
alter table "public"."Claim"
    add constraint "Claim_pkey"
    primary key ("id");
