import dayjs from "utils/dates/dayjsex";
import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
import graphql from "babel-plugin-relay/macro";
import useUserContext from "hooks/useUserContext";
import { useListEditionsForSale_MetadataAccount$key } from "hooks/__generated__/useListEditionsForSale_MetadataAccount.graphql";
import { useFragment, useMutation } from "react-relay";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import { useListEditionsForSaleMutation } from "hooks/__generated__/useListEditionsForSaleMutation.graphql";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import getTagChangeset from "utils/listing/getTagChangeset";
import getNftToTagObjects from "utils/relay/getNftToTagObjects";
import convertPriceFunctionTypeToRelay from "utils/convert/convertPriceFunctionTypeToRelay";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useListingContext from "hooks/useListingContext";
import useViewerId from "hooks/useViewerId";
import useCreateEditionDistributor from "hooks/useCreateEditionDistributor";
import { Dayjs } from "dayjs";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";

const mutation = graphql`
  mutation useListEditionsForSaleMutation(
    $connections: [ID!]!
    $deleteFilter: NftToTag_bool_exp!
    $insertNftTransactionInput: InsertNftTransactionInput!
    $nftToTagObjects: [NftToTag_insert_input!]!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    # Perform tag operations first, so the updatedMetadataAccount has updated tags
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
  fragment useListEditionsForSale_MetadataAccount on MetadataAccount {
    mint

    tags
  }
`;

export default function useListEditionsForSale(
  metadataAccount: useListEditionsForSale_MetadataAccount$key
) {
  const viewerId = useViewerId();
  const {
    NftTransactions: { connectionId: nftTransactionsConnectionId },
  } = useRelayConnectionIdsContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { mint } = metadataAccountData;
  const { userId } = useUserContext();
  const [commit] = useMutation<useListEditionsForSaleMutation>(mutation);
  const originalTags = [...metadataAccountData.tags];
  const { currencyConfig } = useListingContext();
  const { createEditionDistributor } =
    useCreateEditionDistributor(currencyConfig);

  return {
    listEditionsForSale: async ({
      editionsInput,
      onCompleted,
      onError,
      setIsLoading,
      tags,
      updateNftInput,
    }: {
      editionsInput: {
        allowlistAddresses?: ReadonlyArray<string>;
        allowlistAmountAllowed: Maybe<number>;
        allowlistEnabled?: boolean;
        allowlistPriceInFullDecimals: Maybe<number>;
        allowlistStartTime?: Dayjs;
        priceFunctionType: PriceFunctionType;
        priceParams: Array<number>;
        publicSaleStartTime?: Dayjs;
        startingPriceInFullDecimals: number;
      };
      onCompleted: (txid: string) => void;
      onError: (e: Error) => void;
      setIsLoading: (val: boolean) => void;
      tags: Array<string>;
      updateNftInput: {
        antiBotProtectionEnabled: boolean;
        editionBuyLimitPerAddress: Maybe<number>;
      };
    }) => {
      const editionsInputInner = {
        allowlistAddresses: editionsInput.allowlistAddresses?.filter((value) =>
          isPublicKey(value)
        ),
        allowlistAmountAllowed: editionsInput.allowlistAmountAllowed,
        allowlistEnabled: editionsInput.allowlistEnabled,
        allowlistPrice: editionsInput.allowlistPriceInFullDecimals,
        allowlistStartTime: editionsInput.allowlistStartTime?.toString(),
        priceFunctionType: convertPriceFunctionTypeToRelay(
          editionsInput.priceFunctionType
        ),
        priceParams: editionsInput.priceParams,
        publicSaleStartTime: editionsInput.publicSaleStartTime?.toString(),
        startingPriceInLamports: editionsInput.startingPriceInFullDecimals,
      };
      const txid = await createEditionDistributor({
        afterSignCallback: (unfinalizedTxid: string) => {
          commitRawTxMutation({
            extraData: { editionsInput: editionsInputInner, updateNftInput },
            mint,
            rawTxType: CommitRawTxType.ListEditions,
            txid: unfinalizedTxid,
          });
        },
        allowlistPriceInFullDecimals:
          editionsInput.allowlistPriceInFullDecimals,
        allowlistStartTime: editionsInput.allowlistEnabled
          ? editionsInput.allowlistStartTime ?? dayjs()
          : undefined,
        antiBotProtectionEnabled: updateNftInput.antiBotProtectionEnabled,
        editionBuyLimitPerAddress: updateNftInput.editionBuyLimitPerAddress,
        mint,
        priceFunctionType: editionsInput.priceFunctionType,
        priceParams: editionsInputInner.priceParams,
        publicSaleStartTime: !editionsInput.allowlistEnabled
          ? undefined
          : editionsInput.publicSaleStartTime,
        setIsLoading,
        startingPriceInFullDecimals: editionsInput.startingPriceInFullDecimals,
      });
      if (txid == null) {
        setIsLoading(false);
        return;
      }

      const { newTags, deletedTags } = getTagChangeset(tags, originalTags);
      commit({
        onCompleted: () => onCompleted(txid),
        onError,
        variables: {
          [FetchGraphqlVariablesDenylist.Connections]: [
            nftTransactionsConnectionId ?? "",
          ],
          deleteFilter: {
            _or: deletedTags.map((tag) => ({
              Tag: { value: { _eq: tag } },
            })),
          },
          insertNftTransactionInput: {
            creatorId: userId!,
            currencyName: currencyConfig.name,
            editionsInput: editionsInputInner,
            fromUserId: userId!,
            mint,
            price: editionsInput.startingPriceInFullDecimals,
            toUserId: userId!,
            txid,
            type: "ListedEditions",
            updateNftInput,
          },
          nftToTagObjects: getNftToTagObjects(newTags, mint),
          unlockableWinnerUserEmailInput: {
            viewerId,
          },
        },
      });
    },
  };
}
