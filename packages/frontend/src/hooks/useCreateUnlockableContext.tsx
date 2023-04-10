import { useContext } from "react";
import {
  CreateUnlockableContext,
  CreateUnlockableContextData,
} from "context/CreateUnlockableContext";

export default function useCreateUnlockableContext(): CreateUnlockableContextData {
  return useContext(CreateUnlockableContext);
}
