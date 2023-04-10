import styles from "css/pages/about/AboutPage.module.css";
import HeaderLanding from "components/header/landing/HeaderLanding";
import LandingEco from "components/pages/landing/LandingEco";
import LandingFooter from "components/pages/landing/LandingFooter";
import LandingHow from "components/pages/landing/LandingHow";
import LandingJoin from "components/pages/landing/LandingJoin";
import LandingMadeFor from "components/pages/landing/LandingMadeFor";
import useLogPageView from "hooks/useLogPageView";
import useSetPageTitle from "hooks/useSetPageTitle";
import AboutHero from "components/pages/about/AboutHero";
import AboutStory from "components/pages/about/AboutStory";
import AboutValues from "components/pages/about/AboutValues";
import AboutJoin from "components/pages/about/AboutJoin";

export default function AboutPage(): JSX.Element {
  useSetPageTitle("About");
  useLogPageView();

  return (
    <div>
      <HeaderLanding />
      <AboutHero />
      <div className={styles.flexContainer}>
        <AboutStory />
        <AboutValues />
      </div>
      <AboutJoin />
      <LandingMadeFor />
      <LandingEco />
      <LandingHow />
      <LandingJoin />
      <LandingFooter />
    </div>
  );
}
