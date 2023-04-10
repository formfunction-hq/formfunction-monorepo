import {
  GenerativeSeriesContext,
  GenerativeSeriesContextData,
} from "context/GenerativeSeriesContext";

import { useContext } from "react";

export default function useGenerativeSeriesContext(): GenerativeSeriesContextData {
  return useContext(GenerativeSeriesContext);
}
