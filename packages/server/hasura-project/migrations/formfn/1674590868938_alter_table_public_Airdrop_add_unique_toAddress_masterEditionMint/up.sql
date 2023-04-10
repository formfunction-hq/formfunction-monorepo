alter table "public"."Airdrop" drop constraint "Airdrop_masterEditionMint_standardEditionMint_key";
alter table "public"."Airdrop" add constraint "Airdrop_toAddress_masterEditionMint_key" unique ("toAddress", "masterEditionMint");
