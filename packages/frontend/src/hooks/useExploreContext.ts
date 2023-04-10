import { ExploreContext, ExploreContextData } from "context/ExploreContext";

import { useContext } from "react";

export default function useExploreContext(): ExploreContextData {
  return useContext(ExploreContext);
}
