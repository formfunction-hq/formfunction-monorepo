alter table "public"."Series" add constraint "Series_creatorId_slug_key" unique ("creatorId", "slug");
