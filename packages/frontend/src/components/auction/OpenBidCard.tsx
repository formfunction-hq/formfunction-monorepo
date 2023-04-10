import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import ListingCardWithStatus from "components/auction/ListingCardWithStatus";
import { OpenBidCard_OpenBid$key } from "components/auction/__generated__/OpenBidCard_OpenBid.graphql";
import AlertIcon from "components/icons/AlertIcon";
import CheckCircleGradientIcon from "components/icons/CheckCircleGradientIcon";
import RotationGradientIcon from "components/icons/RotationGradientIcon";
import StarIcon from "components/icons/StarIcon";
import { useFragment } from "react-relay";
import ColorValue from "types/enums/ColorValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import GlobalClass from "types/enums/GlobalClass";

const STATUS_DESCRIPTIONS = {
  "%future added value": "",
  HighestBid: "You have the highest bid",
  Outbid: "You have been outbid",
  Refund: "Refund your bid",
  Won: "You won this auction!",
};

const STATUS_ICONS = {
  "%future added value": null,
  HighestBid: <CheckCircleGradientIcon />,
  Outbid: <AlertIcon colorValue={ColorValue.Error} />,
  Refund: <RotationGradientIcon />,
  Won: <StarIcon colorValue={ColorValue.Green} size={24} />,
};

const fragment = graphql`
  fragment OpenBidCard_OpenBid on OpenBid {
    metadataAccount {
      ...ListingCardForMetadata_MetadataAccount

      openBidStatus(userId: $userId)
    }
  }
`;

type Props = {
  openBid: OpenBidCard_OpenBid$key;
};

export default function OpenBidCard({ openBid }: Props): Maybe<JSX.Element> {
  const openBidData = useFragment(fragment, openBid);
  const { openBidStatus } = openBidData.metadataAccount;

  if (openBidStatus == null) {
    return null;
  }

  const listingCard = (
    <ListingCardForMetadata
      cardAnimationClass={GlobalClass.CardAnimationNoTransform}
      hidePillButtons
      metadataAccount={openBidData.metadataAccount}
    />
  );
  const status = (
    <>
      {STATUS_ICONS[openBidStatus]} {STATUS_DESCRIPTIONS[openBidStatus]}
    </>
  );

  return <ListingCardWithStatus listingCard={listingCard} status={status} />;
}
