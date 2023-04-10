import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import getUrlWithoutParam from "utils/getUrlWithoutParam";
import getUrlWithParam from "utils/getUrlWithParam";

/**
 * Used to wrap a setter function returned by useState.
 *
 * The returned function will call the setter function, in addition
 * to navigating to a URL with different URL params.
 */
export default function wrapSetterWithNavigation<T>(
  setter: Dispatch<SetStateAction<T>>,
  key: string,
  navigate: NavigateFunction,
  callback?: (item: T) => void,
  valFunction: (item: T) => MaybeUndef<string> = (item: T) =>
    item as unknown as MaybeUndef<string>
) {
  return (originalVal: T) => {
    setter(originalVal);
    if (callback != null) {
      callback(originalVal);
    }

    const urlParamVal = valFunction(originalVal);
    if (urlParamVal == null) {
      navigate(getUrlWithoutParam(key));
    }
    if (urlParamVal != null) {
      navigate(getUrlWithParam(key, urlParamVal));
    }
  };
}
