alter table "public"."Notification" drop constraint "Notification_receiver_fkey",
  add constraint "Notification_receiver_fkey"
  foreign key ("receiver")
  references "public"."User"
  ("id") on update restrict on delete restrict;
