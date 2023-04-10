
alter table "public"."Nft" add column "seriesRarityBasisPoints" integer
 null;

alter table "public"."NftToAttribute" add column "seriesId" text
 null;

alter table "public"."NftToAttribute"
  add constraint "NftToAttribute_seriesId_fkey"
  foreign key ("seriesId")
  references "public"."Series"
  ("id") on update restrict on delete restrict;

alter table "public"."NftToAttribute" add column "rarityBasisPoints" integer
 null;

INSERT INTO "public"."NftTransactionType"("value") VALUES (E'SoldGenerativeMint');

INSERT INTO "public"."NotificationType"("value") VALUES (E'OwnerGenerativeMintSoldOut');

alter table "public"."Series" add column "type" text
 not null default 'UserCurated';

alter table "public"."Series"
  add constraint "Series_type_fkey"
  foreign key ("type")
  references "public"."SeriesType"
  ("value") on update restrict on delete restrict;
