import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
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
import { useChangePriceForEditions_MetadataAccount$key } from "hooks/__generated__/useChangePriceForEditions_MetadataAccount.graphql";
import { useChangePriceForEditionsMutation } from "hooks/__generated__/useChangePriceForEditionsMutation.graphql";
import convertPriceFunctionTypeToRelay from "utils/convert/convertPriceFunctionTypeToRelay";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import useAuctionHouseSdkForPrice from "hooks/useAuctionHouseSdkForPrice";
import useViewerId from "hooks/useViewerId";
import dayjs from "utils/dates/dayjsex";

const mutation = graphql`
  mutation useChangePriceForEditionsMutation(
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
  fragment useChangePriceForEditions_MetadataAccount on MetadataAccount {
    mint
    nft {
      editionAllowlistEnabled
      editionAllowlistSaleStartTime
      editionPublicSaleStartTime
      editionPriceInfo {
        allowlistPriceInFullDecimals
      }

      priceV2 {
        ...useAuctionHouseSdkForPrice_Price
      }
    }
  }
`;

export default function useChangePriceForEditions(
  metadataAccount: useChangePriceForEditions_MetadataAccount$key
) {
  const viewerId = useViewerId();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { nft } = metadataAccountData;
  const { anchorWallet, connection } = useSolanaContext();
  const auctionHouseSdk = useAuctionHouseSdkForPrice(nft.priceV2);
  const {
    NftTransactions: { connectionId: nftTransactionsConnectionId },
  } = useRelayConnectionIdsContext();
  const { userId } = useUserContext();
  const [commit] = useMutation<useChangePriceForEditionsMutation>(mutation);

  return {
    changePriceForEditions: async ({
      onCompleted,
      onError,
      priceFunctionType,
      priceParams,
      setIsLoading,
      startingPriceLamports,
    }: {
      onCompleted: (txid: string) => void;
      onError: (e: Error) => void;
      priceFunctionType: PriceFunctionType;
      priceParams: Array<number>;
      setIsLoading: (val: boolean) => void;
      startingPriceLamports: number;
    }) => {
      invariant(anchorWallet != null);
      invariant(auctionHouseSdk != null);
      invariant(userId != null);

      setIsLoading(true);

      const { mint } = metadataAccountData;
      const mintKey = new PublicKey(mint);
      const userKey = new PublicKey(userId);
      const tx = await auctionHouseSdk.updateEditionDistributorTx(
        {
          mint: mintKey,
          owner: userKey,
        },
        {
          allowlistSalePrice:
            nft.editionPriceInfo?.allowlistPriceInFullDecimals == null
              ? null
              : nft.editionPriceInfo.allowlistPriceInFullDecimals,
          allowlistSaleStartTime: !nft.editionAllowlistEnabled
            ? null
            : nft.editionAllowlistSaleStartTime == null
            ? // TODO[@arcticmatt] should make the SDK handle this case more nicely
              //
              // Our SDK will error if we pass null here, but non-null for allowlistSalePrice.
              //
              // So if we're changing the price for an edition that doesn't have an allowlist sale start time,
              // but has an allowlist sale price, we'll pass the current unix time.
              dayjs().unix()
            : dayjs(nft.editionAllowlistSaleStartTime).unix(),
          priceFunctionType,
          priceParams,
          publicSaleStartTime:
            nft.editionPublicSaleStartTime == null
              ? null
              : dayjs(nft.editionPublicSaleStartTime).unix(),
          saleEndTime: null,
          startingPriceLamports,
        }
      );
      const editionsInput = {
        priceFunctionType: convertPriceFunctionTypeToRelay(priceFunctionType),
        priceParams,
        startingPriceInLamports: startingPriceLamports,
      };
      const txid = await sendTransactionWithWallet({
        afterSignCallback: (unfinalizedTxid) => {
          commitRawTxMutation({
            extraData: { editionsInput },
            mint,
            rawTxType: CommitRawTxType.ChangePriceForEditions,
            txid: unfinalizedTxid,
          });
        },
        connection,
        loggingData: {
          mint,
          transactionType: CommitRawTxType.ChangePriceForEditions,
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
            creatorId: userId,
            editionsInput,
            fromUserId: userId,
            mint,
            price: startingPriceLamports,
            toUserId: userId,
            txid,
            type: "ChangePriceForEditions",
          },
          unlockableWinnerUserEmailInput: {
            viewerId,
          },
        },
      });
    },
  };
}
