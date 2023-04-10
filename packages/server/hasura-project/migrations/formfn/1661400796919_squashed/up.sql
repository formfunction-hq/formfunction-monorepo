
alter table "public"."ActivityNotification" add column "nftId" text
 null;

alter table "public"."ActivityNotification" add column "nftTransactionId" uuid
 null;

alter table "public"."ActivityNotification"
  add constraint "ActivityNotification_nftId_fkey"
  foreign key ("nftId")
  references "public"."Nft"
  ("id") on update restrict on delete restrict;

alter table "public"."ActivityNotification"
  add constraint "ActivityNotification_nftTransactionId_fkey"
  foreign key ("nftTransactionId")
  references "public"."NftTransaction"
  ("id") on update cascade on delete cascade;

alter table "public"."ActivityNotification" drop constraint "ActivityNotification_nftId_fkey",
  add constraint "ActivityNotification_nftId_fkey"
  foreign key ("nftId")
  references "public"."Nft"
  ("id") on update cascade on delete cascade;
