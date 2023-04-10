alter table "public"."Offer" drop constraint "Offer_pkey";
alter table "public"."Offer"
    add constraint "Offer_pkey"
    primary key ("id");
