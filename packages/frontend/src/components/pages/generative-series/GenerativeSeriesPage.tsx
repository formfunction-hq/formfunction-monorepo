import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import LoadingSpinner from "components/loading/LoadingSpinner";
import Page404Content from "components/pages/errors/Page404Content";
import GenerativeSeriesBackToProject from "components/pages/generative-series/GenerativeSeriesBackToProject";
import GenerativeSeriesPageContent from "components/pages/generative-series/GenerativeSeriesPageContent";
import { GenerativeSeriesContextProvider } from "context/GenerativeSeriesContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import useGenerativeSeriesPageAttributes from "hooks/generative-series-page/useGenerativeSeriesPageAttributes";
import useGenerativeSeriesPageMetadataAccounts from "hooks/generative-series-page/useGenerativeSeriesPageMetadataAccounts";
import { useGenerativeSeriesPageAttributesQuery } from "hooks/generative-series-page/__generated__/useGenerativeSeriesPageAttributesQuery.graphql";
import { useGenerativeSeriesPageMetadataAccountsQuery } from "hooks/generative-series-page/__generated__/useGenerativeSeriesPageMetadataAccountsQuery.graphql";
import useSeriesPageSeriesInfo, {
  seriesInfoQuery,
} from "hooks/series-page/useSeriesPageSeriesInfo";
import { useSeriesPageSeriesInfoQuery } from "hooks/series-page/__generated__/useSeriesPageSeriesInfoQuery.graphql";
import useFlagsTyped from "hooks/useFlagsTyped";
import useLogPageView from "hooks/useLogPageView";
import useSetPageTitle from "hooks/useSetPageTitle";
import useUserContext from "hooks/useUserContext";
import { Suspense } from "react";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { useParams } from "react-router-dom";
import ColorValue from "types/enums/ColorValue";

function DataLoader({
  attributesQueryRef,
  metadataAccountsQueryRef,
  seriesInfoQueryRef,
}: {
  attributesQueryRef: PreloadedQuery<useGenerativeSeriesPageAttributesQuery>;
  metadataAccountsQueryRef: PreloadedQuery<useGenerativeSeriesPageMetadataAccountsQuery>;
  seriesInfoQueryRef: PreloadedQuery<useSeriesPageSeriesInfoQuery>;
}): Maybe<JSX.Element> {
  const data = usePreloadedQuery<useSeriesPageSeriesInfoQuery>(
    seriesInfoQuery,
    seriesInfoQueryRef
  );
  useSetPageTitle(data.Series[0]?.name ?? "Series Not Found");
  useLogPageView();

  if (data.User == null || data.User.length === 0 || data.Series.length === 0) {
    return <Page404Content />;
  }

  return (
    <GenerativeSeriesPageContent
      attributesQueryRef={attributesQueryRef}
      metadataAccountsQueryRef={metadataAccountsQueryRef}
      series={data.Series[0]}
    />
  );
}

function ProjectBackLink({
  seriesInfoQueryRef,
}: {
  seriesInfoQueryRef: PreloadedQuery<useSeriesPageSeriesInfoQuery>;
}): Maybe<JSX.Element> {
  const {
    campaignsConfig: { campaignsBySlug },
  } = useFlagsTyped();
  const data = usePreloadedQuery<useSeriesPageSeriesInfoQuery>(
    seriesInfoQuery,
    seriesInfoQueryRef
  );

  const slugForUser = Object.keys(campaignsBySlug).find(
    (slug) => campaignsBySlug[slug].creatorId === data.Series[0].creatorId
  );

  return (
    <GenerativeSeriesBackToProject
      // TODO[@arcticmatt]: Review and adjust as needed. We might want the project name in the LD config as well.
      projectHref={getCampaignLinkRelative(
        data.Series[0].Creator.username!,
        slugForUser!
      )}
      projectName="POPHEADZ"
    />
  );
}

function Inner() {
  const params = useParams();
  const { userId } = useUserContext();
  const { seriesSlug, username } = params;
  const attributesQueryRef = useGenerativeSeriesPageAttributes(
    userId,
    username,
    seriesSlug!
  );
  const metadataAccountsQueryRef = useGenerativeSeriesPageMetadataAccounts(
    userId,
    username,
    seriesSlug!
  );
  const seriesInfoQueryRef = useSeriesPageSeriesInfo(
    seriesSlug!,
    username,
    userId,
    "GenerativeMint"
  );

  return (
    <PageWithHeaderAndFooter>
      {seriesInfoQueryRef != null && (
        <Suspense
          fallback={
            <GenerativeSeriesBackToProject projectHref="" projectName="" />
          }
        >
          <ProjectBackLink seriesInfoQueryRef={seriesInfoQueryRef} />
        </Suspense>
      )}
      <ResponsivePageBody>
        <Suspense
          // TODO[@arcticmatt]: nicer suspense
          fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
        >
          {seriesInfoQueryRef != null &&
            metadataAccountsQueryRef != null &&
            attributesQueryRef != null && (
              <DataLoader
                attributesQueryRef={attributesQueryRef}
                metadataAccountsQueryRef={metadataAccountsQueryRef}
                seriesInfoQueryRef={seriesInfoQueryRef}
              />
            )}
        </Suspense>
      </ResponsivePageBody>
    </PageWithHeaderAndFooter>
  );
}

export default function GenerativeSeriesPage(): Maybe<JSX.Element> {
  return (
    <GenerativeSeriesContextProvider>
      <Inner />
    </GenerativeSeriesContextProvider>
  );
}
