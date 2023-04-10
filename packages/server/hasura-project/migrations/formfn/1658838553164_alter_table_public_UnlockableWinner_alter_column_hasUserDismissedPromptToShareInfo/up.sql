comment on column "public"."UnlockableWinner"."hasUserDismissedPromptToShareInfo" is E'Set to true if the buyer chooses to dismiss the "Share Info" call to action in the UI';
alter table "public"."UnlockableWinner" rename column "hasUserDismissedPromptToShareInfo" to "hasBuyerDismissedShareInfoCta";
