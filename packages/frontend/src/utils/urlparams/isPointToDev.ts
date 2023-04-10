import UrlParam from "types/enums/UrlParam";
import getUrlParam from "utils/getUrlParam";

export default function isPointToDev() {
  return getUrlParam(UrlParam.PointToDev) === "1";
}
