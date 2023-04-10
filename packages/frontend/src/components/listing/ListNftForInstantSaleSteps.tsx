import invariant from "tiny-invariant";
import useListingContext from "hooks/useListingContext";
import ListingStep from "types/enums/ListingStep";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import ListNftForInstantSale from "components/listing/ListNftForInstantSale";
import { ListNftForInstantSaleSteps_MetadataAccount$key } from "components/listing/__generated__/ListNftForInstantSaleSteps_MetadataAccount.graphql";
import ListNftForInstantSaleWithUnlockable from "components/listing/ListNftForInstantSaleWithUnlockable";

const fragment = graphql`
  fragment ListNftForInstantSaleSteps_MetadataAccount on MetadataAccount {
    ...ListNftForInstantSale_MetadataAccount
    ...ListNftForInstantSaleWithUnlockable_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ListNftForInstantSaleSteps_MetadataAccount$key;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
};

export default function ListNftForInstantSaleSteps({
  isLoading,
  setIsLoading,
  onHide,
  metadataAccount,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { step } = useListingContext();

  // pNFTs are not available for instant sales.
  invariant(step !== ListingStep.CreatePnft);

  switch (step) {
    case ListingStep.Setup:
      return (
        <ListNftForInstantSale
          isLoading={isLoading}
          metadataAccount={metadataAccountData}
          onHide={onHide}
          setIsLoading={setIsLoading}
        />
      );
    case ListingStep.AddUnlockable:
      return (
        <ListNftForInstantSaleWithUnlockable
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
