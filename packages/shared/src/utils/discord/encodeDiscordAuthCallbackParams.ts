import DiscordAuthCallbackFailureReason from "types/enums/DiscordAuthCallbackFailureReason";
import DiscordAuthCallbackParam from "types/enums/DiscordAuthCallbackParam";

export default function encodeDiscordAuthCallbackParams(
  success: boolean,
  failureReason?: DiscordAuthCallbackFailureReason
) {
  const params = new URLSearchParams();
  params.append(DiscordAuthCallbackParam.DiscordAuthSuccess, String(success));
  if (!success && failureReason != null) {
    params.append(DiscordAuthCallbackParam.FailureReason, failureReason);
  }

  return params;
}
