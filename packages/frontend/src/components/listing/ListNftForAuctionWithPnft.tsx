import TextButton from "components/buttons/TextButton";
import { notify } from "components/toast/notifications";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import useListingContext from "hooks/useListingContext";
import useListNftForSale from "hooks/useListNftForSale";
import useMintNft from "hooks/useMintNft";
import { useFragment } from "react-relay";
import MintType from "types/enums/MintType";
import FontClass from "types/enums/FontClass";
import ListingStep from "types/enums/ListingStep";
import ListingType from "types/enums/ListingType";
import TextButtonTheme from "types/enums/TextButtonTheme";
import graphql from "babel-plugin-relay/macro";
import { ListNftForAuctionWithPnft_MetadataAccount$key } from "components/listing/__generated__/ListNftForAuctionWithPnft_MetadataAccount.graphql";
import useFlagsTyped from "hooks/useFlagsTyped";
import formatPnftDropDuration from "formfn-shared/dist/utils/dates/formatPnftDropDuration";
import ListNftSignTransactionStep from "types/enums/ListNftSignTransactionStep";
import useNftPageContext from "hooks/useNftPageContext";
import dayjs from "utils/dates/dayjsex";
import useViewerId from "hooks/useViewerId";
import GenericNftCreateModalContent from "components/nft/GenericNftCreateModalContent";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";

const fragment = graphql`
  fragment ListNftForAuctionWithPnft_MetadataAccount on MetadataAccount {
    mint
    ...useListNftForSale_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ListNftForAuctionWithPnft_MetadataAccount$key;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
};

export default function ListNftForAuctionWithPnft({
  onHide,
  metadataAccount,
  isLoading,
  setIsLoading,
}: Props): JSX.Element {
  const viewerId = useViewerId();
  const {
    pnftDropTimes: { dropDuration },
  } = useFlagsTyped();
  const { hasError, file, setShowErrors, resetCreateNftDetailsInputState } =
    useCreateNftDetailsContext();
  const { setStep, setEnablePnft, setSignTransactionStep } =
    useListingContext();
  const { loadNftQuery } = useNftPageContext();

  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { listNftForSale } = useListNftForSale(metadataAccountData);
  const setIsLoadingInner = (isLoadingInner: boolean) => {
    setIsLoading(isLoadingInner);
    if (!isLoadingInner) {
      setSignTransactionStep(null);
    }
  };

  const { mintNft } = useMintNft({
    mintType: MintType.Pnft,
    onComplete: (mintAccountPubkey) => {
      setSignTransactionStep(ListNftSignTransactionStep.ListForAuction);
      listNftForSale({
        listingType: ListingType.Auction,
        onCompleted: (txid: string) => {
          setSignTransactionStep(null);
          setIsLoading(false);
          notify({
            message: "Successfully listed with participation NFT!",
            txid,
          });
          // TODO[@][refactor] should refactor pNFT info stuff into a separate query
          // We need to reload the pNFT info
          loadNftQuery(
            {
              input: {
                mint: metadataAccountData.mint,
              },
              mint: metadataAccountData.mint,
              unlockableWinnerUserEmailInput: {
                viewerId,
              },
            },
            { fetchPolicy: "store-and-network" }
          );
          onHide();
        },
        pnftId: mintAccountPubkey.toString(),
        setIsLoading: setIsLoadingInner,
      });
    },
    onUploadComplete: () =>
      setSignTransactionStep(ListNftSignTransactionStep.MintPnft),
    setIsLoading: setIsLoadingInner,
  });

  const duration = dayjs.duration(dropDuration.value, dropDuration.unit);
  const modalDescription =
    `Everyone who bids on this auction will have ` +
    `${formatPnftDropDuration(duration)} to claim the participation ` +
    `NFT after this auction ends. After that period, the master edition` +
    ` of this participation NFT will be returned to you.`;

  return (
    <GenericNftCreateModalContent
      description={modalDescription}
      primaryCta={
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          disabled={file == null}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={() => {
            if (hasError) {
              setShowErrors(true);
              return;
            }

            mintNft({
              notifyStrings: {
                notifyLoadingMessage: "Minting participation NFT...",
                notifySuccessMessage: "Minted participation NFT!",
              },
            });
          }}
        >
          List for auction
        </ButtonWithText>
      }
      secondaryCta={
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          disabled={isLoading}
          fontClass={FontClass.NavLink}
          onClick={() => {
            resetCreateNftDetailsInputState();
            setEnablePnft(false);
            setStep(ListingStep.Setup);
          }}
        >
          Nevermind, go back
        </TextButton>
      }
    />
  );
}
