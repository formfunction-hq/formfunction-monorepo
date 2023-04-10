alter table "public"."UnlockableWinner" drop constraint "UnlockableWinner_pkey";
alter table "public"."UnlockableWinner"
    add constraint "UnlockableWinner_pkey"
    primary key ("id");
