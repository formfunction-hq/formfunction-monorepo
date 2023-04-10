import { ImportContext, ImportContextData } from "context/ImportContext";
import { useContext } from "react";

export default function useImportContext(): ImportContextData {
  return useContext(ImportContext);
}
