import styles from "css/pages/spotlights/SpotlightsPage.module.css";
import useLogPageView from "hooks/useLogPageView";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import useActiveSpotlights from "hooks/spotlights/useActiveSpotlights";
import useUpcomingSpotlights from "hooks/spotlights/useUpcomingSpotlights";
import useRecentSpotlights from "hooks/spotlights/useRecentSpotlights";
import Header1 from "components/text/Header1";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import SpotlightHeroLoadingSkeleton from "components/spotlights/skeletons/SpotlightHeroLoadingSkeleton";
import { Suspense } from "react";
import SpotlightsPageHero from "components/pages/spotlights/SpotlightsPageHero";
import SpotlightsPageUpcomingSpotlights from "components/pages/spotlights/SpotlightsPageUpcomingSpotlights";
import SpotlightsPageRecentSpotlights from "components/pages/spotlights/SpotlightsPageRecentSpotlights";
import SpotlightsGridFullWidthLoading from "components/spotlights/skeletons/SpotlightsGridFullWidthLoading";
import Header3 from "components/text/Header3";
import useSetPageTitle from "hooks/useSetPageTitle";

function Section({
  grid,
  headerText,
}: {
  grid: JSX.Element;
  headerText: string;
}) {
  return (
    <div className={styles.section}>
      <Header3 textAlign="center" colorClass={ColorClass.Primary}>
        {headerText}
      </Header3>
      <div className={styles.grid}>{grid}</div>
    </div>
  );
}

export default function SpotlightsPage(): JSX.Element {
  useLogPageView();
  useSetPageTitle("Spotlights");
  const { spotlightQueryRef } = useActiveSpotlights();
  const { spotlightQueryRef: upcomingSpotlightsQueryRef } =
    useUpcomingSpotlights();
  const { spotlightQueryRef: recentSpotlightsQueryRef } = useRecentSpotlights();

  return (
    <PageWithHeaderAndFooter>
      <ResponsiveContainer>
        <div className={styles.body}>
          <div className={styles.header}>
            <Header1 colorClass={ColorClass.Primary}>Spotlights</Header1>
            <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
              Special art drops & exclusive collaborations
            </Body1>
          </div>
          {spotlightQueryRef != null && (
            <Suspense fallback={<SpotlightHeroLoadingSkeleton />}>
              <SpotlightsPageHero
                className={styles.heroContainer}
                queryRef={spotlightQueryRef}
              />
            </Suspense>
          )}
          {upcomingSpotlightsQueryRef != null && (
            <Section
              headerText="Upcoming Spotlights"
              grid={
                <Suspense fallback={<SpotlightsGridFullWidthLoading />}>
                  <SpotlightsPageUpcomingSpotlights
                    queryRef={upcomingSpotlightsQueryRef}
                  />
                </Suspense>
              }
            />
          )}
          {recentSpotlightsQueryRef != null && (
            <Section
              headerText="Recent Spotlights"
              grid={
                <Suspense
                  fallback={<SpotlightsGridFullWidthLoading multiple={2} />}
                >
                  <SpotlightsPageRecentSpotlights
                    queryRef={recentSpotlightsQueryRef}
                    shouldPaginate
                  />
                </Suspense>
              }
            />
          )}
        </div>
      </ResponsiveContainer>
    </PageWithHeaderAndFooter>
  );
}
