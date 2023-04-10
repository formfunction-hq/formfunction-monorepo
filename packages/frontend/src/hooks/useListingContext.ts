import { useContext } from "react";
import { ListingContext, ListingContextData } from "context/ListingContext";

export default function useListingContext(): ListingContextData {
  return useContext(ListingContext);
}
