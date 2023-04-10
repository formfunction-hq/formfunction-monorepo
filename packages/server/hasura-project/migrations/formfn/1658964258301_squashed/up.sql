
CREATE TABLE "public"."NotificationChannel" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."NotificationChannel"("value") VALUES (E'ActivityFeed');

INSERT INTO "public"."NotificationChannel"("value") VALUES (E'Email');
