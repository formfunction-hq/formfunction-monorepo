// TODO: use in more places
// See https://nodejs.org/api/errors.html for more info on Error properties
export default function getErrorPropertiesToLog(error: Error | string) {
  try {
    return typeof error === "string"
      ? { errorMessage: error }
      : {
          // @ts-ignore
          cause: error.cause,
          // @ts-ignore
          code: error.code,
          errorMessage: error.message,
          errorName: error.name,
          // E.g. gets populated when axios hits a 500 error
          errorResponseData: (error as any).response?.data,
          // @ts-ignore Only applies to Solana tx failures—attempt to log detailed errors from RPC call
          logs: error.logs,
          stack: error.stack,
        };
  } catch {
    // This shouldn't happen, but just in case...
    return {
      errorMessage: `Unexpected error occurred while calling ${getErrorPropertiesToLog.name}`,
    };
  }
}
