/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Context,
  createContext,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useNavigate } from "react-router-dom";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { RedirectLocation_enum } from "components/modal/__generated__/DiscordAuthConnectModalConnectMutation.graphql";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { ParsedDiscordAuthParams } from "types/ParsedDiscordAuthParams";
import parseDiscordAuthCallbackParams from "utils/urlparams/parseDiscordAuthCallbackParams";
import { notify } from "components/toast/notifications";

function convertPathnameToRedirectLocationEnum(
  pathname: string
): Maybe<RedirectLocation_enum> {
  switch (pathname) {
    case "/profile":
      return "Profile";
    case "/profile/edit":
      return "EditProfile";
    case "/apply":
      return "Apply";
    default:
      return null;
  }
}

function shouldContinueDiscordAuthFlowFromRedirect(pathname: string) {
  const redirectLocation = convertPathnameToRedirectLocationEnum(pathname);
  if (redirectLocation == null) {
    return false;
  }

  switch (redirectLocation) {
    case "Profile":
    case "EditProfile":
      return true;
    case "Apply":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(redirectLocation);
  }
}

type DisplayDiscordAuthConnectModalArgs = {
  onlyDisplayJoinDiscordSteps?: boolean;
  redirectLocation: RedirectLocation_enum;
};

export type DiscordAuthContextData = {
  callbackQueryParams: Maybe<ParsedDiscordAuthParams>;
  displayDiscordAuthConnectModal: (
    args: DisplayDiscordAuthConnectModalArgs
  ) => void;
  hideDiscordAuthConnectModal: (value: SetStateAction<boolean>) => void;
  isDiscordAuthConnectModalShown: boolean;
  isDiscordAuthDisconnectModalShown: boolean;
  onlyDisplayJoinDiscordSteps: boolean;
  redirectLocation: RedirectLocation_enum;
  setIsDiscordAuthDisconnectModalShown: (
    value: SetStateAction<boolean>
  ) => void;
};

const DEFAULT_STATE = {
  callbackQueryParams: null,
  isDiscordAuthConnectModalShown: false,
  isDiscordAuthDisconnectModalShown: false,
  isJoinDiscordOnly: false,
  redirectLocation: "EditProfile" as RedirectLocation_enum,
};

export const DiscordAuthContext: Context<DiscordAuthContextData> =
  createContext<DiscordAuthContextData>({
    callbackQueryParams: DEFAULT_STATE.callbackQueryParams,
    displayDiscordAuthConnectModal: emptyFunction,
    hideDiscordAuthConnectModal: emptyFunction,
    isDiscordAuthConnectModalShown:
      DEFAULT_STATE.isDiscordAuthConnectModalShown,
    isDiscordAuthDisconnectModalShown:
      DEFAULT_STATE.isDiscordAuthDisconnectModalShown,
    onlyDisplayJoinDiscordSteps: DEFAULT_STATE.isJoinDiscordOnly,
    redirectLocation: DEFAULT_STATE.redirectLocation,
    setIsDiscordAuthDisconnectModalShown: emptyFunction,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function DiscordAuthContextProvider(props: ProviderProps): JSX.Element {
  const navigate = useNavigate();
  const [isDiscordAuthConnectModalShown, setIsDiscordAuthConnectModalShown] =
    useState(false);
  const [
    isDiscordAuthDisconnectModalShown,
    setIsDiscordAuthDisconnectModalShown,
  ] = useState(false);
  const [onlyDisplayJoinDiscordSteps, setOnlyDisplayJoinDiscordSteps] =
    useState(false);
  const [redirectLocation, setRedirectLocation] =
    useState<RedirectLocation_enum>("EditProfile");
  const [callbackQueryParams, setCallbackQueryParams] =
    useState<Maybe<ParsedDiscordAuthParams>>(null);

  const displayDiscordAuthConnectModal = (
    args: DisplayDiscordAuthConnectModalArgs
  ) => {
    setIsDiscordAuthConnectModalShown(true);
    setRedirectLocation(args.redirectLocation);
    setOnlyDisplayJoinDiscordSteps(args.onlyDisplayJoinDiscordSteps ?? false);
  };

  const hideDiscordAuthConnectModal = () => {
    setCallbackQueryParams(DEFAULT_STATE.callbackQueryParams);
    setIsDiscordAuthConnectModalShown(
      DEFAULT_STATE.isDiscordAuthConnectModalShown
    );
    setOnlyDisplayJoinDiscordSteps(DEFAULT_STATE.isJoinDiscordOnly);
    setRedirectLocation(DEFAULT_STATE.redirectLocation);
  };

  const { search, pathname } = window.location;

  useEffect(() => {
    if (search !== "") {
      const parsedParams = parseDiscordAuthCallbackParams(
        new URLSearchParams(search)
      );

      if (!shouldContinueDiscordAuthFlowFromRedirect(pathname)) {
        if (parsedParams != null && parsedParams.success === false) {
          notify({
            description:
              parsedParams.failureReason || "An unexpected error occurred.",
            type: "error",
          });
        }

        return;
      }

      // The Connect modal should be displayed if we decoded any params from
      // the redirect to show success/failure states.
      if (parsedParams != null) {
        setCallbackQueryParams(parsedParams);
        setIsDiscordAuthConnectModalShown(true);
      }

      // Remove the query params from the url without reload.
      navigate(pathname, { replace: true });
    }
    // Only run this hook once (on first render).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DiscordAuthContext.Provider
      value={{
        callbackQueryParams,
        displayDiscordAuthConnectModal,
        hideDiscordAuthConnectModal,
        isDiscordAuthConnectModalShown,
        isDiscordAuthDisconnectModalShown,
        onlyDisplayJoinDiscordSteps,
        redirectLocation,
        setIsDiscordAuthDisconnectModalShown,
      }}
    >
      {props.children}
    </DiscordAuthContext.Provider>
  );
}
