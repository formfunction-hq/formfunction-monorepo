alter table "public"."ActivityNotification" drop constraint "ActivityNotification_notificationId_fkey",
  add constraint "ActivityNotification_notificationId_fkey"
  foreign key ("notificationId")
  references "public"."Notification"
  ("id") on update cascade on delete cascade;
