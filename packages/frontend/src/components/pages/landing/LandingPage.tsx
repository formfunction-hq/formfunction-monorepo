import styles from "css/pages/landing/LandingPage.module.css";
import HeaderLanding from "components/header/landing/HeaderLanding";
import LandingFeaturedArt from "components/pages/landing/LandingFeaturedArt";
import LandingTrendingSeries from "components/pages/landing/LandingTrendingSeries";
import LandingFooter from "components/pages/landing/LandingFooter";
import LandingHero from "components/pages/landing/LandingHero";
import useLogPageView from "hooks/useLogPageView";
import LandingHiddenGems from "components/pages/landing/LandingHiddenGems";
import useFlagsTyped from "hooks/useFlagsTyped";
import LandingLeaderboard from "components/pages/landing/LandingLeaderboard";
import LandingFeaturedEditions from "components/pages/landing/LandingFeaturedEditions";
import LandingSection from "components/pages/landing/LandingSection";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import LandingFeaturedCampaign from "components/pages/landing/LandingFeaturedCampaign";
import LandingFeaturedSpotlight from "components/pages/landing/LandingFeaturedSpotlight";
import useActiveSpotlights from "hooks/spotlights/useActiveSpotlights";
import useSetPageTitle from "hooks/useSetPageTitle";
import LandingFeaturedCampaigns from "components/pages/landing/LandingFeaturedCampaigns";
import LandingCampaignHero from "components/pages/landing/LandingCampaignHero";
import ShutdownBanner from "components/banner/ShutdownBanner";

export default function LandingPage(): JSX.Element {
  useSetPageTitle("Home");
  useLogPageView();
  const {
    campaignHeroConfig,
    enableCampaignsLandingPageSection,
    enableFrontpageSpotlight,
  } = useFlagsTyped();
  const { spotlightQueryRef } = useActiveSpotlights();

  return (
    <div>
      <ShutdownBanner />
      {campaignHeroConfig?.enabled ? (
        <LandingCampaignHero />
      ) : (
        <HeaderLanding />
      )}
      <div className={styles.body}>
        {!campaignHeroConfig?.enabled && <LandingHero />}
        {enableFrontpageSpotlight && spotlightQueryRef != null && (
          <LandingFeaturedSpotlight queryRef={spotlightQueryRef} />
        )}
        <LandingFeaturedCampaign />
        <LandingSection>
          <LandingFeaturedArt />
        </LandingSection>
        {enableCampaignsLandingPageSection && (
          <LandingSection className={BackgroundColorClass.LightPurpleGradient}>
            <LandingFeaturedCampaigns />
          </LandingSection>
        )}
        <LandingSection>
          <LandingHiddenGems />
        </LandingSection>
        <LandingSection className={BackgroundColorClass.LightPurpleGradient}>
          <LandingFeaturedEditions />
        </LandingSection>
        <LandingSection className={BackgroundColorClass.WebsiteBackground}>
          <LandingLeaderboard />
        </LandingSection>
        <LandingSection className={BackgroundColorClass.LightPurpleGradient}>
          <LandingTrendingSeries />
        </LandingSection>
        <LandingFooter />
      </div>
    </div>
  );
}
