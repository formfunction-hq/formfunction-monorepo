
DELETE FROM "public"."NotificationChannel" WHERE "value" = 'Email';

DELETE FROM "public"."NotificationChannel" WHERE "value" = 'ActivityFeed';

DROP TABLE "public"."NotificationChannel";
