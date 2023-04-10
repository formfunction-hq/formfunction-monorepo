import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ListingType from "types/enums/ListingType";
import ListNftChooseListingType from "components/listing/ListNftChooseListingType";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ListNftForAuctionSteps from "components/listing/ListNftForAuctionSteps";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { ListOneOfOneModalContent_MetadataAccount$key } from "components/listing/__generated__/ListOneOfOneModalContent_MetadataAccount.graphql";
import ListNftForInstantSaleSteps from "components/listing/ListNftForInstantSaleSteps";

type Props = {
  isLoading: boolean;
  listingType: Maybe<ListingType>;
  metadataAccount: ListOneOfOneModalContent_MetadataAccount$key;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
  setListingType: (val: ListingType) => void;
};

const fragment = graphql`
  fragment ListOneOfOneModalContent_MetadataAccount on MetadataAccount {
    ...ListNftForAuctionSteps_MetadataAccount
    ...ListNftForInstantSaleSteps_MetadataAccount
  }
`;

export default function ListOneOfOneModalContent({
  isLoading,
  listingType,
  metadataAccount,
  onHide,
  setIsLoading,
  setListingType,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  switch (listingType) {
    case ListingType.Auction:
      return (
        <ListNftForAuctionSteps
          isLoading={isLoading}
          metadataAccount={metadataAccountData}
          onHide={onHide}
          setIsLoading={setIsLoading}
        />
      );
    case ListingType.InstantSale:
      return (
        <ListNftForInstantSaleSteps
          isLoading={isLoading}
          metadataAccount={metadataAccountData}
          onHide={onHide}
          setIsLoading={setIsLoading}
        />
      );
    case null:
      return <ListNftChooseListingType setListingType={setListingType} />;
    default:
      return assertUnreachable(listingType);
  }
}
