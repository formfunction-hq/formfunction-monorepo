alter table "public"."CandyMachine" rename column "formfnAuthorityId" to "candyMachineAuthorityId";
comment on column "public"."CandyMachine"."candyMachineAuthorityId" is E'Current authority of the onchain Candy Machine';
