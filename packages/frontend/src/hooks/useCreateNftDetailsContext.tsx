import { useContext } from "react";
import {
  CreateNftDetailsContext,
  CreateNftDetailsContextData,
} from "context/CreateNftDetailsContext";

export default function useCreateNftDetailsContext(): CreateNftDetailsContextData {
  return useContext(CreateNftDetailsContext);
}
