import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import GenericNftCreateModalContent from "components/nft/GenericNftCreateModalContent";
import { CreateNftDetailsContextProvider } from "context/CreateNftDetailsContext";
import CreateAirdropsSignTransactionStep from "types/enums/CreateAirdropsSignTransactionStep";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CreateEditionType from "types/enums/CreateEditionType";
import useMintNft from "hooks/useMintNft";
import MintType from "types/enums/MintType";
import { useEffect, useState } from "react";
import Header3 from "components/text/Header3";
import { LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import ColorClass from "types/enums/ColorClass";
import WaitingForTransactionModalContent from "components/modal/WaitingForTransactionModalContent";
import FlexBox from "components/layout/FlexBox";
import ArtName from "components/text/ArtName";
import Body2 from "components/text/Body2";
import BodyText from "components/text/BodyText";
import TextSymbol from "types/enums/TextSymbol";
import useSolanaContext from "hooks/useSolanaContext";
import Currency from "formfn-shared/dist/types/enums/Currency";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import SOLANA_CURRENCY_CONFIG from "constants/SolanaCurrencyConfig";
import invariant from "tiny-invariant";
import Body2Bold from "components/text/Body2Bold";
import WrapWithTooltip from "components/tooltips/WrapWithTooltip";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import { useNavigate } from "react-router-dom";
import useWalletBalance from "hooks/useWalletBalance";
import PlainExternalLink from "components/link/PlainExternalLink";
import InfoIcon from "components/icons/InfoIcon";
import ColorValue from "types/enums/ColorValue";

// Intended to cover rent + minting fees for each standard edition
// Example: https://explorer.solana.com/tx/4sVVQnD1uVQHcENgxb5purpUdCKCmhn2zrr9mDuorHv6YcHPojEAyq6AfAexnBWGRbPXsuyLcFo9KTDeSJ7heH5N?cluster=mainnet-beta
const NETWORK_FEE_PER_PRINT_IN_SOL = 0.01281;
// Intended to be a "service fee"
const PLATFORM_FEE_PER_PRINT_IN_SOL = 0.01;

// To make sure user also has enough SOL to cover minting the master edition
const BUFFER_FEE_IN_SOL = 0.02;

function getAirdropNetworkFeeInSol(numAirdrops: number) {
  return numAirdrops * NETWORK_FEE_PER_PRINT_IN_SOL;
}

function getAirdropPlatformFeeInSol(numAirdrops: number) {
  return numAirdrops * PLATFORM_FEE_PER_PRINT_IN_SOL;
}

function getTotalFeesInSol(numAirdrops: number) {
  return (
    getAirdropNetworkFeeInSol(numAirdrops) +
    getAirdropPlatformFeeInSol(numAirdrops)
  );
}

function AirdropFeeAmount({
  label,
  amount,
  fontClass,
  showInfoIcon = false,
  tooltipContent,
}: {
  amount: string;
  fontClass: FontClass;
  label: string;
  showInfoIcon?: boolean;
  tooltipContent?: JSX.Element;
}) {
  const labelElem = (
    <FlexBox alignItems="center" gap={8}>
      <BodyText fontClass={fontClass} colorClass={ColorClass.Primary}>
        {label}
      </BodyText>
      {showInfoIcon && <InfoIcon colorValue={ColorValue.Primary} size={24} />}
    </FlexBox>
  );

  return (
    <FlexBox flexDirection="row" justifyContent="space-between">
      {tooltipContent == null ? (
        labelElem
      ) : (
        <WrapWithTooltip tooltipContent={tooltipContent}>
          {labelElem}
        </WrapWithTooltip>
      )}
      <BodyText fontClass={fontClass} colorClass={ColorClass.Primary}>
        {amount}
      </BodyText>
    </FlexBox>
  );
}

function AirdropFeeInfo({ numAirdrops }: { numAirdrops: number }) {
  const networkFeeTooltip = (
    <Body2 colorClass={ColorClass.Primary}>
      This includes the{" "}
      <PlainExternalLink href="https://docs.solana.com/developing/intro/rent">
        rent cost
      </PlainExternalLink>{" "}
      for each standard edition NFT
    </Body2>
  );

  return (
    <FlexBox flexDirection="column">
      <FlexBox flexDirection="column" gap={8}>
        <ArtName colorClass={ColorClass.Primary}>Fees</ArtName>
        <FlexBox flexDirection="column" gap={16}>
          <FlexBox flexDirection="row" gap={4}>
            <Body2 colorClass={ColorClass.Primary}>
              These fees help us pay for the price of minting and sending this
              airdrop
            </Body2>
            <Body2Bold colorClass={ColorClass.Primary}>
              ({numAirdrops} editions).
            </Body2Bold>
          </FlexBox>
          <AirdropFeeAmount
            label="Solana network fee"
            amount={`${NETWORK_FEE_PER_PRINT_IN_SOL.toFixed(3)} ${
              TextSymbol.SolSymbol
            }/edition`}
            fontClass={FontClass.Body1}
            showInfoIcon
            tooltipContent={networkFeeTooltip}
          />
          <AirdropFeeAmount
            label="Platform fee"
            amount={`${PLATFORM_FEE_PER_PRINT_IN_SOL} ${TextSymbol.SolSymbol}/edition`}
            fontClass={FontClass.Body1}
          />
          <AirdropFeeAmount
            label="Total"
            amount={`~ ${getTotalFeesInSol(numAirdrops)
              .toFixed(2)
              .toString()} ${TextSymbol.SolSymbol}`}
            fontClass={FontClass.Body1}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

type Props = {
  audienceSelectSection?: JSX.Element;
  description: string;
  isLoading: boolean;
  numAirdrops: number;
  // Must return an actual Promise (rather than just an `async` function)
  // to make sure the async logic is fully executed prior to running the
  // clean-up code (e.g., onHide, setIsLoading(false), etc.)
  onCreateEditionDistributorCompleted: (mint: string) => Promise<void>;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
};

function CreateAirdropModalContent({
  audienceSelectSection,
  description,
  isLoading,
  numAirdrops,
  onCreateEditionDistributorCompleted,
  onHide,
  setIsLoading,
  setSignTransactionStep,
}: Props & {
  setSignTransactionStep: (
    signTransactionStep: Maybe<CreateAirdropsSignTransactionStep>
  ) => void;
}) {
  const walletBalance = useWalletBalance(SOLANA_CURRENCY_CONFIG);
  const { setEditionSupply } = useCreateNftDetailsContext();
  const { anchorWallet, getAuctionHouseSdk } = useSolanaContext();
  const auctionHouseSdk = getAuctionHouseSdk(Currency.Solana);
  const navigate = useNavigate();

  useEffect(() => {
    setEditionSupply(numAirdrops);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numAirdrops]);

  const mintType = MintType.Airdrop;
  const feeTransferIx = SystemProgram.transfer({
    fromPubkey: anchorWallet!.publicKey,
    lamports: convertToFullDecimals(
      getTotalFeesInSol(numAirdrops),
      SOLANA_CURRENCY_CONFIG.decimals
    ),
    toPubkey: auctionHouseSdk!.walletAuthority,
  });

  const { mintNft } = useMintNft({
    additionalIxs: [feeTransferIx],
    mintType,
    onComplete: async (mintAccountPubkey, nftLinkRelative) => {
      invariant(anchorWallet != null && auctionHouseSdk != null);
      const mint = mintAccountPubkey.toString();
      await onCreateEditionDistributorCompleted(mint);
      setSignTransactionStep(null);
      setIsLoading(false);
      onHide();

      navigate(nftLinkRelative);
    },
    onUploadComplete: () =>
      setSignTransactionStep(
        CreateAirdropsSignTransactionStep.MintNftAndCreateEditionDistributor
      ),
    setIsLoading,
  });

  const disabledButton = (
    <ButtonWithText
      buttonTheme={ButtonTheme.PurpleGradient}
      fontClass={FontClass.NavLink}
      disabled
      onClick={emptyFunction}
    >
      Airdrop
    </ButtonWithText>
  );

  return (
    <GenericNftCreateModalContent
      description={description}
      additionalInfoTopSection={audienceSelectSection}
      additionalInfoBottomSection={<AirdropFeeInfo numAirdrops={numAirdrops} />}
      primaryCta={
        numAirdrops === 0 ? (
          <WrapWithTooltip tooltipContent="Please select recipients before submitting your airdrop">
            {disabledButton}
          </WrapWithTooltip>
        ) : walletBalance == null ||
          walletBalance / LAMPORTS_PER_SOL <
            getTotalFeesInSol(numAirdrops) + BUFFER_FEE_IN_SOL ? (
          <WrapWithTooltip tooltipContent="Make sure you have enough SOL to complete the airdrop">
            {disabledButton}
          </WrapWithTooltip>
        ) : (
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            isLoading={isLoading}
            onClick={() => {
              mintNft({ statusOverride: "AirdropInProgress" });
            }}
          >
            Airdrop
          </ButtonWithText>
        )
      }
    />
  );
}

function ContentForSignTransactionStep({
  audienceSelectSection,
  description,
  isLoading,
  numAirdrops,
  onCreateEditionDistributorCompleted,
  onHide,
  setIsLoading,
}: Props) {
  const [signTransactionStep, setSignTransactionStep] =
    useState<Maybe<CreateAirdropsSignTransactionStep>>(null);

  switch (signTransactionStep) {
    case CreateAirdropsSignTransactionStep.MintNftAndCreateEditionDistributor:
      return <WaitingForTransactionModalContent />;
    case CreateAirdropsSignTransactionStep.MintNft:
      return (
        <WaitingForTransactionModalContent
          tinyLabel="Step 1/2"
          title={
            <Header3 colorClass={ColorClass.Primary}>
              1. Approve the transaction to{" "}
              <span className={ColorClass.BrightPurple}>mint the NFT</span>{" "}
            </Header3>
          }
        />
      );
    case CreateAirdropsSignTransactionStep.CreateEditionDistributor:
      return (
        <WaitingForTransactionModalContent
          tinyLabel="Step 2/2"
          title={
            <Header3 colorClass={ColorClass.Primary}>
              2. Approve the transaction to{" "}
              <span className={ColorClass.BrightPurple}>
                set up the airdrop
              </span>{" "}
            </Header3>
          }
        />
      );
    case null:
      return (
        <CreateAirdropModalContent
          audienceSelectSection={audienceSelectSection}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          numAirdrops={numAirdrops}
          description={description}
          setSignTransactionStep={setSignTransactionStep}
          onHide={onHide}
          onCreateEditionDistributorCompleted={
            onCreateEditionDistributorCompleted
          }
        />
      );
    default:
      return assertUnreachable(signTransactionStep);
  }
}

export default function CreateAirdropsModalContent({
  audienceSelectSection,
  description,
  isLoading,
  numAirdrops,
  onCreateEditionDistributorCompleted,
  onHide,
  setIsLoading,
}: Props): JSX.Element {
  return (
    <CreateNftDetailsContextProvider
      defaultValueOverrides={{
        editionType: CreateEditionType.LimitedEditions,
      }}
    >
      <ContentForSignTransactionStep
        audienceSelectSection={audienceSelectSection}
        numAirdrops={numAirdrops}
        isLoading={isLoading}
        description={description}
        onHide={onHide}
        onCreateEditionDistributorCompleted={
          onCreateEditionDistributorCompleted
        }
        setIsLoading={setIsLoading}
      />
    </CreateNftDetailsContextProvider>
  );
}
