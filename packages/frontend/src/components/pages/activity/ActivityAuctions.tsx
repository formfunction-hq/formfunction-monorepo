import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { ActivityAuctionsQuery } from "components/pages/activity/__generated__/ActivityAuctionsQuery.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ActivitySections from "components/pages/activity/ActivitySections";
import ActivitySection from "components/pages/activity/ActivitySection";
import ActivityAuctionsYourAuctions from "components/pages/activity/ActivityAuctionsYourAuctions";
import ActivityAuctionsOpenBids from "components/pages/activity/ActivityAuctionsOpenBids";
import useUserContext from "hooks/useUserContext";

const query = graphql`
  query ActivityAuctionsQuery(
    $openBidsInput: OpenBidsInput!
    $userId: String!
    $yourAuctionsInput: MetadataAccountsInput!
  ) {
    openBids(input: $openBidsInput) {
      ...ActivityAuctionsOpenBids_OpenBid
    }

    yourAuctions: metadataAccounts(input: $yourAuctionsInput) {
      ...ActivityAuctionsYourAuctions_MetadataAccount
    }
  }
`;

type Props = {
  isShown: boolean;
};

export default function ActivityAuctions({
  isShown,
}: Props): Maybe<JSX.Element> {
  const { user, userId } = useUserContext();

  const data = useLazyLoadQuery<ActivityAuctionsQuery>(
    query,
    {
      openBidsInput: {
        userId: userId ?? "",
      },
      userId: userId ?? "",
      yourAuctionsInput: {
        address: userId ?? "",
        includeCreator: false,
        status: "Auction",
      },
    },
    {
      // Easy way to make this update when you place a new bid or when a new auction starts
      fetchPolicy: "network-only",
    }
  );

  if (!isShown) {
    return null;
  }

  return (
    <ActivitySections>
      {user?.isWhitelisted && (
        <ActivitySection showBottomDivider title="Pieces you're selling">
          <ActivityAuctionsYourAuctions metadataAccounts={data.yourAuctions} />
        </ActivitySection>
      )}
      <ActivitySection title="Pieces you're bidding on">
        <ActivityAuctionsOpenBids openBids={data.openBids} />
      </ActivitySection>
    </ActivitySections>
  );
}
