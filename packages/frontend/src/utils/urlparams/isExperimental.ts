import UrlParam from "types/enums/UrlParam";
import getUrlParam from "utils/getUrlParam";

export default function isExperimental() {
  return getUrlParam(UrlParam.IsExperimental) === "1";
}
