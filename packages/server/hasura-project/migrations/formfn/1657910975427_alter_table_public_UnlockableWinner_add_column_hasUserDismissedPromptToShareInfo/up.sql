alter table "public"."UnlockableWinner" add column "hasUserDismissedPromptToShareInfo" boolean
 not null default 'false';
