import { Navigate, Route, Routes as RoutesImport } from "react-router-dom";
import LandingPage from "components/pages/landing/LandingPage";
import ProfilePage from "components/pages/profile/ProfilePage";
import EditProfilePage from "components/pages/profile/edit/EditProfilePage";
import CreatePage from "components/pages/create/CreatePage";
import NftPage from "components/pages/common/nft/NftPage";
import ProfilePageDynamic from "components/pages/profile/ProfilePageDynamic";
import ActivityPage from "components/pages/activity/ActivityPage";
import ExplorePage from "components/pages/explore/ExplorePage";
import TagPage from "components/pages/tags/tag/TagPage";
import SeriesPage from "components/pages/series/SeriesPage";
import { useState } from "react";
import Countdown from "react-countdown";
import dayjs from "utils/dates/dayjsex";
import ApplyPage from "components/pages/apply/ApplyPage";
import Page404 from "components/pages/errors/Page404";
import PrescreenPage from "components/pages/vote/prescreen/PrescreenPage";
import VotePage from "components/pages/vote/VotePage";
import ManualApprovalPage from "components/pages/vote/manual-approval/ManualApprovalPage";
import StatsPage from "components/pages/stats/StatsPage";
import ImportPage from "components/pages/import/ImportPage";
import getEnvironment from "utils/getEnvironment";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import MobileSearchPage from "components/pages/search/MobileSearchPage";
import SolanaNetworkHealthBanner from "components/banner/SolanaNetworkHealthBanner";
import CampaignPage from "components/pages/campaign/CampaignPage";
import useFlagsTyped from "hooks/useFlagsTyped";
import InvitesPage from "components/pages/invites/InvitesPage";
import AcceptInvitePage from "components/pages/invites/AcceptInvitePage";
import SpotlightsPage from "components/pages/spotlights/SpotlightsPage";
import AboutPage from "components/pages/about/AboutPage";
import GenerativeSeriesPage from "components/pages/generative-series/GenerativeSeriesPage";
import CreateCampaignPage from "components/pages/campaign/basic-info/CreateCampaignPage";
import CampaignDashboardPage from "components/pages/campaign/dashboard/CampaignDashboardPage";
import EditCampaignBasicInfoPage from "components/pages/campaign/basic-info/CampaignEditBasicInfoPage";
import CampaignManageCampaignsPage from "components/pages/campaign/campaign-generic/CampaignManageCampaignsPage";
import CampaignPageForAdmin from "components/pages/campaign/CampaignPageForAdmin";

// Simple example showing how Countdown can freeze
function Test() {
  const [date, setDate] = useState(dayjs().add(dayjs.duration({ seconds: 3 })));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, setKey] = useState(0);

  return (
    <>
      <Countdown
        date={date.toDate()}
        key={date.toString()}
        renderer={({ hours, minutes, seconds }: any) => (
          <div>{`${hours}h ${minutes}m ${seconds}s`}</div>
        )}
      />
      <button
        onClick={() => {
          setKey((curr) => curr + 1);

          setTimeout(
            () => setDate(dayjs().add(dayjs.duration({ seconds: 3 }))),
            1000
          );
        }}
        type="button"
      >
        Reset time
      </button>
    </>
  );
}

function SentryTest() {
  throw new Error(`testing sentry on ${getEnvironment()}`);
  // eslint-disable-next-line no-unreachable
  return <div>Hey</div>;
}

export default function Routes(): JSX.Element {
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const { enableCampaignCreator } = useFlagsTyped();

  return (
    <>
      <SolanaNetworkHealthBanner />
      <RoutesImport>
        <Route path="/" element={<LandingPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/import" element={<ImportPage />} />
        <Route path="/spotlights" element={<SpotlightsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/:mint" element={<NftPage />} />
        <Route path="/profile/series/:seriesSlug" element={<SeriesPage />} />

        <Route path="/invites" element={<InvitesPage />} />
        <Route
          path="/invites/:inviteLinkToken"
          element={<AcceptInvitePage />}
        />
        <Route
          path="/search"
          element={
            isBottomTabsWidth ? (
              <MobileSearchPage />
            ) : (
              // On desktop, search should just go to explore
              <Navigate replace to="/explore" />
            )
          }
        />

        <Route path="/stats" element={<StatsPage />} />

        <Route path="/tags/:tag" element={<TagPage />} />

        <Route path="/@/:mint" element={<NftPage />} />
        <Route path="/@:username" element={<ProfilePageDynamic />} />
        <Route path="/@:username/:mint" element={<NftPage />} />
        <Route
          path="/@:username/campaigns/:campaignSlug"
          element={<CampaignPage />}
        />
        <Route
          path="/@:username/campaigns/:campaignSlug/admin"
          element={<CampaignPageForAdmin />}
        />
        <Route
          path="/@:username/campaigns/:campaignSlug/dashboard"
          element={<CampaignDashboardPage />}
        />
        <Route
          path="/@:username/campaigns/:campaignSlug/draft"
          element={<CampaignPage isDraftView />}
        />
        {enableCampaignCreator && (
          <>
            <Route
              path="/campaigns"
              element={<CampaignManageCampaignsPage />}
            />
            <Route
              path="/@:username/campaigns"
              element={<CampaignManageCampaignsPage />}
            />
            <Route
              path="/@:username/campaigns/create"
              element={<CreateCampaignPage />}
            />
            <Route
              path="/@:username/campaigns/:campaignSlug/edit-basic-info"
              element={<EditCampaignBasicInfoPage />}
            />
          </>
        )}

        <Route path="/@:username/series/:seriesSlug" element={<SeriesPage />} />
        <Route
          path="/@:username/generative-series/:seriesSlug"
          element={<GenerativeSeriesPage />}
        />

        <Route path="/vote" element={<VotePage />} />
        <Route path="/vote/manual-approval" element={<ManualApprovalPage />} />
        <Route
          path="/vote/manual-approval/:submission"
          element={<ManualApprovalPage />}
        />
        <Route path="/vote/prescreen" element={<PrescreenPage />} />

        <Route path="/foo" element={<Test />} />

        <Route path="/sentry-test" element={<SentryTest />} />

        <Route path="*" element={<Page404 />} />
      </RoutesImport>
    </>
  );
}
