import UrlParam from "types/enums/UrlParam";
import getUrlParam from "utils/getUrlParam";

export default function isPointToProd() {
  return getUrlParam(UrlParam.PointToProd) === "1";
}
