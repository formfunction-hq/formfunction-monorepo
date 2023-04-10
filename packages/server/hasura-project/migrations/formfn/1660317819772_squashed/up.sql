
CREATE TABLE "public"."Currency" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "decimals" Integer NOT NULL, "symbol" text NOT NULL, "shortSymbol" text, "iconSrc" text, "mint" text, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("name"), UNIQUE ("mint"), CONSTRAINT "DecimalsIsPositiveInteger" CHECK (decimals >= 0));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

comment on column "public"."Currency"."shortSymbol" is E'Short symbol used for currency, e.g., $, ◎';

comment on column "public"."Currency"."symbol" is E'Symbol used for currency, e.g., SOL, USDC, USD';

CREATE TABLE "public"."CurrencyName" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."CurrencyName"("value") VALUES (E'Solana');

alter table "public"."Currency"
  add constraint "Currency_name_fkey"
  foreign key ("name")
  references "public"."CurrencyName"
  ("value") on update restrict on delete restrict;

INSERT INTO "public"."Currency"("id", "name", "decimals", "symbol", "shortSymbol", "iconSrc", "mint") VALUES (E'451d3526-8aea-4b8b-b062-9b4c93e46c82', E'Solana', 9, E'SOL', E'◎', E'https://formfunction.imgix.net/currency/solana/logo.png', E'So11111111111111111111111111111111111111112');
