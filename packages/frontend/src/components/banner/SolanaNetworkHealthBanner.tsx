import InfoIcon from "components/icons/InfoIcon";
import Body2 from "components/text/Body2";
import SolanaNetworkHealth from "formfn-shared/dist/types/enums/SolanaNetworkHealth";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import useFlagsTyped from "hooks/useFlagsTyped";
import useSolanaContext from "hooks/useSolanaContext";
import { useEffect } from "react";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import getEnvironment from "utils/getEnvironment";
import Environment from "formfn-shared/dist/types/Environment";
import Banner from "components/banner/Banner";
import BackgroundColorClass from "types/enums/BackgroundColorClass";

function NetworkDown() {
  const { enableLowTpsExtensions } = useFlagsTyped();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Banner backgroundColorClass={BackgroundColorClass.RedGradient}>
      <InfoIcon colorValue={ColorValue.White} size={24} />
      <Body2 colorClass={ColorClass.White}>
        Solana TPS is extremely low right now, so transactions are likely to
        fail.
        {enableLowTpsExtensions &&
          " Auctions close to ending will be automatically extended."}
      </Body2>
    </Banner>
  );
}

function NetworkSlow() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Banner backgroundColorClass={BackgroundColorClass.LightPurpleGradient}>
      <InfoIcon colorValue={ColorValue.DarkPurple} size={24} />
      <Body2 colorClass={ColorClass.DarkPurple}>
        Solana TPS is low right now, so transactions are likely to fail.
      </Body2>
    </Banner>
  );
}

export default function SolanaNetworkHealthBanner() {
  const { networkHealth } = useSolanaContext();
  const { enableLowTpsExtensionsForUnknownNetworkHealth } = useFlagsTyped();

  if (getEnvironment() !== Environment.Production) {
    return null;
  }

  switch (networkHealth) {
    case SolanaNetworkHealth.Down:
      return <NetworkDown />;
    case null:
    case SolanaNetworkHealth.Good:
      return null;
    case SolanaNetworkHealth.Slow:
      return <NetworkSlow />;
    case SolanaNetworkHealth.Unknown:
      return enableLowTpsExtensionsForUnknownNetworkHealth ? (
        <NetworkDown />
      ) : null;
    default:
      return assertUnreachable(networkHealth);
  }
}
