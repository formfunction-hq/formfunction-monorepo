import { customAlphabet } from "nanoid";
import dayjs from "src/utils/dates/dayjsex";
import DISCORD_AUTHORIZATION_NONCE_SEPARATOR from "src/constants/DiscordAuthorizationNonceSeparator";
import { RedirectLocation_Enum } from "src/__generated__/generated";
import { DiscordAuthorizationNonce } from "src/types/DiscordAuthorizationNonce";

/**
 * This authorization nonce helps validate a request to connect a Discord
 * account and associates the request callback with the initiating user.
 *
 * The nonce format is:
 * {expiration-unix-ms-timestamp}~{nanoid}~{RedirectLocation_Enum}.
 * (DiscordAuthorizationNonce.ts type)
 *
 * The nonce is stored on our backend when the request is initiated and the
 * successful authorization callback from Discord must provide a matching,
 * non-expired nonce in the state parameter. The nonce expiry is included
 * as a security measure.
 */
export default function createDiscordAuthorizationNonce(
  redirectLocation: RedirectLocation_Enum
): string {
  const expiration = dayjs.duration(1, "hour");
  const expirationTime = dayjs().add(expiration).valueOf();
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 21);

  const nonce: DiscordAuthorizationNonce = [
    expirationTime,
    nanoid(),
    redirectLocation,
  ];

  return nonce.join(DISCORD_AUTHORIZATION_NONCE_SEPARATOR);
}
