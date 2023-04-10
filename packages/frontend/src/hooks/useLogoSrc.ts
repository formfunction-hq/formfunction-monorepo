import useColorModeContext from "hooks/useColorModeContext";
import HeaderTheme from "types/enums/HeaderTheme";

export default function useLogoSrc(headerTheme: HeaderTheme) {
  const { isDarkMode } = useColorModeContext();
  return headerTheme === HeaderTheme.Light || isDarkMode
    ? "/images/logo-white.svg"
    : "/images/logo-black.svg";
}
