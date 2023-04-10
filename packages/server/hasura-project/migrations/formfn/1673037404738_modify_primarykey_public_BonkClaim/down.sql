alter table "public"."BonkClaim" drop constraint "BonkClaim_pkey";
alter table "public"."BonkClaim"
    add constraint "BonkClaim_pkey"
    primary key ("id");
