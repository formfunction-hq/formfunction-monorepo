import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import CampaignAbout from "components/pages/campaign/campaign-v1/CampaignAbout";
import CampaignActivity from "components/pages/campaign/campaign-v1/CampaignActivity";
import CampaignBottom from "components/pages/campaign/campaign-generic/CampaignBottom";
import CampaignHero from "components/pages/campaign/campaign-v1/CampaignHero";
import CampaignSectionPreviews from "components/pages/campaign/campaign-v1/CampaignSectionPreviews";
import CampaignSections from "components/pages/campaign/campaign-v1/CampaignSections";
import CampaignTabs from "components/pages/campaign/campaign-generic/CampaignTabs";
import CampaignTabsContent from "components/pages/campaign/campaign-generic/CampaignTabsContent";
import CampaignTeam from "components/pages/campaign/campaign-v1/CampaignTeam";
import CampaignTop from "components/pages/campaign/campaign-generic/CampaignTop";
import CampaignActivitySkeleton from "components/pages/campaign/campaign-generic/activity/skeletons/CampaignActivitySkeleton";
import CampaignHeroSkeleton from "components/pages/campaign/campaign-generic/hero/skeletons/CampaignHeroSkeleton";
import CampaignSectionPreviewsSkeleton from "components/pages/campaign/campaign-v1/skeletons/CampaignSectionPreviewsSkeleton";
import { CampaignContextProvider } from "context/CampaignContext";
import useCampaignPageActivity from "hooks/campaign-page/v1/useCampaignPageActivity";
import useCampaignPageCampaign from "hooks/campaign-page/v1/useCampaignPageCampaign";
import useCampaignPageSections from "hooks/campaign-page/v1/useCampaignPageSections";
import useSolanaContext from "hooks/useSolanaContext";
import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import PopheadzCampaignTab from "types/enums/PopheadzCampaignTab";
import CampaignFundingTierStandardSkeleton from "components/pages/campaign/campaign-generic/funding-tiers/skeletons/CampaignFundingTierStandardSkeleton";
import useIsPopheadzCampaign from "hooks/useIsPopheadzCampaign";
import { PreloadedQuery } from "react-relay";
import { useCampaignPageCampaignQuery } from "hooks/campaign-page/v1/__generated__/useCampaignPageCampaignQuery.graphql";
import { useCampaignPageActivityQuery } from "hooks/campaign-page/v1/__generated__/useCampaignPageActivityQuery.graphql";
import { useCampaignPageSectionsQuery } from "hooks/campaign-page/v1/__generated__/useCampaignPageSectionsQuery.graphql";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import useUserContext from "hooks/useUserContext";
import CampaignTooniesSwap from "components/pages/campaign/campaign-v1/CampaignTooniesSwap";
import TooniesCampaignTab from "types/enums/TooniesCampaignTab";
import CampaignTabType from "types/CampaignTabType";

type InnerProps = {
  campaignActivityQueryRef: MaybeUndef<
    PreloadedQuery<useCampaignPageActivityQuery>
  >;
  campaignQueryRef: MaybeUndef<PreloadedQuery<useCampaignPageCampaignQuery>>;
  campaignSectionsQueryRef: MaybeUndef<
    PreloadedQuery<useCampaignPageSectionsQuery>
  >;
  campaignSlug: string;
};

function Inner({
  campaignActivityQueryRef,
  campaignQueryRef,
  campaignSectionsQueryRef,
  campaignSlug,
}: InnerProps) {
  const isPopheadz = useIsPopheadzCampaign();
  const [campaignTab, setCampaignTab] = useState<CampaignTabType>(
    CampaignTab.Support
  );
  const { anchorWallet } = useSolanaContext();
  const { user } = useUserContext();

  const campaignActivity =
    campaignActivityQueryRef != null ? (
      <Suspense fallback={<CampaignActivitySkeleton />}>
        <CampaignActivity campaignActivityQueryRef={campaignActivityQueryRef} />
      </Suspense>
    ) : null;

  return (
    <PageWithHeaderAndFooter>
      <CampaignTop>
        {campaignQueryRef != null && (
          <Suspense fallback={<CampaignHeroSkeleton />}>
            <CampaignHero
              campaignQueryRef={campaignQueryRef}
              campaignActivity={campaignActivity}
              setCampaignTab={setCampaignTab}
            />
          </Suspense>
        )}
        {/* TODO: better solution for hiding this */}
        {campaignSectionsQueryRef != null && !isPopheadz && (
          <Suspense fallback={<CampaignSectionPreviewsSkeleton />}>
            <CampaignSectionPreviews
              campaignSectionsQueryRef={campaignSectionsQueryRef}
              setCampaignTab={setCampaignTab}
            />
          </Suspense>
        )}
      </CampaignTop>
      <CampaignBottom>
        <CampaignTabs
          campaignQueryRef={null}
          campaignTab={campaignTab}
          setCampaignTab={setCampaignTab}
        />
        <CampaignTabsContent>
          {campaignSectionsQueryRef != null &&
            campaignTab === CampaignTab.Support && (
              <Suspense fallback={<CampaignFundingTierStandardSkeleton />}>
                {anchorWallet === undefined ? (
                  // CampaignSections needs the current user info to be available in order to
                  // render accurate information, so while the anchorWallet is still undefined,
                  // just show the skeleton
                  <CampaignFundingTierStandardSkeleton />
                ) : (
                  <CampaignSections
                    campaignSectionsQueryRef={campaignSectionsQueryRef}
                  />
                )}
              </Suspense>
            )}
          {campaignQueryRef != null && campaignTab === CampaignTab.About && (
            <Suspense
              fallback={
                // TODO[@arcticmatt][campaigns]: implement loading skeleton
                null
              }
            >
              <CampaignAbout campaignQueryRef={campaignQueryRef} />
            </Suspense>
          )}
          {campaignQueryRef != null &&
            campaignTab === PopheadzCampaignTab.Team && (
              <CampaignTeam slug={campaignSlug!} />
            )}
          {user != null && campaignTab === TooniesCampaignTab.TooniesSwap && (
            <CampaignTooniesSwap />
          )}
        </CampaignTabsContent>
      </CampaignBottom>
    </PageWithHeaderAndFooter>
  );
}

export default function CampaignPage(): JSX.Element {
  const params = useParams();
  const { campaignSlug, username } = params;
  const input = {
    campaignSlug: campaignSlug!,
    creatorUsername: username!,
  };

  // Fetch key leads to weird behavior with Stellate, so let's disable for now
  const fetchKey = 0;
  const { campaignQueryRef, loadCampaignQuery } = useCampaignPageCampaign(
    input,
    fetchKey
  );
  const { campaignActivityQueryRef, loadCampaignActivityQuery } =
    useCampaignPageActivity(input, fetchKey);
  const campaignSectionsQueryRef = useCampaignPageSections(input, fetchKey);

  return (
    <CampaignContextProvider
      campaignSlug={campaignSlug!}
      creatorUsername={username!}
      loadCampaignActivityQuery={loadCampaignActivityQuery}
      loadCampaignQuery={loadCampaignQuery}
    >
      <Inner
        campaignActivityQueryRef={campaignActivityQueryRef}
        campaignQueryRef={campaignQueryRef}
        campaignSectionsQueryRef={campaignSectionsQueryRef}
        campaignSlug={campaignSlug!}
      />
    </CampaignContextProvider>
  );
}
