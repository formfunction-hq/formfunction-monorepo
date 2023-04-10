import ListNftForAuctionWithPnft from "components/listing/ListNftForAuctionWithPnft";
import ListNftForAuction from "components/listing/ListNftForAuction";
import useListingContext from "hooks/useListingContext";
import ListingStep from "types/enums/ListingStep";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { ListNftForAuctionSteps_MetadataAccount$key } from "components/listing/__generated__/ListNftForAuctionSteps_MetadataAccount.graphql";
import ListNftForAuctionWithUnlockable from "components/listing/ListNftForAuctionWithUnlockable";

type Props = {
  isLoading: boolean;
  metadataAccount: ListNftForAuctionSteps_MetadataAccount$key;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
};

const fragment = graphql`
  fragment ListNftForAuctionSteps_MetadataAccount on MetadataAccount {
    ...ListNftForAuction_MetadataAccount
    ...ListNftForAuctionWithPnft_MetadataAccount
    ...ListNftForAuctionWithUnlockable_MetadataAccount
  }
`;

export default function ListNftForAuctionSteps({
  isLoading,
  setIsLoading,
  onHide,
  metadataAccount,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { step } = useListingContext();

  switch (step) {
    case ListingStep.Setup:
      return (
        <ListNftForAuction
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onHide={onHide}
          metadataAccount={metadataAccountData}
        />
      );
    case ListingStep.CreatePnft:
      return (
        <ListNftForAuctionWithPnft
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onHide={onHide}
          metadataAccount={metadataAccountData}
        />
      );
    case ListingStep.AddUnlockable:
      return (
        <ListNftForAuctionWithUnlockable
          isLoading={isLoading}
          metadataAccount={metadataAccountData}
          onHide={onHide}
          setIsLoading={setIsLoading}
        />
      );
    default: {
      return assertUnreachable(step);
    }
  }
}
