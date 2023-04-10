import GenericModal from "components/modal/GenericModal";
import { useState } from "react";
import { notify } from "components/toast/notifications";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { ListOneOfOneModal_MetadataAccount$key } from "components/modal/__generated__/ListOneOfOneModal_MetadataAccount.graphql";
import usePreventRefresh from "hooks/usePreventRefresh";
import ListingType from "types/enums/ListingType";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useListingContext from "hooks/useListingContext";
import ListOneOfOneModalContent from "components/listing/ListOneOfOneModalContent";
import ElementId from "types/enums/ElementId";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ListingStep from "types/enums/ListingStep";
import WaitingForTransactionModal from "components/modal/WaitingForTransactionModal";
import ListNftSignTransactionStep from "types/enums/ListNftSignTransactionStep";
import Header3 from "components/text/Header3";
import ColorClass from "types/enums/ColorClass";
import invariant from "tiny-invariant";

const fragment = graphql`
  fragment ListOneOfOneModal_MetadataAccount on MetadataAccount {
    ...ListOneOfOneModalContent_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: ListOneOfOneModal_MetadataAccount$key;
  onHide: () => void;
};

function getSignTransactionModalTinyLabel(
  signTransactionStep: ListNftSignTransactionStep
) {
  switch (signTransactionStep) {
    case ListNftSignTransactionStep.MintPnft:
      return "Step 1/2";
    case ListNftSignTransactionStep.ListForAuction:
      return "Step 2/2";
    case ListNftSignTransactionStep.ListForAuctionWithExistingPnft:
      return undefined;
    default:
      return assertUnreachable(signTransactionStep);
  }
}

function getSignTransactionModalTitle(
  signTransactionStep: ListNftSignTransactionStep
) {
  switch (signTransactionStep) {
    case ListNftSignTransactionStep.MintPnft:
      return (
        <Header3 colorClass={ColorClass.Primary}>
          1. Approve the transaction to{" "}
          <span className={ColorClass.BrightPurple}>
            mint the participation NFT
          </span>{" "}
        </Header3>
      );
    case ListNftSignTransactionStep.ListForAuction:
      return (
        <Header3 colorClass={ColorClass.Primary}>
          2. Approve the transaction to{" "}
          <span className={ColorClass.BrightPurple}>
            list your piece for auction
          </span>{" "}
        </Header3>
      );
    case ListNftSignTransactionStep.ListForAuctionWithExistingPnft:
      return (
        <Header3 colorClass={ColorClass.Primary}>
          Approve the transaction to{" "}
          <span className={ColorClass.BrightPurple}>
            list your piece for auction
          </span>{" "}
        </Header3>
      );
    default:
      return assertUnreachable(signTransactionStep);
  }
}

function getTitleForListingType(
  listingType: Maybe<ListingType>,
  listingStep: ListingStep
) {
  switch (listingType) {
    case ListingType.Auction:
      switch (listingStep) {
        case ListingStep.Setup:
          return "List for auction";
        case ListingStep.AddUnlockable:
          return "Add an unlockable";
        case ListingStep.CreatePnft:
          return "Add a participation NFT";
        default:
          return assertUnreachable(listingStep);
      }
    case ListingType.InstantSale:
      invariant(listingStep !== ListingStep.CreatePnft);
      switch (listingStep) {
        case ListingStep.Setup:
          return "List as instant sale";
        case ListingStep.AddUnlockable:
          return "Add an unlockable";
        default:
          return assertUnreachable(listingStep);
      }
    case null:
      return "List this NFT";
    default:
      return assertUnreachable(listingType);
  }
}

export default function ListOneOfOneModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { resetListingInputState, step, signTransactionStep } =
    useListingContext();
  const [isLoading, setIsLoading] = useState(false);
  const [listingType, setListingType] = useState<Maybe<ListingType>>(null);
  usePreventRefresh(isShown && isLoading);

  if (signTransactionStep != null) {
    return (
      <WaitingForTransactionModal
        isShown={isShown && signTransactionStep != null}
        tinyLabel={getSignTransactionModalTinyLabel(signTransactionStep)}
        title={getSignTransactionModalTitle(signTransactionStep)}
      />
    );
  }

  return (
    <GenericModal
      isShown={isShown}
      modalId={ElementId.ListNftModal}
      onHide={() => {
        if (isLoading) {
          notify({
            duration: 2,
            message: "Please wait for your listing to finish processing",
            type: "info",
          });
          return;
        }

        setListingType(null);
        resetListingInputState();
        onHide();
      }}
      title={getTitleForListingType(listingType, step)}
    >
      <ListOneOfOneModalContent
        isLoading={isLoading}
        listingType={listingType}
        metadataAccount={metadataAccountData}
        onHide={onHide}
        setIsLoading={setIsLoading}
        setListingType={setListingType}
      />
    </GenericModal>
  );
}
