import ContentTypeForFilters from "types/enums/ContentTypeForFilters";

export default function getContentTypeSetFromUrlParam(
  urlParamVal: string
): Set<ContentTypeForFilters> {
  const contentTypeList = urlParamVal.split(",") || [];
  return new Set(
    contentTypeList.filter(
      (val) => val in ContentTypeForFilters
    ) as Array<ContentTypeForFilters>
  );
}
