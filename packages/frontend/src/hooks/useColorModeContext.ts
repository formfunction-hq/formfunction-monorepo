import {
  ColorModeContext,
  ColorModeContextData,
} from "context/ColorModeContext";

import { useContext } from "react";

export default function useColorModeContext(): ColorModeContextData {
  return useContext(ColorModeContext);
}
