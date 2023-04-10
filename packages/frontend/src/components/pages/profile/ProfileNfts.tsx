import graphql from "babel-plugin-relay/macro";
import NftsForAddress from "components/pages/profile/NftsForAddress";
import { ProfileNfts_User$key } from "components/pages/profile/__generated__/ProfileNfts_User.graphql";
import { ProfileSeriesSeries_Query$key } from "components/pages/profile/__generated__/ProfileSeriesSeries_Query.graphql";
import styles from "css/pages/profile/ProfileNfts.module.css";
import { useProfilePageCampaignsWhereUserIsActiveSupporterQuery } from "hooks/profile-page/__generated__/useProfilePageCampaignsWhereUserIsActiveSupporterQuery.graphql";
import { useProfilePageCreatedCampaignsQuery } from "hooks/profile-page/__generated__/useProfilePageCreatedCampaignsQuery.graphql";
import { useProfilePageMetadataAccountsQuery } from "hooks/profile-page/__generated__/useProfilePageMetadataAccountsQuery.graphql";
import { PreloadedQuery, useFragment } from "react-relay";
import ProfileTabType from "types/enums/ProfileTabType";

const fragment = graphql`
  fragment ProfileNfts_User on User {
    # eslint-disable-next-line relay/unused-fields
    id

    ...NftsForAddress_User
  }
`;

type Props = {
  createdCampaignsQueryRef: PreloadedQuery<useProfilePageCreatedCampaignsQuery>;
  nftQueryRef: PreloadedQuery<useProfilePageMetadataAccountsQuery>;
  series: ProfileSeriesSeries_Query$key;
  supportedCampaignsQueryRef: PreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>;
  tab: ProfileTabType;
  user: ProfileNfts_User$key;
};

export default function ProfileNfts({
  createdCampaignsQueryRef,
  user,
  nftQueryRef,
  series,
  supportedCampaignsQueryRef,
  tab,
}: Props): JSX.Element {
  const userData = useFragment(fragment, user);

  return (
    <div className={styles.grid}>
      <NftsForAddress
        createdCampaignsQueryRef={createdCampaignsQueryRef}
        nftQueryRef={nftQueryRef}
        tab={tab}
        user={userData}
        series={series}
        supportedCampaignsQueryRef={supportedCampaignsQueryRef}
      />
    </div>
  );
}
