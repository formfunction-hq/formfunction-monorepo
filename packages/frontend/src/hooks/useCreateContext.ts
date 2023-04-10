import { CreateContext, CreateContextData } from "context/CreateContext";

import { useContext } from "react";

export default function useCreateContext(): CreateContextData {
  return useContext(CreateContext);
}
