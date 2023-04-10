import { useContext } from "react";
import {
  DiscordAuthContext,
  DiscordAuthContextData,
} from "context/DiscordAuthContext";

export default function useDiscordAuthContext(): DiscordAuthContextData {
  return useContext(DiscordAuthContext);
}
