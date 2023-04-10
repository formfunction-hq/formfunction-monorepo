import ContentTypeFilter from "components/pages/common/nft-filters/ContentTypeFilter";
import useGenerativeSeriesContext from "hooks/useGenerativeSeriesContext";

// TODO[@arcticmatt]: eventually, we should only show the content types that are actually present in the generative series.
// For now, this is only going to be used for Popheadz, so we can skip that since we know Popheadz has animated + static image NFTs.
export default function GenerativeSeriesContentTypeFilter() {
  const { addContentType, contentTypeSet, removeContentType } =
    useGenerativeSeriesContext();

  return (
    <ContentTypeFilter
      addContentType={addContentType}
      contentTypes={contentTypeSet}
      removeContentType={removeContentType}
    />
  );
}
