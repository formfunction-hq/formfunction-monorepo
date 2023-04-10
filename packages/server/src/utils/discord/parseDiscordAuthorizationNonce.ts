import dayjs, { Dayjs } from "dayjs";
import DISCORD_AUTHORIZATION_NONCE_SEPARATOR from "src/constants/DiscordAuthorizationNonceSeparator";
import { DiscordAuthorizationNonce } from "src/types/DiscordAuthorizationNonce";
import { RedirectLocation_Enum } from "src/__generated__/generated";

type ParsedDiscordAuthorizationNonce = {
  expiration: Dayjs;
  redirectLocation: RedirectLocation_Enum;
};

export default function parseDiscordAuthorizationNonce(
  authorizationNonce: string
): ParsedDiscordAuthorizationNonce {
  const [expiration, _, redirectLocation] = authorizationNonce.split(
    DISCORD_AUTHORIZATION_NONCE_SEPARATOR
  ) as DiscordAuthorizationNonce;

  return {
    expiration: dayjs(Number(expiration)),
    redirectLocation,
  };
}
