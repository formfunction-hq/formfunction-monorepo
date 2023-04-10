import { PublicKey } from "@solana/web3.js";
import graphql from "babel-plugin-relay/macro";
import GenericConfirmationModal from "components/modal/GenericConfirmationModal";
import { CancelListingModalMutation } from "components/modal/__generated__/CancelListingModalMutation.graphql";
import { CancelListingModal_MetadataAccount$key } from "components/modal/__generated__/CancelListingModal_MetadataAccount.graphql";
import { notify } from "components/toast/notifications";
import usePreventRefresh from "hooks/usePreventRefresh";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import useSolanaContext from "hooks/useSolanaContext";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import invariant from "tiny-invariant";
import logIfNotProd from "utils/logIfNotProd";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import useAuctionHouseSdkForPrice from "hooks/useAuctionHouseSdkForPrice";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useViewerId from "hooks/useViewerId";

const mutation = graphql`
  mutation CancelListingModalMutation(
    $creator: String!
    $lister: String!
    $mint: String!
    $txid: String!
    $connections: [ID!]!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    insertNftTransaction(
      input: {
        creatorId: $creator
        fromUserId: $lister
        toUserId: $lister
        mint: $mint
        price: null
        txid: $txid
        type: ListingCancelled
      }
    ) {
      transaction
        @prependNode(
          connections: $connections
          edgeTypeName: "NftTransactionsEdge"
        ) {
        ...NftTransaction_NftTransactionExpress
      }

      updatedMetadataAccount {
        ...NftPageContent_MetadataAccount
      }
    }
  }
`;

const fragment = graphql`
  fragment CancelListingModal_MetadataAccount on MetadataAccount {
    mint

    nft {
      creatorId
      priceV2 {
        amount
        ...useAuctionHouseSdkForPrice_Price
      }
      status
    }
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: CancelListingModal_MetadataAccount$key;
  onHide: () => void;
};

// TODO: prevent cancellation if there are already bids
export default function CancelListingModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const viewerId = useViewerId();
  const [commit] = useMutation<CancelListingModalMutation>(mutation);
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { anchorWallet, connection } = useSolanaContext();
  const auctionHouseSdk = useAuctionHouseSdkForPrice(
    metadataAccountData.nft.priceV2
  );
  const [isLoading, setIsLoading] = useState(false);
  const {
    NftTransactions: { connectionId: nftTransactionsConnectionId },
  } = useRelayConnectionIdsContext();
  usePreventRefresh(isShown && isLoading);

  return (
    <GenericConfirmationModal
      bodyText={`This will cancel your current listing. You will need to list the NFT again in order to ${
        metadataAccountData.nft.status === "Listed"
          ? "accept bids"
          : "sell this piece"
      }.`}
      buttonText="Cancel listing"
      isShown={isShown}
      isLoading={isLoading}
      onHide={() => {
        if (isLoading) {
          notify({
            duration: 2,
            message: "Please wait for your cancellation to finish processing",
            type: "info",
          });
          return;
        }

        onHide();
      }}
      onConfirmClick={async () => {
        invariant(anchorWallet != null);
        invariant(auctionHouseSdk != null);

        setIsLoading(true);
        const mintKey = new PublicKey(metadataAccountData.mint);
        const tokenAccount = await getNftMintTokenAccountAddressOrAta(
          connection,
          mintKey,
          anchorWallet.publicKey
        );
        const tx = await auctionHouseSdk.cancelTx(
          {
            priceInLamports: Number(metadataAccountData.nft!.priceV2!.amount),
            tokenAccount,
            tokenMint: mintKey,
            wallet: anchorWallet.publicKey,
          },
          {}
        );
        const txid = await sendTransactionWithWallet({
          afterSignCallback: (unfinalizedTxid) => {
            commitRawTxMutation({
              mint: metadataAccountData.mint,
              rawTxType: CommitRawTxType.CancelListing,
              txid: unfinalizedTxid,
            });
          },
          connection,
          loggingData: {
            mint: mintKey.toString(),
            transactionType: "ListingCancelled",
          },
          txs: [tx],
          wallet: anchorWallet,
        });

        if (txid == null) {
          setIsLoading(false);
          return;
        }

        commit({
          onCompleted: () => {
            notify({ message: "Successfully unlisted!", txid });
            setIsLoading(false);
            onHide();
          },
          onError: (e) => {
            logIfNotProd("error unlisting (graphql)", e);
            notifyUnexpectedError();
          },
          variables: {
            [FetchGraphqlVariablesDenylist.Connections]: [
              nftTransactionsConnectionId ?? "",
            ],
            creator: metadataAccountData.nft.creatorId,
            lister: anchorWallet.publicKey.toString(),
            mint: mintKey.toString(),
            txid,
            unlockableWinnerUserEmailInput: {
              viewerId,
            },
          },
        });
      }}
      title="Cancel listing"
    />
  );
}
