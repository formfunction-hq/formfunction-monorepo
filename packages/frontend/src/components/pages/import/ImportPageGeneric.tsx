import styles from "css/pages/import/ImportPageGeneric.module.css";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import Header2 from "components/text/Header2";
import ColorClass from "types/enums/ColorClass";
import ImportProgressBar from "components/pages/import/ImportProgressBar";
import useImportContext from "hooks/useImportContext";
import ImportStep from "types/enums/ImportStep";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import ColorValue from "types/enums/ColorValue";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import MobileTitleAndNav from "components/nav/MobileTitleAndNav";
import PlainButton from "components/buttons/PlainButton";
import ChevronLeftIcon from "components/icons/ChevronLeftIcon";
import CloseButton from "components/buttons/CloseButton";
import { useNavigate } from "react-router-dom";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";

type Props = {
  children: any;
  onNext: () => void;
};

export default function ImportPageGeneric({ children, onNext }: Props) {
  const { step, setStep } = useImportContext();
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const navigate = useNavigate();

  const onBack = () => {
    setStep(
      step === ImportStep.Preview ? ImportStep.TokenAddresses : ImportStep.Info
    );
  };

  const backButton =
    step === ImportStep.Info ? null : (
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
        fontClass={FontClass.Body2}
        icon={<ArrowLeftIcon colorValue={ColorValue.BrightPurple} size={20} />}
        iconPosition="left"
        onClick={onBack}
      >
        Back to {step === ImportStep.Preview ? "token addresses" : "info"}
      </TextButton>
    );

  const desktop = (
    <>
      <div className={styles.titleRow}>
        {backButton}
        <Header2
          className={styles.title}
          colorClass={ColorClass.Primary}
          textAlign="center"
        >
          Import NFTs
        </Header2>
        <div style={{ visibility: "hidden" }}>{backButton}</div>
      </div>
      <div className={styles.progressBar}>
        <ImportProgressBar />
      </div>
    </>
  );

  const backButtonChevronOrClose =
    step !== ImportStep.Info ? (
      <PlainButton onClick={onBack}>
        <ChevronLeftIcon colorValue={ColorValue.Secondary} />
      </PlainButton>
    ) : (
      <CloseButton
        colorValue={ColorValue.Secondary}
        onClick={() => navigate("/create")}
      />
    );
  const nextButton =
    step === ImportStep.Preview ? null : (
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        fontClass={FontClass.NavLink}
        onClick={onNext}
      >
        Next
      </ButtonWithText>
    );

  return (
    <PageWithHeaderAndFooter hideBottomTabs>
      <ResponsivePageBody className={styles.container}>
        {!isBottomTabsWidth && desktop}
        {isBottomTabsWidth && (
          <MobileTitleAndNav
            className={styles.mobileTitleAndNav}
            left={backButtonChevronOrClose}
            right={nextButton}
            title={step}
          />
        )}
        <div className={styles.children}>{children}</div>
      </ResponsivePageBody>
    </PageWithHeaderAndFooter>
  );
}
