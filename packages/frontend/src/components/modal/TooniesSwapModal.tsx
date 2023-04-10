import ListingCardImage from "components/auction/ListingCardImage";
import ArtistPillButton from "components/buttons/ArtistPillButton";
import InputWithLabel from "components/input/InputWithLabel";
import TextArea from "components/input/TextArea";
import TextInput from "components/input/TextInput";
import FlexBox from "components/layout/FlexBox";
import GenericModal from "components/modal/GenericModal";
import ArtName from "components/text/ArtName";
import Body2 from "components/text/Body2";
import { useState } from "react";
import ColorClass from "types/enums/ColorClass";
import MediaType from "types/enums/MediaType";
import styles from "css/modal/TooniesSwapModal.module.css";
import ButtonWithText from "components/buttons/ButtonWithText";
import FontClass from "types/enums/FontClass";
import ButtonTheme from "types/enums/ButtonTheme";
import useUserContext from "hooks/useUserContext";
import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import graphql from "babel-plugin-relay/macro";
import useSolanaContext from "hooks/useSolanaContext";
import invariant from "tiny-invariant";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import { useMutation } from "react-relay";
import { TooniesSwapModalMutation } from "components/modal/__generated__/TooniesSwapModalMutation.graphql";
import { notify } from "components/toast/notifications";
import notifyErrorMessageFromError from "components/toast/notifyErrorMessageFromError";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import getTooniesSwapTx from "utils/transactions/getTooniesSwapTx";

type Props = {
  isShown: boolean;
  nftToSwapMint: string;
  onHide: () => void;
};

const mutation = graphql`
  mutation TooniesSwapModalMutation($input: ShareInfoAndSwapForTooniesInput!) {
    shareInfoAndSwapForToonies(input: $input) {
      proofOfOwnershipTokenMetadataAccount {
        mint
        assetHeight
        assetWidth
      }
    }
  }
`;

const MODAL_DESCRIPTION =
  "The project creators have requested you share" +
  " some information with them so they can send you" +
  " a physical collectible. This information will be" +
  " directly shared with the project creators, and it " +
  "will not be shown anywhere on your profile. You will " +
  "also receive a proof of ownership token corresponding" +
  " to your Toonies.";

export default function TooniesSwapModal({
  isShown,
  nftToSwapMint,
  onHide,
}: Props): JSX.Element {
  const { user } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [commit] = useMutation<TooniesSwapModalMutation>(mutation);
  const { connection, anchorWallet } = useSolanaContext();

  const onClick = async () => {
    invariant(anchorWallet != null);
    setIsLoading(true);

    let tx;
    try {
      tx = await getTooniesSwapTx(nftToSwapMint);
    } catch (e: any) {
      notifyErrorMessageFromError(e);
      setIsLoading(false);
      return;
    }
    const txid = await sendTransactionWithWallet({
      afterSignCallback: () => {
        notify({ message: "Sending transaction..." });
      },
      commitment: "confirmed",
      connection,
      loggingData: {},
      shouldUseLegacyTransaction: true,
      txs: [tx],
      wallet: anchorWallet,
    });
    if (txid == null) {
      setIsLoading(false);
      return;
    }

    notify({ message: "Performing swap..." });
    commit({
      onCompleted: (data) => {
        const { mint, assetHeight, assetWidth } =
          data.shareInfoAndSwapForToonies.proofOfOwnershipTokenMetadataAccount;
        notify({
          message: `Success! Proof of ownership token minted with mint ${data.shareInfoAndSwapForToonies.proofOfOwnershipTokenMetadataAccount.mint}`,
        });
        // Refresh to get deleted NFT to be reflected
        window.location.href = getNftLinkRelative(
          user?.username,
          mint,
          assetWidth,
          assetHeight
        );
      },
      onError: notifyErrorMessageFromError,
      variables: {
        input: {
          email,
          name,
          shippingAddress,
          swapTxid: txid,
          swappedNftMint: nftToSwapMint,
        },
      },
    });
  };

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHide}
      description={MODAL_DESCRIPTION}
      title="Share info and swap"
      maxWidth={1000}
    >
      <FlexBox flexDirection="column" gap={48}>
        <InputWithLabel
          label={<ArtName colorClass={ColorClass.Primary}>Name</ArtName>}
          input={
            <TextInput
              value={name}
              onChange={setName}
              placeholder="Your name here"
            />
          }
        />
        <InputWithLabel
          label={<ArtName colorClass={ColorClass.Primary}>Email</ArtName>}
          input={
            <FlexBox flexDirection="column" gap={16}>
              <TextInput
                value={email}
                onChange={setEmail}
                placeholder="name@example.xyz"
              />
              {user != null && user.email != null && (
                <CheckboxButtonWithLabel
                  fontClass={FontClass.Body1}
                  noBorder
                  isActive={email === user.email}
                  label="Use the email on your account"
                  onClick={() => {
                    if (email === user.email) {
                      setEmail("");
                      return;
                    }

                    setEmail(user.email!);
                  }}
                />
              )}
            </FlexBox>
          }
        />
        <InputWithLabel
          label={
            <ArtName colorClass={ColorClass.Primary}>Shipping address</ArtName>
          }
          input={
            <TextArea
              value={shippingAddress}
              onChange={setShippingAddress}
              placeholder="Add your full shipping address here"
            />
          }
        />
        <InputWithLabel
          label={
            <ArtName colorClass={ColorClass.Primary}>
              Swap for proof of ownership token
            </ArtName>
          }
          input={
            <FlexBox flexDirection="column" gap={16}>
              <Body2 colorClass={ColorClass.Primary}>
                By continuing, you will swap your Toonies for a proof of
                ownership token.
              </Body2>
              <FlexBox flexDirection="row" gap={32} alignItems="center">
                <div className={styles.tokenPreviewImage}>
                  {/* TODO: replace with real values */}
                  <ListingCardImage
                    src="https://formfunction.imgix.net/adhoc/OG_Heart.png?q=auto&f=auto"
                    mediaType={MediaType.ImagePng}
                  />
                </div>
                <FlexBox
                  flexDirection="column"
                  gap={12}
                  alignItems="flex-start"
                >
                  <ArtName colorClass={ColorClass.Primary}>
                    Proof of Ownership • Heart
                  </ArtName>
                  {/* TODO: replace with real values */}
                  <ArtistPillButton
                    src="https://formfunction.imgix.net/adhoc/OG_Heart.png?q=auto&f=auto"
                    name="toonies"
                  />
                </FlexBox>
              </FlexBox>
            </FlexBox>
          }
        />
        <ButtonWithText
          className={styles.button}
          fontClass={FontClass.NavLink}
          buttonTheme={ButtonTheme.PurpleGradient}
          disabled={[name, email, shippingAddress].some((s) =>
            isEmptyString(s)
          )}
          isLoading={isLoading}
          onClick={onClick}
        >
          Share info and swap
        </ButtonWithText>
      </FlexBox>
    </GenericModal>
  );
}
