/* eslint-disable react/no-unescaped-entities */
import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import ImportPageGeneric from "components/pages/import/ImportPageGeneric";
import ArtName from "components/text/ArtName";
import Body1 from "components/text/Body1";
import Body2 from "components/text/Body2";
import styles from "css/pages/import/ImportInfo.module.css";
import useImportContext from "hooks/useImportContext";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import ImportStep from "types/enums/ImportStep";
import TextButtonTheme from "types/enums/TextButtonTheme";

function InfoSection({ children, title }: { children: any; title: string }) {
  return (
    <div className={styles.infoSection}>
      <ArtName colorClass={ColorClass.Primary} textAlign="center">
        {title}
      </ArtName>
      <Body1 colorClass={ColorClass.Secondary} textAlign="center">
        {children}
      </Body1>
    </div>
  );
}

export default function ImportInfo() {
  const { step, setStep } = useImportContext();
  const isBottomTabsWidth = useIsBottomTabsWidth();

  if (step !== ImportStep.Info) {
    return null;
  }

  const onNext = () => setStep(ImportStep.TokenAddresses);

  return (
    <ImportPageGeneric onNext={onNext}>
      <div className={styles.container}>
        <InfoSection title="How to import">
          To import an NFT to Formfunction, you&apos;ll need to find the token
          address of the NFT (more details in the next step).
          <br />
          <br />
          For security reasons,{" "}
          <b>
            you will only be able to import NFTs for which the update authority
            is the wallet address you use on Formfunction
          </b>
          .
          <br />
          <br />
          <Body2 colorClass={ColorClass.Secondary}>
            Note: If you want to import NFTs with a different update authority,
            please{" "}
            <TextButton
              buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
              display="inline"
              href="https://help.formfunction.xyz/en/articles/5885077-importing-nfts-from-other-platforms-to-formfunction"
              type="link_external"
            >
              follow the steps in this article
            </TextButton>{" "}
            under "How to prepare NFTs that have a different update authority".
          </Body2>
        </InfoSection>
        <InfoSection title="What can you do with imported NFTs?">
          The NFTs you import will be visible on your Formfunction profile. The
          owners will be able to list them for sale on Formfunction. The current
          state of each imported NFT will be reflected on Formfunction, although
          not all the previous bid history may be shown.
        </InfoSection>
        {!isBottomTabsWidth && (
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            onClick={onNext}
          >
            Next
          </ButtonWithText>
        )}
      </div>
    </ImportPageGeneric>
  );
}
