alter table "public"."Series"
  add constraint "Series_creatorId_fkey"
  foreign key ("creatorId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
