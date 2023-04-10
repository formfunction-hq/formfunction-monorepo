import { UserContext, UserContextData } from "context/UserContext";

import { useContext } from "react";

export default function useUserContext(): UserContextData {
  return useContext(UserContext);
}
