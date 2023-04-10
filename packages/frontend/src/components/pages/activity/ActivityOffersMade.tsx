import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import getImgixUrl from "utils/getImgixUrl";
import ActivitySectionEmptyContent from "components/pages/activity/ActivitySectionEmptyContent";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { ActivityOffersMade_NftOffersForUserEdge$key } from "components/pages/activity/__generated__/ActivityOffersMade_NftOffersForUserEdge.graphql";
import ActivityOffersList from "components/pages/activity/ActivityOffersList";
import NftOfferForActivity from "components/pages/activity/NftOfferForActivity";

const fragment = graphql`
  fragment ActivityOffersMade_NftOffersForUserEdge on NftOffersForUserEdge
  @relay(plural: true) {
    node {
      ...NftOfferForActivity_NftOfferForUser
    }
  }
`;

function NoOffers(): JSX.Element {
  const cta = (
    <ButtonWithText
      buttonTheme={ButtonTheme.PurpleGradient}
      fontClass={FontClass.NavLink}
      href="/explore"
      type="link_internal"
    >
      Explore NFTs
    </ButtonWithText>
  );

  return (
    <ActivitySectionEmptyContent
      cta={cta}
      imageSrc={getImgixUrl("illustrations/no-offers-made.png")}
      title="You haven't made any offers yet. Explore all available NFTs and find something you love!"
    />
  );
}

type Props = {
  offers: ActivityOffersMade_NftOffersForUserEdge$key;
};

export default function ActivityOffersMade({ offers }: Props) {
  const offersData = useFragment(fragment, offers);

  if (offersData.length === 0) {
    return <NoOffers />;
  }

  return (
    <ActivityOffersList>
      {offersData.map((offer) => (
        <NftOfferForActivity nftOffer={offer.node} />
      ))}
    </ActivityOffersList>
  );
}
