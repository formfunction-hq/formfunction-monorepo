import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import getImgixUrl from "utils/getImgixUrl";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import ActivitySectionEmptyContent from "components/pages/activity/ActivitySectionEmptyContent";
import { ActivityAuctionsYourAuctions_MetadataAccount$key } from "components/pages/activity/__generated__/ActivityAuctionsYourAuctions_MetadataAccount.graphql";
import hasAuctionEnded from "utils/hasAuctionEnded";
import dayjs from "utils/dates/dayjsex";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import SunsetGradientIcon from "components/icons/SunsetGradientIcon";
import ClockIcon from "components/icons/ClockIcon";
import ColorValue from "types/enums/ColorValue";
import ListingCardWithStatus from "components/auction/ListingCardWithStatus";
import GlobalClass from "types/enums/GlobalClass";
import useColorModeContext from "hooks/useColorModeContext";
import SunsetIcon from "components/icons/SunsetIcon";

const fragment = graphql`
  fragment ActivityAuctionsYourAuctions_MetadataAccount on MetadataAccount
  @relay(plural: true) {
    id
    nft {
      auctionEndTime
    }
    ...ListingCardForMetadata_MetadataAccount
  }
`;

function NoAuctions(): JSX.Element {
  return (
    <ActivitySectionEmptyContent
      imageSrc={getImgixUrl("illustrations/no-auctions-cropped.png")}
      title="None of your pieces have an open auction right now! You can sit back and relax."
    />
  );
}

type Props = {
  metadataAccounts: ActivityAuctionsYourAuctions_MetadataAccount$key;
};

export default function ActivityAuctionsYourAuctions({
  metadataAccounts,
}: Props) {
  const metadataAccountsData = useFragment(fragment, metadataAccounts);
  const { isDarkMode } = useColorModeContext();

  if (metadataAccountsData.length === 0) {
    return <NoAuctions />;
  }

  return (
    <NftGridFullWidth>
      {metadataAccountsData.map((metadataAccount) => {
        const auctionEnded =
          metadataAccount.nft.auctionEndTime == null ||
          hasAuctionEnded(dayjs(metadataAccount.nft.auctionEndTime));

        const listingCard = (
          <ListingCardForMetadata
            cardAnimationClass={GlobalClass.CardAnimationNoTransform}
            hidePillButtons
            metadataAccount={metadataAccount}
          />
        );
        const status = auctionEnded ? (
          <>
            {isDarkMode ? (
              <SunsetIcon colorValue={ColorValue.BrightPurple} />
            ) : (
              <SunsetGradientIcon />
            )}{" "}
            Settle auction
          </>
        ) : (
          <>
            <ClockIcon colorValue={ColorValue.Primary} /> Auction is ongoing
          </>
        );

        return (
          <ListingCardWithStatus
            key={metadataAccount.id}
            listingCard={listingCard}
            status={status}
          />
        );
      })}
    </NftGridFullWidth>
  );
}
