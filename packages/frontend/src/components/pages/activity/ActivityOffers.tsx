import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ActivitySections from "components/pages/activity/ActivitySections";
import ActivitySection from "components/pages/activity/ActivitySection";
import useUserContext from "hooks/useUserContext";
import { ActivityOffersQuery } from "components/pages/activity/__generated__/ActivityOffersQuery.graphql";
import ActivityOffersReceived from "components/pages/activity/ActivityOffersReceived";
import ActivityOffersMade from "components/pages/activity/ActivityOffersMade";

// NOTE: right now, separate queries are not necessary. But if we want to paginate
// offers made and offers received separately, we will need to use separate queries anyways.
const query = graphql`
  query ActivityOffersQuery(
    $offersMadeInput: NftOffersForUserInput!
    $offersReceivedInput: NftOffersForUserInput!
  ) {
    offersMade: nftOffersForUser {
      nftOffers(first: 200, input: $offersMadeInput) {
        edges {
          ...ActivityOffersMade_NftOffersForUserEdge
        }
      }
    }

    offersReceived: nftOffersForUser {
      nftOffers(first: 200, input: $offersReceivedInput) {
        edges {
          ...ActivityOffersReceived_NftOffersForUserEdge
        }
      }
    }
  }
`;

type Props = {
  isShown: boolean;
};

export default function ActivityOffers({ isShown }: Props): Maybe<JSX.Element> {
  const { userId } = useUserContext();

  const data = useLazyLoadQuery<ActivityOffersQuery>(
    query,
    {
      offersMadeInput: {
        kinds: ["Made"],
        userId: userId ?? "",
      },
      offersReceivedInput: {
        kinds: ["Received"],
        userId: userId ?? "",
      },
    },
    {
      fetchPolicy: "network-only",
    }
  );

  if (!isShown) {
    return null;
  }

  return (
    <ActivitySections>
      <ActivitySection showBottomDivider title="Offers received">
        <ActivityOffersReceived offers={data.offersReceived.nftOffers.edges} />
      </ActivitySection>
      <ActivitySection title="Offers made">
        <ActivityOffersMade offers={data.offersMade.nftOffers.edges} />
      </ActivitySection>
    </ActivitySections>
  );
}
