import ButtonWithText from "components/buttons/ButtonWithText";
import ErrorMessage from "components/text/ErrorMessage";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import GenericModal from "components/modal/GenericModal";
import styles from "css/modal/ClaimPnftModal.module.css";
import { useState } from "react";
import WaitingForTransactionModal from "components/modal/WaitingForTransactionModal";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import graphql from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import invariant from "tiny-invariant";
import useSolanaContext from "hooks/useSolanaContext";
import { ClaimantWithProof } from "@formfunction-hq/formfunction-gumdrop";
import { Keypair, PublicKey } from "@solana/web3.js";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import { notify } from "components/toast/notifications";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import { ClaimPnftModal_MetadataAccount$key } from "components/modal/__generated__/ClaimPnftModal_MetadataAccount.graphql";
import {
  ClaimPnftModalMutation,
  ClaimPnftModalMutation$variables,
} from "components/modal/__generated__/ClaimPnftModalMutation.graphql";
import { ClaimPnftModal_Claim$key } from "components/modal/__generated__/ClaimPnftModal_Claim.graphql";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useConfetti from "hooks/useConfetti";
import GenericSuccessModalContent from "components/modal/GenericSuccessModalContent";
import useUserContext from "hooks/useUserContext";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import useNftPageContext from "hooks/useNftPageContext";
import { ClaimPnftModal_AuctionNft_MetadataAccount$key } from "components/modal/__generated__/ClaimPnftModal_AuctionNft_MetadataAccount.graphql";
import toObject from "formfn-shared/dist/utils/toObject";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import NotifyErrorDescription from "types/enums/NotifyErrorDescription";
import useViewerId from "hooks/useViewerId";

const auctionNftFragment = graphql`
  fragment ClaimPnftModal_AuctionNft_MetadataAccount on MetadataAccount {
    assetHeight
    assetWidth
    mint
  }
`;

const pnftFragment = graphql`
  fragment ClaimPnftModal_MetadataAccount on MetadataAccount {
    mint

    nft {
      creatorId
    }

    data {
      name
    }

    ...ListingCardForMetadata_MetadataAccount
  }
`;

const claimFragment = graphql`
  fragment ClaimPnftModal_Claim on Claim {
    id
    proof
  }
`;

const insertNftTransactionMutation = graphql`
  mutation ClaimPnftModalMutation(
    $creatorId: String!
    $ownerId: String!
    $edition: Int!
    $pnftLimitedEditionMint: PublicKey!
    $pnftLimitedEditionMintString: String!
    $pnftMasterEditionMint: PublicKey!
    $txid: String!
    $claimId: uuid!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    insertNftTransaction(
      input: {
        creatorId: $creatorId
        fromUserId: $creatorId
        toUserId: $ownerId
        mint: $pnftLimitedEditionMintString
        txid: $txid
        type: ClaimedPnft
        insertPnftInput: {
          edition: $edition
          ownerId: $ownerId
          pnftLimitedEditionMint: $pnftLimitedEditionMint
          pnftMasterEditionMint: $pnftMasterEditionMint
        }
        updateClaimInput: { claimId: $claimId }
      }
    ) {
      transaction {
        id
        ...NftTransaction_NftTransactionExpress
      }

      updatedMetadataAccount {
        ...NftPageContent_MetadataAccount
      }
    }
  }
`;

type Props = {
  auctionNftMetadataAccount: ClaimPnftModal_AuctionNft_MetadataAccount$key;
  claim: ClaimPnftModal_Claim$key;
  isShown: boolean;
  onHide: () => void;
  pnftMetadataAccount: ClaimPnftModal_MetadataAccount$key;
};

export default function ClaimPnftModal({
  auctionNftMetadataAccount,
  claim,
  isShown,
  pnftMetadataAccount,
  onHide,
}: Props) {
  const viewerId = useViewerId();
  const showConfetti = useConfetti();
  const { user, userId } = useUserContext();
  const { gumdropSdk, anchorWallet, connection } = useSolanaContext();
  const pnftMetadataAccountData = useFragment(
    pnftFragment,
    pnftMetadataAccount
  );
  const auctionNftMetadataAccountData = useFragment(
    auctionNftFragment,
    auctionNftMetadataAccount
  );
  const claimData = useFragment(claimFragment, claim);
  const { loadClaimsQuery } = useNftPageContext();

  const [commitInsertNftTransactionMutation] =
    useMutation<ClaimPnftModalMutation>(insertNftTransactionMutation);

  const [newMint, setNewMint] = useState<Maybe<PublicKey>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (pnftMetadataAccountData == null) {
    return null;
  }

  const { mint: pnftMasterEditionMint, nft: pnft } = pnftMetadataAccountData;
  const { creatorId: pnftCreatorId } = pnft;

  const onError = (error: any) => {
    setIsLoading(false);
    notifyUnexpectedError();
    setErrorMessage("Failed to claim participation NFT.");
    logError(AnalyticsEvent.ClaimPnftError, error);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const { proof } = claimData;

    // TODO[@bonham000][pNFTs]: Remove this after debugging why it happens.
    if (gumdropSdk == null) {
      logError(
        AnalyticsEvent.GumdropSdkNull,
        "Gumdrop SDK in ClaimPnftModal was null, but should not be.",
        toObject({
          anchorWalletPublicKey: anchorWallet?.publicKey.toString(),
          auctionNftMetadataAccountData,
          claim: claimData,
          gumdropSdk,
          isAnchorWalletNullOrUndefined: anchorWallet == null,
          pnftMetadataAccountData,
        })
      );
      notifyUnexpectedError(
        NotifyErrorDescription.UnexpectedErrorPleaseRefresh
      );
      setIsLoading(false);
      onHide();
      return;
    }

    invariant(proof != null);
    invariant(gumdropSdk != null);
    invariant(anchorWallet != null);

    const claimantWithProof: ClaimantWithProof = {
      address: anchorWallet.publicKey,
      amount: 1,
      serializedProof: proof,
    };

    const limitedEditionMintKeypair = Keypair.generate();
    const mint = new PublicKey(pnftMetadataAccountData.mint);
    const [distributor] = await gumdropSdk.findDistributorPda(
      mint,
      new PublicKey(pnftCreatorId)
    );

    const edition = await gumdropSdk.findNextEditionNumber(mint);
    const tx = await gumdropSdk.claimEditionTx(
      {
        distributor,
        limitedEditionUpdateAuthority: new PublicKey(pnftCreatorId),
        mint,
        newMint: limitedEditionMintKeypair.publicKey,
        wallet: anchorWallet.publicKey,
      },
      { claimant: claimantWithProof, edition }
    );

    const pnftMint = limitedEditionMintKeypair.publicKey;
    const insertPnftInput = {
      edition,
      ownerId: anchorWallet.publicKey.toString(),
      pnftLimitedEditionMint: pnftMint.toString(),
      pnftMasterEditionMint,
    };
    const updateClaimInput = {
      claimId: claimData.id,
    };

    const txid = await sendTransactionWithWallet({
      afterSignCallback: (unfinalizedTxid) => {
        commitRawTxMutation({
          extraData: {
            insertPnftInput,
            updateClaimInput,
          },
          mint: pnftMetadataAccountData.mint,
          rawTxType: CommitRawTxType.ClaimPnft,
          txid: unfinalizedTxid,
        });
      },
      connection,
      loggingData: {
        distributor: distributor.toString(),
        limitedEditionMintPubicKey:
          limitedEditionMintKeypair.publicKey.toString(),
        mint: mint.toString(),
        transactionType: "ClaimedPnft",
        wallet: anchorWallet.publicKey.toString(),
      },
      signers: [limitedEditionMintKeypair],
      txs: [tx],
      wallet: anchorWallet,
    });

    if (txid == null) {
      setIsLoading(false);
      return;
    }

    const variables: ClaimPnftModalMutation$variables = {
      creatorId: pnft.creatorId,
      pnftLimitedEditionMintString: pnftMint.toString(),
      txid,
      unlockableWinnerUserEmailInput: {
        viewerId,
      },
      ...insertPnftInput,
      ...updateClaimInput,
    };
    commitInsertNftTransactionMutation({
      onCompleted: (_insertedTransaction) => {
        loadClaimsQuery(
          {
            auctionNftId: auctionNftMetadataAccountData.mint,
            userId: userId ?? "",
          },
          { fetchPolicy: "store-and-network" }
        );
        setIsLoading(false);
        setNewMint(limitedEditionMintKeypair.publicKey);
        notify({
          message: "Claimed participation NFT",
          txid,
          type: "success",
        });
        setShowSuccessModal(true);
        showConfetti();
      },
      onError,
      variables,
    });
  };

  const handleOnSubmit = async () => {
    try {
      await onSubmit();
    } catch (err: any) {
      onError(err);
    }
  };

  const body = (
    <>
      <div className={styles.subtitle}>
        <Body2 colorClass={ColorClass.Secondary}>
          Thank you for bidding and supporting this auction! You can claim this
          participation NFT by minting it now.
        </Body2>
      </div>
      <div className={styles.image}>
        <ListingCardForMetadata
          disableLink
          enableMaxWidth
          hideOtherInfo
          metadataAccount={pnftMetadataAccountData}
        />
      </div>
      <div className={styles.saveButton}>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={handleOnSubmit}
          type="submit"
        >
          Claim NFT
        </ButtonWithText>
      </div>
      {errorMessage != null && (
        <ErrorMessage fontClass={FontClass.Body1}>{errorMessage}</ErrorMessage>
      )}
    </>
  );

  const successModal = (
    <GenericSuccessModalContent
      onHide={onHide}
      type="standard"
      button={
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          href={getNftLinkRelative(
            user?.username,
            newMint?.toString() ?? "",
            auctionNftMetadataAccountData.assetWidth,
            auctionNftMetadataAccountData.assetHeight
          )}
          onClick={onHide}
          type="link_internal"
        >
          View your participation NFT
        </ButtonWithText>
      }
      message={`You successfully claimed a participation NFT of ${pnftMetadataAccountData.data.name}`}
    />
  );

  return (
    <>
      <WaitingForTransactionModal
        isShown={isShown && isLoading}
        message="To claim the participation NFT, you need to approve the claim transaction on your wallet."
      />
      <GenericModal
        isShown={isShown && !isLoading}
        onHide={onHide}
        title={
          showSuccessModal
            ? "Claimed participation NFT!"
            : "Claim participation NFT"
        }
      >
        {showSuccessModal ? successModal : body}
      </GenericModal>
    </>
  );
}
