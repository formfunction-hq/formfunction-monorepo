import {
  RelayConnectionIdsContext,
  RelayConnectionIdsContextData,
} from "context/RelayConnectionIdsContext";

import { useContext } from "react";

export default function useRelayConnectionIdsContext(): RelayConnectionIdsContextData {
  return useContext(RelayConnectionIdsContext);
}
