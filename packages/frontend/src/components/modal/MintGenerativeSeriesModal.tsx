import graphql from "babel-plugin-relay/macro";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import BuyNowGenericModal from "components/modal/BuyNowGenericModal";
import ListingCardGeneric from "components/auction/ListingCardGeneric";
import ArtistPillButtonForUserExpress from "components/buttons/ArtistPillButtonForUserExpress";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import PriceWithSymbol from "components/price/PriceWithSymbol";
import FontClass from "types/enums/FontClass";
import NftOtherInfoWithSeparator from "components/auction/NftOtherInfoWithSeparator";
import useSolanaContext from "hooks/useSolanaContext";
import invariant from "tiny-invariant";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { MintGenerativeSeriesModalMutation } from "components/modal/__generated__/MintGenerativeSeriesModalMutation.graphql";
import { notify } from "components/toast/notifications";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import useUserContext from "hooks/useUserContext";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import { MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo$key } from "components/modal/__generated__/MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo.graphql";
import useCandyMachineViewerInfo from "hooks/candy-machine/useCandyMachineViewerInfo";
import useCandyMachineMintPhase from "hooks/candy-machine/useCandyMachineMintPhase";
import useCampaignContext from "hooks/useCampaignContext";
import { CAMPAIGN_PAGE_ACTIVITY_FIRST } from "hooks/campaign-page/v1/useCampaignPageActivity";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import { CandyMachineMintPhase } from "@formfunction-hq/formfunction-candy-machine";
import useCandyMachineMintPrice from "hooks/candy-machine/useCandyMachineMintPrice";
import usePriceCurrencyName from "hooks/candy-machine/usePriceCurrencyNameAndAmount";

const mutation = graphql`
  mutation MintGenerativeSeriesModalMutation(
    $insertNftTransactionInput: InsertNftTransactionInput!
    $metadataAccountConnections: [ID!]!
  ) {
    insertNftTransaction(input: $insertNftTransactionInput) {
      updatedMetadataAccount {
        assetHeight
        assetWidth
        mint
        nft {
          Creator {
            username
          }
        }
      }

      updatedMetadataAccount
        @prependNode(
          connections: $metadataAccountConnections
          edgeTypeName: "MetadataAccountsEdge"
        ) {
        ...ListingCardForMetadata_MetadataAccount
      }
    }
  }
`;

const candyMachineInfoFragment = graphql`
  fragment MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo on CampaignSectionWithGenerativeMintsCandyMachineInfo {
    id
    candyMachine {
      id
      antiBotProtectionEnabled
      publicKey
      totalAmountMinted
      CreatorAuthority {
        id

        ...ArtistPillButtonForUserExpress_UserExpress
      }

      ...useCandyMachineMintPhase_CandyMachineExpress
      ...useCandyMachineMintPrice_CandyMachineExpress
    }
    viewerAmountMinted

    ...useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo
  }
`;

type Props = {
  candyMachineInfo: MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo$key;
  connectionId: string;
  isShown: boolean;
  onHide: () => void;
  previewImageAsset: JSX.Element;
  title: string;
};

export default function MintGenerativeSeriesModal({
  candyMachineInfo,
  connectionId,
  isShown,
  onHide,
  previewImageAsset,
  title,
}: Props): JSX.Element {
  const [commit] = useMutation<MintGenerativeSeriesModalMutation>(mutation);
  const candyMachineInfoData = useFragment(
    candyMachineInfoFragment,
    candyMachineInfo
  );
  const { candyMachine } = candyMachineInfoData;
  const mintPhase = useCandyMachineMintPhase(candyMachine);
  const mintPrice = useCandyMachineMintPrice(candyMachine);
  const mintCurrencyInfo = usePriceCurrencyName(mintPrice);
  const { allowlistInfo } = useCandyMachineViewerInfo(candyMachineInfoData);
  const {
    campaignSlug,
    creatorUsername,
    loadCampaignActivityQuery,
    loadCampaignQuery,
  } = useCampaignContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mintedNftInfo, setMintedNftInfo] = useState<
    Maybe<{
      assetHeight: Maybe<number>;
      assetWidth: Maybe<number>;
      mint: string;
    }>
  >(null);
  const { user } = useUserContext();
  const { getCandyMachineSdk, anchorWallet, connection } = useSolanaContext();

  const onBuyNowClick = async () => {
    const candyMachineSdk = getCandyMachineSdk();
    invariant(anchorWallet != null);
    invariant(candyMachineSdk != null);
    setIsLoading(true);

    const mintKeypair = Keypair.generate();
    const walletAddress = anchorWallet.publicKey;
    const {
      proof,
      amountAllowed: amount,
      merkleRootIndexForProof: rootIndexForProof,
    } = allowlistInfo?.__typename ===
    "CandyMachineMerkleAllowlistInfoForViewerExpress"
      ? allowlistInfo
      : { amountAllowed: null, merkleRootIndexForProof: null, proof: null };

    const buyerAllowlistTokenAccount =
      allowlistInfo?.__typename === "CandyMachineTokenAllowlistInfoForViewer" &&
      allowlistInfo.allowlistTokenAccount != null
        ? new PublicKey(allowlistInfo.allowlistTokenAccount)
        : null;

    const buyerWithAllowlistProofData =
      proof != null && rootIndexForProof != null && amount != null
        ? {
            amount,
            rootIndexForProof,
            serializedProof: proof,
          }
        : null;

    const tx = await candyMachineSdk.mintNft(
      {
        buyer: anchorWallet.publicKey,
        buyerAllowlistTokenAccount,
        candyMachine: new PublicKey(candyMachine.publicKey),
        mint: mintKeypair.publicKey,
      },
      {
        buyerWithAllowlistProofData,
      }
    );

    const mintKeyString = mintKeypair.publicKey.toString();
    const mintNftTxid = await sendTransactionWithWallet({
      afterSignCallback: (unfinalizedTxid) => {
        commitRawTxMutation({
          mint: mintKeyString,
          rawTxType: CommitRawTxType.SoldGenerativeMint,
          txid: unfinalizedTxid,
        });
      },
      antiBotProtectionEnabled: candyMachine.antiBotProtectionEnabled,
      checkForBotTax: true,
      connection,
      loggingData: {
        mint: mintKeyString,
        transactionType: "SoldGenerativeMint",
      },
      signers: [mintKeypair],
      txs: [tx],
      wallet: anchorWallet,
    });
    if (mintNftTxid == null) {
      setIsLoading(false);
      return;
    }

    commit({
      onCompleted: (response) => {
        const { mint, assetHeight, assetWidth } =
          response.insertNftTransaction.updatedMetadataAccount;
        setMintedNftInfo({ assetHeight, assetWidth, mint });
        notify({
          message: "Minted successfully!",
          txid: mintNftTxid!,
        });
        setIsLoading(false);
        setIsSuccess(true);
        const queryInput = {
          campaignSlug,
          creatorUsername,
        };
        loadCampaignActivityQuery(
          {
            first: CAMPAIGN_PAGE_ACTIVITY_FIRST,
            input: queryInput,
          },
          {
            fetchPolicy: "store-and-network",
          }
        );
        loadCampaignQuery(
          {
            input: queryInput,
          },
          {
            fetchPolicy: "store-and-network",
          }
        );
      },
      onError: () => {
        notifyUnexpectedError();
        setIsLoading(false);
      },
      updater: (store) => {
        // Update minted count
        const candyMachineExpressRelayStoreObject = store.get(candyMachine.id);
        candyMachineExpressRelayStoreObject?.setValue(
          candyMachine.totalAmountMinted + 1,
          "totalAmountMinted"
        );

        // Update viewer amount minted
        const candyMachineInfoRelayStoreObject = store.get(
          candyMachineInfoData.id
        );
        candyMachineInfoRelayStoreObject?.setValue(
          (candyMachineInfoData.viewerAmountMinted ?? 0) + 1,
          "viewerAmountMinted"
        );

        // Update allowlist info
        if (mintPhase === CandyMachineMintPhase.Allowlist) {
          const viewerAllowlistInfo =
            candyMachineInfoRelayStoreObject?.getLinkedRecord(
              "viewerAllowlistInfo"
            );
          switch (viewerAllowlistInfo?.getValue("__typename")) {
            case "CandyMachineMerkleAllowlistInfoForViewerExpress":
              viewerAllowlistInfo.setValue(
                Number(viewerAllowlistInfo.getValue("amountMinted")) + 1,
                "amountMinted"
              );
              break;
            case "CandyMachineTokenAllowlistInfoForViewer":
              viewerAllowlistInfo.setValue(
                Number(viewerAllowlistInfo.getValue("allowlistTokenAmount")) -
                  1,
                "allowlistTokenAmount"
              );
              break;
            default:
              break;
          }
        }
      },
      variables: {
        [FetchGraphqlVariablesDenylist.MetadataAccountConnections]: [
          connectionId,
        ],
        insertNftTransactionInput: {
          creatorId: candyMachine.CreatorAuthority.id,
          currencyName: mintCurrencyInfo.name,
          fromUserId: candyMachine.CreatorAuthority.id,
          mint: mintKeypair.publicKey.toString(),
          price: mintCurrencyInfo.amount,
          toUserId: walletAddress.toString(),
          txid: mintNftTxid,
          type: "SoldGenerativeMint",
        },
      },
    });
  };

  const onHideAndReset = () => {
    onHide();
    setIsSuccess(false);
  };

  const listingCard = (
    <ListingCardGeneric
      enableMaxWidth
      artistPillButton={
        <ArtistPillButtonForUserExpress user={candyMachine.CreatorAuthority} />
      }
      image={previewImageAsset}
      title={title}
      otherInfo={
        <NftOtherInfoWithSeparator>
          <NftLabelAndContent label="Mint">
            <PriceWithSymbol fontClass={FontClass.NavLink} price={mintPrice} />
          </NftLabelAndContent>
        </NftOtherInfoWithSeparator>
      }
    />
  );

  return (
    <BuyNowGenericModal
      // TODO implement
      buyDisabledDescription={undefined}
      buySuccessButton={
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          href={getNftLinkRelative(
            user?.username ?? "",
            mintedNftInfo?.mint ?? "",
            mintedNftInfo?.assetWidth ?? null,
            mintedNftInfo?.assetHeight ?? null
          )}
          onClick={onHideAndReset}
          type="link_internal"
        >{`See your ${title}`}</ButtonWithText>
      }
      description="Once you mint the NFT, it will be transferred to you immediately."
      nftName={title}
      isLoading={isLoading}
      isShown={isShown}
      isSuccess={isSuccess}
      listingCard={listingCard}
      price={mintPrice}
      onBuyNowClick={onBuyNowClick}
      onHide={onHideAndReset}
      titleOverride={`Mint ${title}`}
      verbOverride="Mint"
    />
  );
}
