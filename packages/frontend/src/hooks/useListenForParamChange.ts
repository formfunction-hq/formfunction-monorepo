import useQueryParams from "hooks/useQueryParams";
import { useEffect } from "react";

export const EMPTY_PARAM = "none";

/**
 * Use when you want something to happen when a url param changes.
 */
export default function useListenForParamChange<T>({
  paramKey,
  onChange,
  defaultValue,
  validValues,
  emptyValue,
}: {
  defaultValue: T;
  emptyValue?: T;
  onChange: (val: T) => void;
  paramKey: string;
  validValues?: Array<T>;
}) {
  const params = useQueryParams();

  useEffect(() => {
    const paramValue = params.get(paramKey) || "";
    if (paramValue === EMPTY_PARAM) {
      onChange(emptyValue ?? defaultValue);
      return;
    }

    if (
      (validValues == null && paramValue !== "") ||
      validValues?.includes(paramValue as any)
    ) {
      onChange(paramValue as any);
    } else if (paramValue === "") {
      onChange(defaultValue);
    }
  }, [defaultValue, emptyValue, onChange, paramKey, params, validValues]);
}
