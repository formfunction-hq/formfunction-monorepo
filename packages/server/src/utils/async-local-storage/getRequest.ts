import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { Request } from "express";
import ASYNC_LOCAL_STORAGE from "src/constants/AsyncLocalStorage";
import AsyncLocalStorageKey from "src/types/enums/AsyncLocalStorageKey";

// TODO[@arcticmatt]: delete request parameters (e.g. in logError and logEvent),
// and use this instead (barring any perf degradation)
export default function getRequest(): MaybeUndef<Request> {
  return ASYNC_LOCAL_STORAGE.getStore()?.get(AsyncLocalStorageKey.Request);
}
