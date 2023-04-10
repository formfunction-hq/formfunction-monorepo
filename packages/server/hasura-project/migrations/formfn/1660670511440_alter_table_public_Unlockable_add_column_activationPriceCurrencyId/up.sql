CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."Unlockable" add column "activationPriceCurrencyId" uuid
 null default '451d3526-8aea-4b8b-b062-9b4c93e46c82';
