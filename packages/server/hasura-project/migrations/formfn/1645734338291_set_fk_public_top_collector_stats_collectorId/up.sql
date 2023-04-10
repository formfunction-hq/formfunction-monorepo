alter table "public"."top_collector_stats"
  add constraint "top_collector_stats_collectorId_fkey"
  foreign key ("collectorId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
