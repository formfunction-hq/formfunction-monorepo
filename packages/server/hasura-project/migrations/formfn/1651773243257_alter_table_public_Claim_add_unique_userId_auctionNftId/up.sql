alter table "public"."Claim" add constraint "Claim_userId_auctionNftId_key" unique ("userId", "auctionNftId");
