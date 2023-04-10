import { useContext } from "react";
import { SolanaContext } from "context/SolanaContext";

export default function useSolanaContext() {
  return useContext(SolanaContext);
}
