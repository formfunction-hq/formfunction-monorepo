const botToken = String(process.env.DISCORD_BOT_TOKEN);
const clientSecret = String(process.env.DISCORD_CLIENT_SECRET);
const clientId = String(process.env.DISCORD_CLIENT_ID);

const apiRequestHeaders = { headers: { Authorization: `Bot ${botToken}` } };

const discordApiBase = "https://discord.com/api";
const redirectUri = `${process.env.API_URL}/social/discordCallback`;

// This is the Formfunction Discord Server id.
const guildId = "926690312817106994";

const DISCORD_AUTH_CONFIG = {
  apiRequestHeaders,
  clientId,
  clientSecret,
  discordApiBase,
  guildId,
  redirectUri,
};

export default DISCORD_AUTH_CONFIG;
