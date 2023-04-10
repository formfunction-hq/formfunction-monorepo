import WalletName from "types/enums/WalletName";

export default function getGlowWallet(isDarkMode: boolean) {
  return {
    icon: isDarkMode ? "/images/glow-white.svg" : "/images/glow-black.svg",
    name: WalletName.Glow,
    url: "https://glow.app/download",
  };
}
