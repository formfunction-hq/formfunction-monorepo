alter table "public"."top_creator_stats"
  add constraint "top_creator_stats_creatorId_fkey"
  foreign key ("creatorId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
