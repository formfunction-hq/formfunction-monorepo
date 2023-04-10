import ResponsivePageBody from "components/containers/ResponsivePageBody";
import Header2 from "components/text/Header2";
import useCreateContext from "hooks/useCreateContext";
import ColorClass from "types/enums/ColorClass";
import CreateStep from "types/enums/CreateStep";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import styles from "css/pages/create/CreateListed.module.css";
import CreateListingPreview from "components/pages/create/CreateListingPreview";
import Body1 from "components/text/Body1";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import MobileTitleAndNav from "components/nav/MobileTitleAndNav";
import CloseButton from "components/buttons/CloseButton";
import ColorValue from "types/enums/ColorValue";
import useUserContext from "hooks/useUserContext";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";

export default function CreatedListed(): Maybe<JSX.Element> {
  const { step, setStep } = useCreateContext();
  const { mint } = useCreateNftDetailsContext();
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const { profileHref } = useUserContext();
  const { user } = useUserContext();

  if (step !== CreateStep.Listed) {
    return null;
  }

  return (
    <ResponsivePageBody>
      {isBottomTabsWidth && (
        <MobileTitleAndNav
          left={
            <CloseButton
              colorValue={ColorValue.Secondary}
              onClick={() => {
                setTimeout(() => setStep(CreateStep.Media), 1000);
                // TODO: find cleaner solution
                // After minting NFT, we don't update local state. So page needs to be refreshed
                window.location.href = profileHref;
              }}
            />
          }
          title="Mint Successful"
        />
      )}
      <div className={styles.container}>
        <Header2 colorClass={ColorClass.Primary} textAlign="center">
          Your NFT was minted successfully!
        </Header2>
        <div className={styles.preview}>
          <CreateListingPreview />
        </div>
        <Body1
          className={styles.description}
          colorClass={ColorClass.Secondary}
          textAlign="center"
        >
          Woohoo, your NFT now lives on the Solana blockchain! You can now list
          it for sale, or just keep it and admire it.
        </Body1>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.listButton}
          fontClass={FontClass.NavLink}
          // No need for asset dimensions because this is an external link
          href={getNftLinkRelative(user!.username, mint ?? "", null, null)}
          onClick={() => setTimeout(() => setStep(CreateStep.Media), 1000)}
          target="_self"
          type="link_external"
        >
          List this NFT
        </ButtonWithText>
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          className={styles.anotherTimeButton}
          fontClass={FontClass.Body1Medium}
          href={profileHref}
          onClick={() => setTimeout(() => setStep(CreateStep.Media), 1000)}
          target="_self"
          type="link_external"
        >
          Maybe another time
        </TextButton>
      </div>
    </ResponsivePageBody>
  );
}
