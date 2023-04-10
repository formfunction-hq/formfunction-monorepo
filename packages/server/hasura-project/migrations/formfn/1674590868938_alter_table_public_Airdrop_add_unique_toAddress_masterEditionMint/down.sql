alter table "public"."Airdrop" drop constraint "Airdrop_toAddress_masterEditionMint_key";
alter table "public"."Airdrop" add constraint "Airdrop_standardEditionMint_masterEditionMint_key" unique ("standardEditionMint", "masterEditionMint");
