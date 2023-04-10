import "@pathofdev/react-tag-input/build/index.css";
import "antd/dist/antd.css";
import "css/global/Global.css";
import "css/global/GlobalAntd.css";
import "css/global/GlobalMantine.css";
import "css/global/ReactCalendar.css";
import "css/global/ReactTagInput.css";
import "css/global/Swiper.css";

// Colors
import "css/global/colors/ColorVariables.css";
import "css/global/colors/ColorVariablesDarkMode.css";
import "css/global/colors/ColorVariablesLightMode.css";
import "css/global/colors/BackgroundColorClasses.css";
import "css/global/colors/ColorClasses.css";

// Fonts
import "css/global/fonts/TanNimbus.css";
import "css/global/fonts/FontClasses.css";
import "css/global/fonts/FontVariables.css";

// Shadows
import "css/global/shadows/ShadowVariables.css";

// Z indices
import "css/global/z-index/ZIndexVariables.css";

// Filters
import "css/global/filters/FilterVariables.css";

// Transitions
import "css/global/transitions/TransitionVariables.css";

// Loading Skeletons
import "react-loading-skeleton/dist/skeleton.css";

import { withLDProvider } from "launchdarkly-react-client-sdk";

import Routes from "routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { ExchangeRatesContextProvider } from "context/ExchangeRatesContext";
import { SolanaContextProvider } from "context/SolanaContext";
import { RelayEnvironmentProvider } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import { Suspense, useEffect } from "react";
import "utils/firebase/firebaseApp";
import { UserContextProvider } from "context/UserContext";
import ScrollToTop from "components/nav/ScrollToTop";
import { ExploreContextProvider } from "context/ExploreContext";
import getLaunchDarklyClientSideId from "utils/getLaunchDarklyClientSideId";
import GlobalErrorBoundary from "components/error/GlobalErrorBoundary";
import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";
import { DiscordAuthContextProvider } from "context/DiscordAuthContext";
import { SkeletonTheme } from "react-loading-skeleton";
import ColorVariableName from "types/enums/ColorVariableName";
import { ColorModeContextProvider } from "context/ColorModeContext";
import trackMixpanelEvent from "utils/mixpanel/trackMixpanelEvent";
import MixpanelEvent from "types/enums/MixpanelEvent";

const handleUnload = () => {
  trackMixpanelEvent(MixpanelEvent.AppClosed);
};

function App() {
  useEffect(() => {
    trackMixpanelEvent(MixpanelEvent.AppLoaded);
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <ColorModeContextProvider>
      <SkeletonTheme
        baseColor={`var(${ColorVariableName.SkeletonBase})`}
        highlightColor={`var(${ColorVariableName.SkeletonHighlight})`}
      >
        <GlobalErrorBoundary>
          <RelayEnvironmentProvider environment={RelayEnvironment}>
            <SolanaContextProvider>
              <UserContextProvider>
                <BrowserRouter>
                  {/* Put this here to make navigating to/from explore page smoother */}
                  <ExploreContextProvider>
                    <DiscordAuthContextProvider>
                      <ScrollToTop />
                      <ExchangeRatesContextProvider>
                        <Suspense fallback={<div />}>
                          <Routes />
                        </Suspense>
                      </ExchangeRatesContextProvider>
                    </DiscordAuthContextProvider>
                  </ExploreContextProvider>
                </BrowserRouter>
              </UserContextProvider>
            </SolanaContextProvider>
          </RelayEnvironmentProvider>
        </GlobalErrorBoundary>
      </SkeletonTheme>
    </ColorModeContextProvider>
  );
}

const ldBootstrap = getLdBootstrap();

export default withLDProvider({
  clientSideID: getLaunchDarklyClientSideId(),
  options: {
    // Specify isBootstrap since sometimes we need to wait until the user's actual
    // LD values have been loaded
    bootstrap: ldBootstrap != null ? { ...ldBootstrap, isBootstrap: true } : {},
  },
  user: {
    email: "User@example.com",
    key: "example_user",
    name: "Example user",
  },
})(App);
