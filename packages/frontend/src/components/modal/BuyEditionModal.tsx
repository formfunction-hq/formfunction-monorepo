import graphql from "babel-plugin-relay/macro";
import { useState } from "react";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import useBuyEdition from "hooks/useBuyEdition";
import { notify } from "components/toast/notifications";
import useConfetti from "hooks/useConfetti";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useUserContext from "hooks/useUserContext";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import { useNftPageEditionBuyerInfoQuery } from "hooks/nft-page/__generated__/useNftPageEditionBuyerInfoQuery.graphql";
import { editionBuyerInfoQuery } from "hooks/nft-page/useNftPageEditionBuyerInfo";
import { BuyEditionModal_MetadataAccount$key } from "components/modal/__generated__/BuyEditionModal_MetadataAccount.graphql";
import BuyNowGenericModalForMetadataAccount from "components/modal/BuyNowGenericModalForMetadataAccount";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import BuyEditionModalPriceInput from "components/modal/BuyEditionModalPriceInput";
import useFormattedNftPrice from "hooks/useFormattedNftPrice";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import { BuyEditionModal_EditionBuyerInfoResponse$key } from "components/modal/__generated__/BuyEditionModal_EditionBuyerInfoResponse.graphql";
import dayjs from "utils/dates/dayjsex";

const nftFragment = graphql`
  fragment BuyEditionModal_MetadataAccount on MetadataAccount {
    assetHeight
    assetWidth

    nft {
      editionPublicSaleStartTime
      editionBuyLimitPerAddress
      editionPriceInfo {
        allowlistPriceInFullDecimals
        priceFunctionType
      }
      priceV2 {
        amount
        currencyInfo {
          decimals
        }
        ...BuyEditionModalPriceInput_Price
        ...useFormattedNftPrice_Price
      }
    }

    ...useBuyEdition_MetadataAccount
    ...BuyNowGenericModalForMetadataAccount_MetadataAccount
  }
`;

const editionBuyerInfoFragment = graphql`
  fragment BuyEditionModal_EditionBuyerInfoResponse on EditionBuyerInfoResponse {
    merkleAllowlistInfo {
      amountMinted
      ...useBuyEdition_EditionsMerkleAllowlistInfoExpress
    }
    numberBought
  }
`;

type Props = {
  editionBuyerInfoQueryRef: PreloadedQuery<useNftPageEditionBuyerInfoQuery>;
  isShown: boolean;
  metadataAccount: BuyEditionModal_MetadataAccount$key;
  onHide: () => void;
};

// TODO[@arcticmatt] instead of using price?, should only access fragment data
// if isShown is true
export default function BuyEditionModal({
  editionBuyerInfoQueryRef,
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(nftFragment, metadataAccount);
  const { editionBuyerInfo } =
    usePreloadedQuery<useNftPageEditionBuyerInfoQuery>(
      editionBuyerInfoQuery,
      editionBuyerInfoQueryRef
    );
  const editionBuyerInfoData = useFragment(
    editionBuyerInfoFragment,
    editionBuyerInfo as BuyEditionModal_EditionBuyerInfoResponse$key
  );
  const { nft } = metadataAccountData;
  const { editionBuyLimitPerAddress, editionPriceInfo } = nft;
  const price = nft.priceV2;
  const showPriceInput =
    editionPriceInfo?.priceFunctionType === "Minimum" &&
    // If the allowlist price is in effect, we don't want to show the price input
    (editionPriceInfo?.allowlistPriceInFullDecimals == null ||
      nft.editionPublicSaleStartTime == null ||
      dayjs().isAfter(dayjs(nft.editionPublicSaleStartTime)));

  const showConfetti = useConfetti();
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newMint, setNewMint] = useState<Maybe<string>>(null);
  const { buyEdition } = useBuyEdition(
    metadataAccountData,
    editionBuyerInfoData.merkleAllowlistInfo
  );
  const formattedPrice = useFormattedNftPrice(price);
  const [chosenPrice, setChosenPrice] = useState(formattedPrice);
  const chosenPriceFullDecimals = convertToFullDecimals(
    chosenPrice,
    price?.currencyInfo.decimals ?? 0
  );

  const hasReachedBuyLimit =
    editionBuyLimitPerAddress != null &&
    editionBuyerInfoData.numberBought -
      (editionBuyerInfoData.merkleAllowlistInfo?.amountMinted ?? 0) >=
      editionBuyLimitPerAddress;

  const onBuyNowClick = async () => {
    buyEdition({
      onCompleted: (txid: string, newMintFromCb: string) => {
        setNewMint(newMintFromCb);
        notify({ message: "Bought successfully", txid });
        setIsLoading(false);
        setIsSuccess(true);
        showConfetti();
      },
      onError: () => {
        notifyUnexpectedError();
      },
      priceOverride: showPriceInput ? chosenPriceFullDecimals : undefined,
      setIsLoading,
    });
  };

  const onHideAndReset = () => {
    onHide();
    setIsSuccess(false);
  };

  const priceInput =
    showPriceInput && price != null ? (
      <BuyEditionModalPriceInput
        chosenPrice={chosenPrice}
        price={price}
        setChosenPrice={setChosenPrice}
      />
    ) : undefined;

  return (
    <BuyNowGenericModalForMetadataAccount
      buyDisabledDescription={
        hasReachedBuyLimit
          ? `The creator has set a limit of ${editionBuyLimitPerAddress} editions per wallet. You have reached the limit.`
          : showPriceInput && chosenPriceFullDecimals < (price?.amount ?? 0)
          ? "You must choose a price at or above the minimum."
          : undefined
      }
      buySuccessButton={
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          href={getNftLinkRelative(
            user!.username,
            newMint ?? "",
            metadataAccountData.assetWidth,
            metadataAccountData.assetHeight
          )}
          onClick={onHideAndReset}
          type="link_internal"
        >
          View your edition
        </ButtonWithText>
      }
      description="Once you buy an edition, the NFT will be minted and transferred to you immediately."
      isLoading={isLoading}
      isShown={isShown}
      isSuccess={isSuccess}
      metadataAccount={metadataAccountData}
      onBuyNowClick={onBuyNowClick}
      onHide={onHideAndReset}
      priceInput={priceInput}
    />
  );
}
