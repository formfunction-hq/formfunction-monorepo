import DiscordAuthCallbackFailureReason from "formfn-shared/dist/types/enums/DiscordAuthCallbackFailureReason";

export type ParsedDiscordAuthParams = {
  failureReason?: DiscordAuthCallbackFailureReason;
  success: boolean;
};
