alter table "public"."DiscordAuth" add constraint "DiscordAuth_authorizationNonce_key" unique ("authorizationNonce");
