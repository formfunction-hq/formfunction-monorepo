import graphql from "babel-plugin-relay/macro";
import { ActivityAuctionsOpenBids_OpenBid$key } from "components/pages/activity/__generated__/ActivityAuctionsOpenBids_OpenBid.graphql";
import { useFragment } from "react-relay";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import getImgixUrl from "utils/getImgixUrl";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import OpenBidCard from "components/auction/OpenBidCard";
import ActivitySectionEmptyContent from "components/pages/activity/ActivitySectionEmptyContent";

const fragment = graphql`
  fragment ActivityAuctionsOpenBids_OpenBid on OpenBid @relay(plural: true) {
    metadataAccount {
      id

      openBidStatus(userId: $userId)
    }

    ...OpenBidCard_OpenBid
  }
`;

function NoBids(): JSX.Element {
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
      imageSrc={getImgixUrl("illustrations/no-bids-cropped.png")}
      title="You have no open bids right now. Explore all available NFTs and find something you love!"
    />
  );
}

type Props = {
  openBids: ActivityAuctionsOpenBids_OpenBid$key;
};

export default function ActivityAuctionsOpenBids({ openBids }: Props) {
  const openBidsData = useFragment(fragment, openBids);

  // TODO: filter on server?
  const openBidsFiltered = openBidsData.filter(
    ({ metadataAccount }) =>
      metadataAccount.openBidStatus != null &&
      metadataAccount.openBidStatus !== "Refund"
  );

  if (openBidsFiltered.length === 0) {
    return <NoBids />;
  }

  return (
    <NftGridFullWidth>
      {openBidsFiltered.map((openBid) => (
        <OpenBidCard key={openBid.metadataAccount.id} openBid={openBid} />
      ))}
    </NftGridFullWidth>
  );
}
