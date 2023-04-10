import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import TextArea from "components/input/TextArea";
import ExchangeArtInfoModal from "components/modal/ExchangeArtInfoModal";
import HolaplexInfoModal from "components/modal/HolaplexInfoModal";
import ImportPageGeneric from "components/pages/import/ImportPageGeneric";
import Body1 from "components/text/Body1";
import Body1Medium from "components/text/Body1Medium";
import styles from "css/pages/import/ImportTokenAddresses.module.css";
import useImportContext from "hooks/useImportContext";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import { useState } from "react";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import ImportStep from "types/enums/ImportStep";
import TextButtonTheme from "types/enums/TextButtonTheme";

export default function ImportTokenAddresses() {
  const { mintAddresses, step, setMintAddresses, setStep } = useImportContext();
  const [isExchangeArtModalShown, setIsExchangeArtModalShown] = useState(false);
  const [isHolaplexModalShown, setIsHolaplexModalShown] = useState(false);
  const isBottomTabsWidth = useIsBottomTabsWidth();

  if (step !== ImportStep.TokenAddresses) {
    return null;
  }

  const exchangeArtButton = (
    <TextButton
      buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
      display="inline"
      onClick={() => setIsExchangeArtModalShown(true)}
    >
      Exchange Art
    </TextButton>
  );

  const holaplexButton = (
    <TextButton
      buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
      display="inline"
      onClick={() => setIsHolaplexModalShown(true)}
    >
      Holaplex
    </TextButton>
  );

  const onNext = () => setStep(ImportStep.Preview);

  return (
    <>
      <ExchangeArtInfoModal
        isShown={isExchangeArtModalShown}
        onHide={() => setIsExchangeArtModalShown(false)}
      />
      <HolaplexInfoModal
        isShown={isHolaplexModalShown}
        onHide={() => setIsHolaplexModalShown(false)}
      />
      <ImportPageGeneric onNext={onNext}>
        <div className={styles.container}>
          <Body1 colorClass={ColorClass.Secondary} textAlign="center">
            How to find the token address of an NFT you minted on different
            sites: {holaplexButton}, {exchangeArtButton}
          </Body1>
          <Body1Medium
            className={styles.inputLabel}
            colorClass={ColorClass.Primary}
            textAlign="center"
          >
            Enter the token addresses of each NFT you want to import to
            Formfunction, separated with commas:
          </Body1Medium>
          <div className={styles.input}>
            <TextArea
              placeholder="Token addresses, separated by commas"
              value={mintAddresses}
              onChange={setMintAddresses}
              rows={4}
            />
          </div>
          {!isBottomTabsWidth && (
            <ButtonWithText
              buttonTheme={ButtonTheme.PurpleGradient}
              className={styles.nextButton}
              fontClass={FontClass.NavLink}
              onClick={onNext}
            >
              Next
            </ButtonWithText>
          )}
        </div>
      </ImportPageGeneric>
    </>
  );
}
