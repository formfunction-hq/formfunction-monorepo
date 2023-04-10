import {
  UserSearchContext,
  UserSearchContextData,
} from "context/UserSearchContext";

import { useContext } from "react";

export default function useUserSearchContext(): UserSearchContextData {
  return useContext(UserSearchContext);
}
