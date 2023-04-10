import {
  ListEditionsContext,
  ListEditionsContextData,
} from "context/ListEditionsContext";

import { useContext } from "react";

export default function useListEditionsContext(): ListEditionsContextData {
  return useContext(ListEditionsContext);
}
