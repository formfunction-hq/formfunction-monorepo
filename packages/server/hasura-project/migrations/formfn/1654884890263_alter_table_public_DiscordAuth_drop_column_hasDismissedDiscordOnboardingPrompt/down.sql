comment on column "public"."DiscordAuth"."hasDismissedDiscordOnboardingPrompt" is E'Records Discord account information for users to facilitate automatic Discord role provisioning';
alter table "public"."DiscordAuth" alter column "hasDismissedDiscordOnboardingPrompt" drop not null;
alter table "public"."DiscordAuth" add column "hasDismissedDiscordOnboardingPrompt" bool;
