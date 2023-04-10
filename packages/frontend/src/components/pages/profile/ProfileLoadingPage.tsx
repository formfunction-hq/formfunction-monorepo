import HeaderAndCoverPhoto from "components/header/HeaderAndCoverPhoto";
import profilePageStyles from "css/pages/profile/ProfilePageForUser.module.css";
import loadingStyles from "css/pages/profile/ProfileLoadingPage.module.css";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import Header2 from "components/text/Header2";
import LandingFooter from "components/pages/landing/LandingFooter";
import PageWithBottomTabs from "components/containers/PageWithBottomTabs";
import Skeleton from "react-loading-skeleton";
import ProfileTabsAndNftsLoading from "components/pages/profile/ProfileTabsAndNftsLoading";
import { MOBILE_BREAKPOINT } from "components/pages/profile/ProfilePageForUser";
import useWindowDimensions from "hooks/useWindowDimensions";

function Row1(): JSX.Element {
  return (
    <div className={profilePageStyles.row1}>
      <div className={profilePageStyles.row1Left}>
        <Header2 colorClass={null}>
          <Skeleton className={loadingStyles.row1Skeleton} />
        </Header2>
      </div>
    </div>
  );
}

export default function ProfileLoadingPage(): JSX.Element {
  const { width } = useWindowDimensions();

  return (
    <PageWithBottomTabs>
      <div className={profilePageStyles.container}>
        <HeaderAndCoverPhoto src={null} />
        <div className={profilePageStyles.containerInner}>
          <ResponsiveContainer>
            <div className={profilePageStyles.profilePhotoContainer}>
              <div className={profilePageStyles.profilePhoto} />
            </div>
            <Row1 />
            {width <= MOBILE_BREAKPOINT && (
              <Skeleton className={loadingStyles.row2Skeleton} />
            )}
            <ProfileTabsAndNftsLoading />
          </ResponsiveContainer>
        </div>
        <LandingFooter />
      </div>
    </PageWithBottomTabs>
  );
}
