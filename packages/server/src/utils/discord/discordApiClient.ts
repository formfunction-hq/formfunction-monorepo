import axios from "axios";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import DISCORD_AUTH_CONFIG from "src/constants/DiscordAuthConfig";
import { URLSearchParams } from "url";

const {
  discordApiBase,
  clientId,
  clientSecret,
  guildId,
  redirectUri,
  apiRequestHeaders,
} = DISCORD_AUTH_CONFIG;

type DiscordOauthResponse = {
  access_token: string;
};

type DiscordUser = {
  avatar: Maybe<string>;
  id: string;
  username: string;
  // ... other fields
};

export type DiscordUserDetail = {
  roles: Array<string>;
  user: DiscordUser;
};

export async function getDiscordOauthToken(code: string): Promise<string> {
  const body = new URLSearchParams();
  body.append("client_id", clientId);
  body.append("client_secret", clientSecret);
  body.append("redirect_uri", redirectUri);
  body.append("scope", "identify");
  body.append("grant_type", "authorization_code");
  body.append("code", code);

  const url = `${discordApiBase}/oauth2/token`;
  const response = await axios.post<DiscordOauthResponse>(url, body);
  return response.data.access_token;
}

export async function getDiscordUserWithOauthToken(
  oauthToken: string
): Promise<DiscordUser> {
  const headers = { headers: { authorization: `Bearer ${oauthToken}` } };
  const url = `${discordApiBase}/users/@me`;
  const response = await axios.get<DiscordUser>(url, headers);
  return response.data;
}

export async function getMemberInGuildByUserIdIfExists(
  userId: string
): Promise<Maybe<DiscordUserDetail>> {
  try {
    const host = "https://discord.com/api";
    const path = `guilds/${guildId}/members/${userId}`;
    const url = `${host}/${path}`;
    const response = await axios.get<DiscordUserDetail>(url, apiRequestHeaders);
    return response.data;
  } catch (_) {
    // Will throw 404 if member is not in our Discord server.
    return null;
  }
}

// Note that the Discord API returns a 204 empty response on success.
// Docs: https://discord.com/developers/docs/resources/guild#add-guild-member-role
export async function addRoleToDiscordUser(
  userId: string,
  roleId: string
): Promise<void> {
  const path = `guilds/${guildId}/members/${userId}/roles/${roleId}`;
  const url = `${discordApiBase}/${path}`;
  await axios.put(url, undefined, apiRequestHeaders);
}

// API also returns 204 empty response here.
export async function removeRoleFromDiscordUser(
  userId: string,
  roleId: string
): Promise<void> {
  const path = `guilds/${guildId}/members/${userId}/roles/${roleId}`;
  const url = `${discordApiBase}/${path}`;
  await axios.delete(url, apiRequestHeaders);
}
