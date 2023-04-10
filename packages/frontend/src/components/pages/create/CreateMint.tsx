import ButtonWithText from "components/buttons/ButtonWithText";
import CopyAddressButton from "components/buttons/CopyAddressButton";
import CreateBodyContainer from "components/pages/create/CreateBodyContainer";
import CreateListingPreview from "components/pages/create/CreateListingPreview";
import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/pages/create/CreateMint.module.css";
import useCreateContext from "hooks/useCreateContext";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import useSolanaContext from "hooks/useSolanaContext";
import { useState } from "react";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import CreateStep from "types/enums/CreateStep";
import FontClass from "types/enums/FontClass";
import GlobalClass from "types/enums/GlobalClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useMintNft from "hooks/useMintNft";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import MintType from "types/enums/MintType";
import CreateMintType from "types/enums/CreateMintType";

export default function CreateMint(): Maybe<JSX.Element> {
  const [isLoading, setIsLoading] = useState(false);
  const isBottomTabsWidth = useIsBottomTabsWidth();

  const { anchorWallet } = useSolanaContext();
  const { createMintType, step, setStep } = useCreateContext();
  const { title } = useCreateNftDetailsContext();

  const { mintNft } = useMintNft({
    includeCreateLastBidPriceIx: createMintType === CreateMintType.OneOfOne,
    mintType: MintType.Regular,
    onComplete: () => {
      setIsLoading(false);
      setStep(CreateStep.Listed);
    },
    setIsLoading,
  });

  if (step !== CreateStep.Mint) {
    return null;
  }

  return (
    <CreateBodyContainer>
      <div className={styles.container}>
        <div className={styles.preview}>
          <CreateListingPreview />
        </div>
        <div className={styles.right}>
          {!isBottomTabsWidth && (
            <Header2 colorClass={ColorClass.Primary}>
              Ready to <span className={GlobalClass.GradientText}>mint</span>?
            </Header2>
          )}
          <Body1
            className={styles.description}
            colorClass={ColorClass.Secondary}
          >
            After you approve the transaction with your wallet, your NFT will be
            minted and your wallet will be recorded as the creator of this NFT.
          </Body1>
          <Body1
            className={styles.description}
            colorClass={ColorClass.Secondary}
          >
            Note: it may take a while to upload large assets.
          </Body1>
          <div className={styles.mintingWith}>
            <TinyLabel
              colorClass={ColorClass.Secondary}
              textTransform="uppercase"
            >
              Minting with wallet
            </TinyLabel>
            <CopyAddressButton address={anchorWallet!.publicKey.toString()} />
          </div>
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            className={styles.mintButton}
            disabled={title.length === 0 || isLoading}
            fontClass={FontClass.NavLink}
            isLoading={isLoading}
            onClick={() => mintNft({})}
          >
            Mint NFT 😍
          </ButtonWithText>
        </div>
      </div>
    </CreateBodyContainer>
  );
}
