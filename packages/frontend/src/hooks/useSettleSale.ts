import { PublicKey } from "@solana/web3.js";
import graphql from "babel-plugin-relay/macro";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import { useSettleSaleMutation } from "hooks/__generated__/useSettleSaleMutation.graphql";
import { useSettleSale_MetadataAccount$key } from "hooks/__generated__/useSettleSale_MetadataAccount.graphql";
import { useFragment, useMutation } from "react-relay";
import SaleType from "types/enums/SaleType";
import getSoldTransactionTypeForSaleType from "utils/sale/getSoldTransactionTypeForSaleType";
import { SelectorStoreUpdater } from "relay-runtime";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import getNftExpressDataId from "utils/relay/getNftExpressDataId";
import shouldClearPnftId from "formfn-shared/dist/utils/pnft/shouldClearPnftId";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import { v4 } from "uuid";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import Currency from "types/relay/Currency";

const mutation = graphql`
  mutation useSettleSaleMutation(
    $creator: String!
    $currencyName: CurrencyNameExpress_enum
    $buyer: String!
    $seller: String!
    $mint: String!
    $offerTransactionId: String
    $price: bigint!
    $txid: String!
    $connections: [ID!]!
    $transactionType: NftTransactionTypeExpress_enum!
  ) {
    insertNftTransaction(
      input: {
        creatorId: $creator
        currencyName: $currencyName
        fromUserId: $seller
        toUserId: $buyer
        mint: $mint
        offerTransactionId: $offerTransactionId
        price: $price
        txid: $txid
        type: $transactionType
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
        nft {
          priceLastSoldV2 {
            amount
            currencyInfo {
              decimals
              shortSymbol
              symbol
            }
          }
        }
      }
    }
  }
`;

const fragment = graphql`
  fragment useSettleSale_MetadataAccount on MetadataAccount {
    id
    primarySaleHappened

    nft {
      creatorId
      ownerId
      pnftIdForAuction
    }

    unlockable {
      id
      activationPriceInLamports
    }
  }
`;

export default function useSettleSale(
  metadataAccount: useSettleSale_MetadataAccount$key,
  saleType: SaleType,
  currencyNameOverride?: Currency
) {
  const [commit] = useMutation<useSettleSaleMutation>(mutation);
  const {
    id: metadataAccountId,
    nft,
    primarySaleHappened,
    unlockable,
  } = useFragment(fragment, metadataAccount);
  const {
    NftTransactions: { connectionId: nftTransactionsConnectionId },
  } = useRelayConnectionIdsContext();
  const transactionType = getSoldTransactionTypeForSaleType(saleType);

  return {
    settleSale: async (input: {
      buyer: string;
      buyerPriceInLamports: number;
      executeSaleTxid: string;
      extraUpdater?: MaybeUndef<
        SelectorStoreUpdater<useSettleSaleMutation["response"]>
      >;
      mintKey: PublicKey;
      offerTransactionId?: string;
      onCompleted: () => void;
      onError: (e: Error) => void;
    }) => {
      const {
        buyer,
        buyerPriceInLamports,
        executeSaleTxid: txid,
        mintKey,
        offerTransactionId,
        onCompleted,
        onError,
        extraUpdater,
      } = input;
      commit({
        onCompleted,
        onError,
        updater: (store, data) => {
          if (extraUpdater != null) {
            extraUpdater(store, data);
          }

          // TODO[@bryancho]: if we use updatedMetadataAccount to update the MetadataAccount
          // record, it will wipe AuctionWinner (since after settling sale, the
          // status is no longer Auction and a null AuctionWinner will be sent down).
          // This causes ArtistPillButtonForUserExpress nested under SettleSaleModalContent
          // to break since it expects the user fragment passed in to be non-null.

          // For now, we retain the manual update for the nft record and we can fix
          // this issue as a separate refactor moving forward
          const nftRecord = store.get(getNftExpressDataId(mintKey.toString()));
          if (nftRecord != null) {
            const { priceLastSoldV2 } =
              data.insertNftTransaction.updatedMetadataAccount.nft;
            const { currencyInfo } = priceLastSoldV2 ?? {};
            nftRecord.setValue(buyerPriceInLamports, "price");
            nftRecord.setValue(
              buyerPriceInLamports,
              "priceLastSoldForInLamports"
            );
            nftRecord.setValue(buyer, "ownerId");
            nftRecord.setValue("Owned", "status");
            const priceLastSoldRecord =
              nftRecord.getLinkedRecord("priceLastSoldV2");
            priceLastSoldRecord?.setValue(priceLastSoldV2?.amount, "amount");
            const currencyInfoRecord =
              priceLastSoldRecord?.getLinkedRecord("currencyInfo");
            currencyInfoRecord?.setValue(currencyInfo?.decimals, "decimals");
            currencyInfoRecord?.setValue(currencyInfo?.symbol, "symbol");
            currencyInfoRecord?.setValue(
              currencyInfo?.shortSymbol,
              "shortSymbol"
            );

            const shouldClearPnft = shouldClearPnftId(
              primarySaleHappened,
              transactionType
            );
            nftRecord.setValue(
              shouldClearPnft ? null : nft.pnftIdForAuction,
              "pnftIdForAuction"
            );

            const ownerRecord = store.get(buyer!);
            nftRecord.setLinkedRecord(ownerRecord!, "Owner");
          } else {
            logError(
              AnalyticsEvent.RelayUpdaterError,
              "nftRecord was null in useSettleSale Relay store update but it should not be",
              { metadataAccountId, mintKey, nft, nftRecord }
            );
          }

          const metadataAccountRecord = store.get(metadataAccountId);
          if (metadataAccountRecord != null) {
            metadataAccountRecord.setValue(true, "primarySaleHappened");
          } else {
            logError(
              AnalyticsEvent.RelayUpdaterError,
              "metadataAccountRecord was null in useSettleSale Relay store update but it should not be",
              { metadataAccountId, metadataAccountRecord, mintKey, nft }
            );
          }

          // The unlockable either has no activation price or the sale price
          // must be greater than or equal to the activation price.
          const validActivationPrice =
            unlockable?.activationPriceInLamports == null ||
            buyerPriceInLamports >= unlockable.activationPriceInLamports;

          // The UnlockableWinner gets created async by a Hasura event trigger,
          // which means it won't exist in the creator's UI just after settling
          // a sale. Therefore, we create the UnlockableWinner if the sale includes
          // an unlockable and the buyer has won it.
          if (unlockable != null && validActivationPrice) {
            const unlockableRecord = store.get(unlockable.id);
            if (unlockableRecord != null) {
              const id = v4();
              const unlockableWinner = store.create(
                id,
                "UnlockableWinnerExpress"
              );

              // The created object here needs to include all of the fields which
              // are queried elsewhere in the UI on the UnlockableWinner object,
              // otherwise the UI may suspend later when NftPage queries poll and
              // fetch additional fields which were not set here. Therefore,
              // keep this in sync with all other unlockableWinners fragments,
              // which can be found if need be by running the following commands
              // in the packages/frontend directory:
              // grep "unlockableWinners {" -r --include=\*.tsx --include=\*.{ts,tsx} --exclude=\*.graphql.ts ./
              // grep "on UnlockableWinnerExpress" -r --include=\*.{ts,tsx} --exclude=\*.graphql.ts ./
              unlockableWinner.setValue(id, "id");
              unlockableWinner.setValue(buyer, "userId");
              unlockableWinner.setValue(null, "userEmail");
              unlockableWinner.setValue(false, "hasBuyerDismissedShareInfoCta");
              unlockableWinner.setValue(false, "hasCreatorDismissedSeeInfoCta");
              unlockableWinner.setValue(
                "UnlockableWinnerExpress",
                "__typename"
              );

              const currentStoreRecords =
                unlockableRecord.getLinkedRecords("unlockableWinners") ?? [];

              unlockableRecord.setLinkedRecords(
                [unlockableWinner, ...currentStoreRecords],
                "unlockableWinners"
              );
            } else {
              logError(
                AnalyticsEvent.RelayUpdaterError,
                "unlockableRecord was null in useSettleSale Relay store update but it should not be",
                { metadataAccountId, unlockable, unlockableRecord }
              );
            }
          }
        },
        variables: {
          buyer,
          creator: nft.creatorId,
          [FetchGraphqlVariablesDenylist.Connections]: [
            nftTransactionsConnectionId ?? "",
          ],
          currencyName: currencyNameOverride ?? undefined,
          mint: mintKey.toString(),
          offerTransactionId,
          price: buyerPriceInLamports,
          seller: nft.ownerId,
          transactionType,
          txid,
        },
      });
    },
  };
}
