alter table "public"."UnlockableWinner" rename column "hasBuyerDismissedShareInfoCta" to "hasUserDismissedPromptToShareInfo";
comment on column "public"."UnlockableWinner"."hasUserDismissedPromptToShareInfo" is NULL;
