import PageWithBottomTabs from "components/containers/PageWithBottomTabs";
import Header from "components/header/Header";
import LandingFooter from "components/pages/landing/LandingFooter";
import styles from "css/containers/PageWithHeaderAndFooter.module.css";
import HeaderTheme from "types/enums/HeaderTheme";

type Props = {
  children: any;
  headerTheme?: HeaderTheme;
  hideBottomTabs?: boolean;
  showAccountSetupModal?: boolean;
};

export default function PageWithHeaderAndFooter({
  children,
  headerTheme,
  hideBottomTabs,
  showAccountSetupModal,
}: Props): JSX.Element {
  return (
    <PageWithBottomTabs hideBottomTabs={hideBottomTabs}>
      <div className={styles.container}>
        <Header
          headerTheme={headerTheme}
          showAccountSetupModal={showAccountSetupModal}
        />
        <div className={styles.body}>{children}</div>
        <LandingFooter />
      </div>
    </PageWithBottomTabs>
  );
}
