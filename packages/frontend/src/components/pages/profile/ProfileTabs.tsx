import graphql from "babel-plugin-relay/macro";
import styles from "css/pages/profile/ProfileTabs.module.css";
import ProfileTabType from "types/enums/ProfileTabType";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import TabButton from "components/buttons/TabButton";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import { useProfilePageCreatedCampaignsQuery } from "hooks/profile-page/__generated__/useProfilePageCreatedCampaignsQuery.graphql";
import { profilePageCreatedCampaignsQuery } from "hooks/profile-page/useProfilePageCreatedCampaigns";
import { Suspense } from "react";
import { ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse$key } from "components/pages/profile/__generated__/ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse.graphql";
import { useProfilePageCampaignsWhereUserIsActiveSupporterQuery } from "hooks/profile-page/__generated__/useProfilePageCampaignsWhereUserIsActiveSupporterQuery.graphql";
import { ProfileTabsCampaignsWhereUserIsActiveSupporter_CampaignsNamespaceQueryResponse$key } from "components/pages/profile/__generated__/ProfileTabsCampaignsWhereUserIsActiveSupporter_CampaignsNamespaceQueryResponse.graphql";
import { profilePageCampaignsWhereUserIsActiveSupporterQuery } from "hooks/profile-page/useProfilePageCampaignsWhereUserIsActiveSupporter";

const createdCampaignsFragment = graphql`
  fragment ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignsForUser(input: $input) {
      campaigns(after: $after, first: $first, input: $input) {
        totalCount
      }
    }
  }
`;

const campaignsWhereUserIsActiveSupporterFragment = graphql`
  fragment ProfileTabsCampaignsWhereUserIsActiveSupporter_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignsWhereUserIsActiveSupporter(input: $input) {
      campaigns(after: $after, first: $first, input: $input) {
        totalCount
      }
    }
  }
`;

function TabButtonForProfile({
  currentTab,
  label,
  setTab,
  tab,
}: {
  currentTab: ProfileTabType;
  label?: Maybe<string | number>;
  setTab: (val: ProfileTabType) => void;
  tab: ProfileTabType;
}) {
  return (
    <TabButton
      isActive={currentTab === tab}
      label={label}
      name={String(tab)}
      onClick={() => setTab(tab)}
    />
  );
}

function CreatedCampaignsTab({
  campaignsNamespace,
  setTab,
  tab,
}: {
  campaignsNamespace: ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse$key;
  setTab: (val: ProfileTabType) => void;
  tab: ProfileTabType;
}) {
  const campaignsNamespaceData = useFragment(
    createdCampaignsFragment,
    campaignsNamespace
  );
  return (
    <TabButtonForProfile
      currentTab={tab}
      label={campaignsNamespaceData.campaignsForUser.campaigns?.totalCount}
      setTab={setTab}
      tab={ProfileTabType.Campaigns}
    />
  );
}

function CreatedCampaignsTabDataLoader({
  createdCampaignsQueryRef,
  setTab,
  tab,
}: {
  createdCampaignsQueryRef: PreloadedQuery<useProfilePageCreatedCampaignsQuery>;
  setTab: (val: ProfileTabType) => void;
  tab: ProfileTabType;
}) {
  const data = usePreloadedQuery<useProfilePageCreatedCampaignsQuery>(
    profilePageCreatedCampaignsQuery,
    createdCampaignsQueryRef
  );
  return (
    <CreatedCampaignsTab
      campaignsNamespace={data.CampaignsNamespace}
      setTab={setTab}
      tab={tab}
    />
  );
}

function SupportedCampaignsTab({
  campaignsNamespace,
  setTab,
  tab,
}: {
  campaignsNamespace: ProfileTabsCampaignsWhereUserIsActiveSupporter_CampaignsNamespaceQueryResponse$key;
  setTab: (val: ProfileTabType) => void;
  tab: ProfileTabType;
}) {
  const campaignsNamespaceData = useFragment(
    campaignsWhereUserIsActiveSupporterFragment,
    campaignsNamespace
  );
  return (
    <TabButtonForProfile
      currentTab={tab}
      label={
        campaignsNamespaceData.campaignsWhereUserIsActiveSupporter.campaigns
          ?.totalCount
      }
      setTab={setTab}
      tab={ProfileTabType.CampaignsWhereUserIsActiveSupporter}
    />
  );
}

function SupportedCampaignsTabDataLoader({
  supportedCampaignsQueryRef,
  setTab,
  tab,
}: {
  setTab: (val: ProfileTabType) => void;
  supportedCampaignsQueryRef: PreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>;
  tab: ProfileTabType;
}) {
  const data =
    usePreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>(
      profilePageCampaignsWhereUserIsActiveSupporterQuery,
      supportedCampaignsQueryRef
    );
  return (
    <SupportedCampaignsTab
      campaignsNamespace={data.CampaignsNamespace}
      setTab={setTab}
      tab={tab}
    />
  );
}

type Props = {
  createdCampaignsQueryRef: PreloadedQuery<useProfilePageCreatedCampaignsQuery>;
  numCollected: MaybeUndef<number>;
  numCreated: MaybeUndef<number>;
  numSeries: MaybeUndef<number>;
  setTab: (val: ProfileTabType) => void;
  showCampaignsTab: boolean;
  showCampaignsWhereUserIsActiveSupporterTab: boolean;
  showCreatedTab: boolean;
  showCreatorStoryTab: boolean;
  showSeriesTab: boolean;
  supportedCampaignsQueryRef: PreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>;
  tab: ProfileTabType;
};

export default function ProfileTabs({
  createdCampaignsQueryRef,
  numCreated,
  numCollected,
  numSeries,
  tab,
  showCampaignsTab,
  setTab,
  showCreatedTab,
  showSeriesTab,
  showCampaignsWhereUserIsActiveSupporterTab,
  showCreatorStoryTab,
  supportedCampaignsQueryRef,
}: Props): JSX.Element {
  return (
    <div className={styles.left}>
      {showCreatedTab && (
        <TabButtonForProfile
          currentTab={tab}
          label={numCreated}
          setTab={setTab}
          tab={ProfileTabType.Created}
        />
      )}
      <TabButtonForProfile
        currentTab={tab}
        label={numCollected}
        setTab={setTab}
        tab={ProfileTabType.Collected}
      />
      {showCampaignsTab && (
        <Suspense
          fallback={
            // Show without label
            <TabButtonForProfile
              currentTab={tab}
              setTab={setTab}
              tab={ProfileTabType.Campaigns}
            />
          }
        >
          <CreatedCampaignsTabDataLoader
            createdCampaignsQueryRef={createdCampaignsQueryRef}
            setTab={setTab}
            tab={tab}
          />
        </Suspense>
      )}
      {showCampaignsWhereUserIsActiveSupporterTab && (
        <Suspense
          fallback={
            // Show without label
            <TabButtonForProfile
              currentTab={tab}
              setTab={setTab}
              tab={ProfileTabType.CampaignsWhereUserIsActiveSupporter}
            />
          }
        >
          <SupportedCampaignsTabDataLoader
            supportedCampaignsQueryRef={supportedCampaignsQueryRef}
            setTab={setTab}
            tab={tab}
          />
        </Suspense>
      )}
      {showSeriesTab && (
        <TabButtonForProfile
          currentTab={tab}
          label={numSeries}
          setTab={setTab}
          tab={ProfileTabType.Series}
        />
      )}
      {showCreatorStoryTab && (
        <TabButtonForProfile
          currentTab={tab}
          setTab={setTab}
          tab={ProfileTabType.CreatorStory}
        />
      )}
    </div>
  );
}
