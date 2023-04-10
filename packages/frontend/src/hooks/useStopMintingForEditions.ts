import { PublicKey } from "@solana/web3.js";
import graphql from "babel-plugin-relay/macro";
import useSolanaContext from "hooks/useSolanaContext";
import useUserContext from "hooks/useUserContext";
import { useFragment, useMutation } from "react-relay";
import invariant from "tiny-invariant";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import { useStopMintingForEditions_MetadataAccount$key } from "hooks/__generated__/useStopMintingForEditions_MetadataAccount.graphql";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import { useStopMintingForEditionsMutation } from "hooks/__generated__/useStopMintingForEditionsMutation.graphql";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import useAuctionHouseSdkForPrice from "hooks/useAuctionHouseSdkForPrice";
import useViewerId from "hooks/useViewerId";

const mutation = graphql`
  mutation useStopMintingForEditionsMutation(
    $connections: [ID!]!
    $insertNftTransactionInput: InsertNftTransactionInput!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    insertNftTransaction(input: $insertNftTransactionInput) {
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
  fragment useStopMintingForEditions_MetadataAccount on MetadataAccount {
    mint

    nft {
      creatorId
      priceV2 {
        ...useAuctionHouseSdkForPrice_Price
      }
    }
  }
`;

export default function useStopMintingForEditions(
  metadataAccount: useStopMintingForEditions_MetadataAccount$key
) {
  const viewerId = useViewerId();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { anchorWallet, connection } = useSolanaContext();
  const auctionHouseSdk = useAuctionHouseSdkForPrice(
    metadataAccountData.nft.priceV2
  );
  const { nft } = metadataAccountData;
  const { userId } = useUserContext();
  const [commit] = useMutation<useStopMintingForEditionsMutation>(mutation);
  const {
    NftTransactions: { connectionId: nftTransactionsConnectionId },
  } = useRelayConnectionIdsContext();

  return {
    stopMintingForEditions: async ({
      onCompleted,
      onError,
      setIsLoading,
    }: {
      onCompleted: (txid: string) => void;
      onError: (e: Error) => void;
      setIsLoading: (val: boolean) => void;
    }) => {
      invariant(anchorWallet != null);
      invariant(auctionHouseSdk != null);
      invariant(userId != null);

      setIsLoading(true);

      const { mint } = metadataAccountData;

      const mintKey = new PublicKey(mint);
      const userKey = new PublicKey(userId);
      const [ata] = await findAta(userKey, mintKey);
      const tx = await auctionHouseSdk.closeEditionDistributorTokenAccount({
        mint: mintKey,
        owner: userKey,
        rentReceiver: userKey,
        tokenReceiver: ata,
        wallet: userKey,
      });
      const txid = await sendTransactionWithWallet({
        afterSignCallback: (unfinalizedTxid) => {
          commitRawTxMutation({
            mint,
            rawTxType: CommitRawTxType.StoppedMintingForEditions,
            txid: unfinalizedTxid,
          });
        },
        connection,
        loggingData: {
          mint,
          transactionType: CommitRawTxType.StoppedMintingForEditions,
          userId,
        },
        txs: [tx],
        wallet: anchorWallet,
      });

      if (txid == null) {
        setIsLoading(false);
        return;
      }

      commit({
        onCompleted: () => onCompleted(txid),
        onError,
        variables: {
          [FetchGraphqlVariablesDenylist.Connections]: [
            nftTransactionsConnectionId ?? "",
          ],
          insertNftTransactionInput: {
            creatorId: nft.creatorId,
            fromUserId: userId,
            mint,
            toUserId: userId,
            txid,
            type: "StoppedMintingForEditions",
          },
          unlockableWinnerUserEmailInput: {
            viewerId,
          },
        },
      });
    },
  };
}
