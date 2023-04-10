import { Keypair, PublicKey } from "@solana/web3.js";
import graphql from "babel-plugin-relay/macro";
import useSolanaContext from "hooks/useSolanaContext";
import useUserContext from "hooks/useUserContext";
import { useBuyEdition_MetadataAccount$key } from "hooks/__generated__/useBuyEdition_MetadataAccount.graphql";
import { useFragment, useMutation } from "react-relay";
import invariant from "tiny-invariant";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import { useBuyEditionMutation } from "hooks/__generated__/useBuyEditionMutation.graphql";
import getCreatorsForExecuteSale from "formfn-shared/dist/utils/sale/getCreatorsForExecuteSale";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import useNftPageContext from "hooks/useNftPageContext";
import useAuctionHouseSdkForPrice from "hooks/useAuctionHouseSdkForPrice";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import NotifyErrorDescription from "types/enums/NotifyErrorDescription";
import useViewerId from "hooks/useViewerId";
import { useBuyEdition_EditionsMerkleAllowlistInfoExpress$key } from "hooks/__generated__/useBuyEdition_EditionsMerkleAllowlistInfoExpress.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const mutation = graphql`
  mutation useBuyEditionMutation(
    $metadataAccountConnections: [ID!]!
    $nftTransactionConnections: [ID!]!
    $insertNftTransactionInput: InsertNftTransactionInput!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    insertNftTransaction(input: $insertNftTransactionInput) {
      editionsMerkleAllowlistInfoForBuyer {
        amountMinted
      }

      transaction
        @prependNode(
          connections: $nftTransactionConnections
          edgeTypeName: "NftTransactionsEdge"
        ) {
        ...NftTransaction_NftTransactionExpress
      }

      updatedMetadataAccount
        @appendNode(
          connections: $metadataAccountConnections
          edgeTypeName: "MetadataAccountsEdge"
        ) {
        ...NftEditionsTableRow_MetadataAccount
      }

      updatedMasterEditionMetadataAccount {
        ...NftPageContent_MetadataAccount
      }
    }
  }
`;

const fragment = graphql`
  fragment useBuyEdition_MetadataAccount on MetadataAccount {
    mint

    data {
      creators {
        # eslint-disable-next-line relay/unused-fields
        address
      }
    }

    nft {
      antiBotProtectionEnabled
      creatorId
      editionBuyLimitPerAddress
      ownerId
      priceV2 {
        amount
        currencyInfo {
          name
        }
        ...useAuctionHouseSdkForPrice_Price
      }
    }
  }
`;

const merkleAllowlistInfoFragment = graphql`
  fragment useBuyEdition_EditionsMerkleAllowlistInfoExpress on EditionsMerkleAllowlistInfoExpress {
    amountAllowed
    proof
    rootIndex
  }
`;

export default function useBuyEdition(
  metadataAccount: useBuyEdition_MetadataAccount$key,
  merkleAllowlistInfo: Maybe<useBuyEdition_EditionsMerkleAllowlistInfoExpress$key>
) {
  const viewerId = useViewerId();
  const { anchorWallet, connection } = useSolanaContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const merkleAllowlistInfoData = useFragment(
    merkleAllowlistInfoFragment,
    merkleAllowlistInfo
  );
  const auctionHouseSdk = useAuctionHouseSdkForPrice(
    metadataAccountData.nft.priceV2
  );
  const { mint, nft } = metadataAccountData;
  const { userId } = useUserContext();
  const [commit] = useMutation<useBuyEditionMutation>(mutation);
  const remainingAccounts = getCreatorsForExecuteSale(
    metadataAccountData.data.creators
  )!;
  const {
    EditionsForMasterEditionMint: {
      connectionId: editionsForMasterEditionMintConnectionId,
    },
    NftTransactions: { connectionId: nftTransactionsConnectionId },
  } = useRelayConnectionIdsContext();
  const { loadEditionBuyerInfoQuery } = useNftPageContext();

  return {
    buyEdition: async ({
      onCompleted,
      onError,
      priceOverride,
      setIsLoading,
    }: {
      onCompleted: (txid: string, newMint: string) => void;
      onError: (e: Error) => void;
      priceOverride?: number;
      setIsLoading: (val: boolean) => void;
    }) => {
      invariant(anchorWallet != null);
      invariant(auctionHouseSdk != null);
      invariant(userId != null);
      invariant(nft.priceV2 != null);

      setIsLoading(true);

      const mintKey = new PublicKey(mint);
      const userKey = new PublicKey(userId);
      const standardEditionMint = Keypair.generate();
      let tx;

      // Need to try catch as we try to load the edition distributor account
      // in the SDK method and that throws if the account isn't initialized yet
      // which can happen if the tx hasn't finalized yet.
      try {
        const accounts = {
          buyer: userKey,
          mint: mintKey,
          newMint: standardEditionMint.publicKey,
        };
        const args = {
          priceInLamports: priceOverride ?? nft.priceV2.amount,
        };
        tx = await auctionHouseSdk.buyEditionV2Tx(
          accounts,
          {
            ...args,
            buyerWithAllowlistProofData:
              merkleAllowlistInfoData == null
                ? null
                : {
                    address: anchorWallet.publicKey,
                    amount: merkleAllowlistInfoData.amountAllowed,
                    merkleTreeIndex: merkleAllowlistInfoData.rootIndex,
                    serializedProof: merkleAllowlistInfoData.proof,
                  },
          },
          remainingAccounts
        );
      } catch (e: any) {
        logError(
          AnalyticsEvent.BuyEditionError,
          "Auction House SDK threw when generating buyEditionV2Tx",
          { error: e }
        );
        notifyUnexpectedError(
          NotifyErrorDescription.UnexpectedErrorPleaseRefresh
        );
        setIsLoading(false);
        return;
      }

      const insertStandardEditionInput = {
        masterEditionMint: mint,
        ownerId: userId,
        standardEditionMint: standardEditionMint.publicKey.toString(),
      };
      const txid = await sendTransactionWithWallet({
        afterSignCallback: (unfinalizedTxid) => {
          commitRawTxMutation({
            extraData: { insertStandardEditionInput },
            mint: standardEditionMint.publicKey.toString(),
            rawTxType: CommitRawTxType.BuyEdition,
            txid: unfinalizedTxid,
          });
        },
        antiBotProtectionEnabled:
          metadataAccountData.nft.antiBotProtectionEnabled === true,
        checkForBotTax: true,
        connection,
        loggingData: {
          mint,
          newMint: standardEditionMint.publicKey.toString(),
          remainingAccounts,
          transactionType: CommitRawTxType.BuyEdition,
          userId,
        },
        signers: [standardEditionMint],
        txs: [tx],
        wallet: anchorWallet,
      });

      if (txid == null) {
        setIsLoading(false);
        return;
      }

      commit({
        onCompleted: () => {
          if (nft.editionBuyLimitPerAddress != null) {
            loadEditionBuyerInfoQuery(
              { input: { mint } },
              { fetchPolicy: "store-and-network" }
            );
          }
          onCompleted(txid, standardEditionMint.publicKey.toString());
        },
        onError,
        updater: (store) => {
          const editionsForMasterEditionMintConnectionRecord = store.get(
            editionsForMasterEditionMintConnectionId ?? ""
          );
          if (editionsForMasterEditionMintConnectionRecord == null) {
            return;
          }

          const totalCount =
            editionsForMasterEditionMintConnectionRecord.getValue(
              "totalCount"
            ) ?? 0;
          // We need to update the totalCount so NftEditionsTable gets properly paginated
          editionsForMasterEditionMintConnectionRecord.setValue(
            Number(totalCount) + 1,
            "totalCount"
          );
        },
        variables: {
          insertNftTransactionInput: {
            creatorId: nft.creatorId,
            currencyName: nft.priceV2.currencyInfo.name,
            fromUserId: nft.ownerId,
            insertStandardEditionInput,
            mint: standardEditionMint.publicKey.toString(),
            price: priceOverride ?? nft.priceV2.amount,
            toUserId: userId,
            txid,
            type: "SoldEditionPrimary",
          },
          unlockableWinnerUserEmailInput: {
            viewerId,
          },
          [FetchGraphqlVariablesDenylist.MetadataAccountConnections]: [
            editionsForMasterEditionMintConnectionId ?? "",
          ],
          [FetchGraphqlVariablesDenylist.NftTransactionConnections]: [
            nftTransactionsConnectionId ?? "",
          ],
        },
      });
    },
  };
}
