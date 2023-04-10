/* eslint-disable no-restricted-syntax */
import { Event, Severity } from "@sentry/react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import targetIncludesAny from "formfn-shared/dist/utils/array/targetIncludesAny";

// Shorthand constants
const error = Severity.Error;
const fatal = Severity.Fatal;
const info = Severity.Info;
const warning = Severity.Warning;

const ERROR_MESSAGES_FOR_SEVERITIES = {
  [error]: [],
  [fatal]: [],
  [info]: ["Cannot assign to read only property 'chainId' of object '#<l>'"],
  [warning]: [
    "ResizeObserver loop limit exceeded",
    "The node to be removed is not a child of this node.",
    "Cannot assign to read only property 'solana'",
    "This SourceBuffer has been removed from the parent media source.",
    "Request aborted",
    "Network Error",
    "NotAllowedError: Write permission denied.",
    "privateSpecialRepair is not defined",
    "TypeError: Network request failed",
    "A network error occurred",
    "The fetching process for the media resource was aborted by the user agent at the user's request.",
    "Failed to read the 'localStorage' property from 'Window': Access is denied for this document.",
    "Cannot redefine property: solana",
    "Illegal invocation",
    "Failed to execute 'sendBeacon' on 'Navigator': sendBeacon() with a Blob whose type is not any of the CORS-safelisted values for the Content-Type request header is disabled temporarily. See http://crbug.com/490015 for details.",
    // Seems specific to IG browser, doesn't affect UX https://stackoverflow.com/questions/72720387/cant-find-variable-autofillcallbackhandler
    "Can't find variable: _AutofillCallbackHandler",
    "Cannot redefine property: glow",
  ],
};

export default function getSentryEventSeverity(event: Event): Maybe<Severity> {
  const exceptions = event.exception?.values;

  if (exceptions == null || exceptions.length === 0) {
    return null;
  }

  const severities = [info, warning, error, fatal] as const;
  for (const severity of severities) {
    const messagesForLevel = ERROR_MESSAGES_FOR_SEVERITIES[severity];
    for (const exception of exceptions) {
      if (targetIncludesAny(exception.value ?? "", messagesForLevel)) {
        return severity;
      }
    }
  }

  return null;
}
