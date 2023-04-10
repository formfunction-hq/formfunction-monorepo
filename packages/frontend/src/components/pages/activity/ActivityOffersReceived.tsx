import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import getImgixUrl from "utils/getImgixUrl";
import ActivitySectionEmptyContent from "components/pages/activity/ActivitySectionEmptyContent";
import { ActivityOffersReceived_NftOffersForUserEdge$key } from "components/pages/activity/__generated__/ActivityOffersReceived_NftOffersForUserEdge.graphql";
import ActivityOffersList from "components/pages/activity/ActivityOffersList";
import NftOfferForActivity from "components/pages/activity/NftOfferForActivity";

const fragment = graphql`
  fragment ActivityOffersReceived_NftOffersForUserEdge on NftOffersForUserEdge
  @relay(plural: true) {
    node {
      isValid

      ...NftOfferForActivity_NftOfferForUser
    }
  }
`;

function NoOffers(): JSX.Element {
  return (
    <ActivitySectionEmptyContent
      imageSrc={getImgixUrl("illustrations/no-offers-received.png")}
      title="You don’t have any active offers right now."
    />
  );
}

type Props = {
  offers: ActivityOffersReceived_NftOffersForUserEdge$key;
};

export default function ActivityOffersReceived({ offers }: Props) {
  const offersData = useFragment(fragment, offers);

  if (offersData.length === 0) {
    return <NoOffers />;
  }

  return (
    <ActivityOffersList>
      {offersData
        // NOTE: only valid offers can be accepted. The server also filters out invalid
        // received offers, but putting this here to be safe.
        .filter((offer) => offer.node.isValid)
        .map((offer) => (
          <NftOfferForActivity nftOffer={offer.node} />
        ))}
    </ActivityOffersList>
  );
}
