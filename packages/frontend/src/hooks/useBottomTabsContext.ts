import {
  BottomTabsContext,
  BottomTabsContextData,
} from "context/BottomTabsContext";

import { useContext } from "react";

export default function useBottomTabsContext(): BottomTabsContextData {
  return useContext(BottomTabsContext);
}
