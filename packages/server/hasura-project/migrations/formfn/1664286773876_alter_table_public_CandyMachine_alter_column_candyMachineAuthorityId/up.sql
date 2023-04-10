comment on column "public"."CandyMachine"."candyMachineAuthorityId" is E'Formfunction authority of the onchain Candy Machine';
alter table "public"."CandyMachine" rename column "candyMachineAuthorityId" to "formfnAuthorityId";
