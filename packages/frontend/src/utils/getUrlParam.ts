import getUrlParams from "utils/getUrlParams";

export default function getUrlParam(paramKey: string) {
  return getUrlParams().get(paramKey);
}
