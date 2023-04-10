
DELETE FROM "public"."Currency" WHERE "id" = '451d3526-8aea-4b8b-b062-9b4c93e46c82';

alter table "public"."Currency" drop constraint "Currency_name_fkey";

DELETE FROM "public"."CurrencyName" WHERE "value" = 'Solana';

DROP TABLE "public"."CurrencyName";

comment on column "public"."Currency"."symbol" is NULL;

comment on column "public"."Currency"."shortSymbol" is NULL;

DROP TABLE "public"."Currency";
