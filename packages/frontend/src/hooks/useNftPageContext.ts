import { NftPageContext, NftPageContextData } from "context/NftPageContext";

import { useContext } from "react";

export default function useNftPageContext(): NftPageContextData {
  return useContext(NftPageContext);
}
