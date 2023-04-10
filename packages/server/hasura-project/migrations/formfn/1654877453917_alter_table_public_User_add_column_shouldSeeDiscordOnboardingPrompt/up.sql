alter table "public"."User" add column "shouldSeeDiscordOnboardingPrompt" Boolean
 not null default 'true';
