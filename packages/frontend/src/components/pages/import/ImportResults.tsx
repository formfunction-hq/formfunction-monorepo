import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import ButtonWithText from "components/buttons/ButtonWithText";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import styles from "css/pages/import/ImportResults.module.css";
import useImportContext from "hooks/useImportContext";
import useUserContext from "hooks/useUserContext";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import ImportStep from "types/enums/ImportStep";

function ResponseGrid() {
  const { importResponse } = useImportContext();
  const importedNfts =
    importResponse?.importNfts.metadataAccountsImported ?? [];

  if (importedNfts.length === 0) {
    return null;
  }

  return (
    <NftGridFullWidth className={styles.grid}>
      {importedNfts.map((metadataAccount) => (
        <ListingCardForMetadata
          key={metadataAccount.id}
          metadataAccount={metadataAccount}
        />
      ))}
    </NftGridFullWidth>
  );
}

export default function ImportResults() {
  const { step } = useImportContext();
  const { profileHref } = useUserContext();

  if (step !== ImportStep.Results) {
    return null;
  }

  return (
    <PageWithHeaderAndFooter hideBottomTabs>
      <ResponsivePageBody className={styles.container}>
        <Header2 colorClass={ColorClass.Primary} textAlign="center">
          Results
        </Header2>
        <Body1
          className={styles.description}
          colorClass={ColorClass.Secondary}
          textAlign="center"
        >
          Here are the NFTs that were imported! Sometimes there are unexpected
          errors which prevent some NFTs from being imported. If any of your
          NFTs failed to import, please try again.
        </Body1>
        <ResponseGrid />
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.button}
          fontClass={FontClass.NavLink}
          href={profileHref}
          type="link_internal"
        >
          Go to Profile
        </ButtonWithText>
      </ResponsivePageBody>
    </PageWithHeaderAndFooter>
  );
}
