alter table "public"."Nft" add column "auctionDurationInSeconds" integer
 not null default '86400';
