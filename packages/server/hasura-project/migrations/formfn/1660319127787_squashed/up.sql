
CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."Nft" add column "currencyId" uuid
 null default '451d3526-8aea-4b8b-b062-9b4c93e46c82';

alter table "public"."Nft"
  add constraint "Nft_currencyId_fkey"
  foreign key ("currencyId")
  references "public"."Currency"
  ("id") on update restrict on delete restrict;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."NftListing" add column "currencyId" uuid
 null default '451d3526-8aea-4b8b-b062-9b4c93e46c82';

alter table "public"."NftListing"
  add constraint "NftListing_currencyId_fkey"
  foreign key ("currencyId")
  references "public"."Currency"
  ("id") on update restrict on delete restrict;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."NftTransaction" add column "currencyId" uuid
 null default '451d3526-8aea-4b8b-b062-9b4c93e46c82';

alter table "public"."NftTransaction"
  add constraint "NftTransaction_currencyId_fkey"
  foreign key ("currencyId")
  references "public"."Currency"
  ("id") on update restrict on delete restrict;
