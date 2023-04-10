import { useContext } from "react";
import {
  UnlockableModalContext,
  UnlockableModalContextData,
} from "context/UnlockableModalContext";

export default function useUnlockableModalContext(): UnlockableModalContextData {
  return useContext(UnlockableModalContext);
}
