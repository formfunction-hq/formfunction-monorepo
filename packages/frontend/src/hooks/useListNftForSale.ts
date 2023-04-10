import graphql from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import {
  InsertNftTransactionUpdateNftInput,
  useListNftForSaleMutation,
} from "hooks/__generated__/useListNftForSaleMutation.graphql";
import { PublicKey } from "@solana/web3.js";
import { useListNftForSale_MetadataAccount$key } from "hooks/__generated__/useListNftForSale_MetadataAccount.graphql";
import invariant from "tiny-invariant";
import useListingContext from "hooks/useListingContext";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import ListingType from "types/enums/ListingType";
import getListingTransactionTypeForListingType from "utils/listing/getListingTransactionTypeForListingType";
import getTagChangeset from "utils/listing/getTagChangeset";
import sendSellTx from "utils/solana/listing/sendSellTx";
import useSolanaContext from "hooks/useSolanaContext";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";
import getNftToTagObjects from "utils/relay/getNftToTagObjects";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import TickSizeType from "types/enums/TickSizeType";
import logIfNotProd from "utils/logIfNotProd";
import useCreateUnlockableContext from "hooks/useCreateUnlockableContext";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useViewerId from "hooks/useViewerId";

const mutation = graphql`
  mutation useListNftForSaleMutation(
    $connections: [ID!]!
    $currencyName: CurrencyNameExpress_enum!
    $creator: String!
    $deleteFilter: NftToTag_bool_exp!
    $lister: String!
    $listingType: NftTransactionTypeExpress_enum!
    $mint: String!
    $nftToTagObjects: [NftToTag_insert_input!]!
    $price: bigint!
    $txid: String!
    $updateNftInput: InsertNftTransactionUpdateNftInput!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    delete_NftToTag(where: $deleteFilter) {
      returning {
        nftId
        tagId
      }
    }

    insert_NftToTag(objects: $nftToTagObjects) {
      returning {
        nftId
        tagId
      }
    }

    insertNftTransaction(
      input: {
        creatorId: $creator
        currencyName: $currencyName
        fromUserId: $lister
        mint: $mint
        price: $price
        toUserId: $lister
        txid: $txid
        type: $listingType
        updateNftInput: $updateNftInput
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
  fragment useListNftForSale_MetadataAccount on MetadataAccount {
    mint

    nft {
      creatorId
    }

    tags
  }
`;

export default function useListNftForSale(
  metadataAccount: useListNftForSale_MetadataAccount$key
) {
  const viewerId = useViewerId();
  const { anchorWallet, getAuctionHouseSdk, connection } = useSolanaContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const originalTags = [...metadataAccountData.tags];
  const [commit] = useMutation<useListNftForSaleMutation>(mutation);
  const {
    NftTransactions: { connectionId: nftTransactionsConnectionId },
  } = useRelayConnectionIdsContext();
  const {
    price,
    currencyConfig,
    enableUnlockable,
    auctionTime,
    endTime,
    scheduledAuctionDateAndTime,
    tags,
    tickSizeConstantInSol,
    tickSizeType,
  } = useListingContext();
  const auctionHouseSdk = getAuctionHouseSdk(currencyConfig.name);
  const { createUnlockableMutationInput } = useCreateUnlockableContext();

  return {
    listNftForSale: async (input: {
      listingType: ListingType;
      onCompleted: (txid: string) => void;
      onError?: (e: Error) => void;
      pnftId?: string;
      setIsLoading: (val: boolean) => void;
    }) => {
      invariant(anchorWallet != null);
      invariant(auctionHouseSdk != null);

      const { listingType, onCompleted, onError, pnftId, setIsLoading } = input;
      setIsLoading(true);

      const lister = anchorWallet.publicKey.toString();
      const { newTags, deletedTags } = getTagChangeset(tags, originalTags);
      const mintKey = new PublicKey(metadataAccountData.mint);
      const tokenAccount = await getNftMintTokenAccountAddressOrAta(
        connection,
        mintKey,
        anchorWallet.publicKey
      );

      const listingPriceInFullDecimals = convertToFullDecimals(
        price,
        currencyConfig.decimals
      );
      const tickSizeConstantInFullDecimals =
        tickSizeType !== TickSizeType.Fixed
          ? null
          : convertToFullDecimals(
              tickSizeConstantInSol,
              currencyConfig.decimals
            );

      const insertUnlockableInput = enableUnlockable
        ? await createUnlockableMutationInput()
        : null;

      const updateNftInput: InsertNftTransactionUpdateNftInput = {
        auctionDurationInSeconds: auctionTime.asSeconds(),
        insertUnlockableInput,
        pnftIdForAuction: pnftId,
        scheduledAuctionTime:
          scheduledAuctionDateAndTime?.toString() ?? undefined,
        tickSizeConstantInLamports: tickSizeConstantInFullDecimals,
        timeExtensionDurationInSeconds: endTime.asSeconds(),
      };
      const txid = await sendSellTx(
        listingType,
        connection,
        auctionHouseSdk,
        anchorWallet,
        {
          priceInLamports: listingPriceInFullDecimals,
          tokenAccount,
          tokenMint: mintKey,
          wallet: new PublicKey(anchorWallet.publicKey.toString()),
        },
        {
          tickSizeConstantInLamports: tickSizeConstantInFullDecimals,
        },
        {
          updateNftInput,
        }
      );

      if (txid == null) {
        setIsLoading(false);
        return;
      }

      commit({
        onCompleted: () => onCompleted(txid),
        onError: (e) => {
          if (onError != null) {
            onError(e);
            return;
          }

          setIsLoading(false);
          logIfNotProd("error listing (graphql)", e);
          notifyUnexpectedError();
        },
        variables: {
          [FetchGraphqlVariablesDenylist.Connections]: [
            nftTransactionsConnectionId ?? "",
          ],
          // TODO: should check more carefully. Only NFTs created on our platform should
          // be able to be listed tho...
          creator: metadataAccountData.nft.creatorId,
          currencyName: currencyConfig.name,
          deleteFilter: {
            _or: deletedTags.map((tag) => ({
              Tag: { value: { _eq: tag } },
            })),
          },
          lister,
          listingType: getListingTransactionTypeForListingType(listingType),
          mint: mintKey.toString(),
          nftToTagObjects: getNftToTagObjects(newTags, mintKey.toString()),
          price: listingPriceInFullDecimals,
          txid,
          unlockableWinnerUserEmailInput: {
            viewerId,
          },
          updateNftInput,
        },
      });
    },
  };
}
