/* eslint-disable react/no-unescaped-entities */
import graphql from "babel-plugin-relay/macro";
import ListingCardForImport from "components/auction/ListingCardForImport";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import ButtonWithText from "components/buttons/ButtonWithText";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ImportPageGeneric from "components/pages/import/ImportPageGeneric";
import { ImportPreviewImportNftsMutation } from "components/pages/import/__generated__/ImportPreviewImportNftsMutation.graphql";
import { ImportPreviewMetadataAccountsQuery } from "components/pages/import/__generated__/ImportPreviewMetadataAccountsQuery.graphql";
import Body1 from "components/text/Body1";
import styles from "css/pages/import/ImportPreview.module.css";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import useImportContext from "hooks/useImportContext";
import useUserContext from "hooks/useUserContext";
import { Suspense } from "react";
import { useLazyLoadQuery, useMutation } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import ImportStep from "types/enums/ImportStep";
import logIfNotProd from "utils/logIfNotProd";
import shortenAddress from "utils/shortenAddress";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const mutation = graphql`
  mutation ImportPreviewImportNftsMutation($input: ImportNftsInput!) {
    importNfts(input: $input) {
      metadataAccountsImported {
        id
        ...ListingCardForMetadata_MetadataAccount
      }

      mintAddressesFailedToImport
    }
  }
`;

const query = graphql`
  query ImportPreviewMetadataAccountsQuery(
    $input: MetadataAccountsForImportInput!
  ) {
    metadataAccountsForImport(input: $input) {
      metadataAccounts {
        id
        mint
        updateAuthority

        nft {
          isOffPlatform
        }

        ...ListingCardForImport_MetadataAccount
      }
    }
  }
`;

function ImportPreviewNfts() {
  const { user } = useUserContext();
  const [commit, inFlight] =
    useMutation<ImportPreviewImportNftsMutation>(mutation);
  const {
    mintAddressesArray,
    mintAddressesArrayUnfiltered,
    removedMintAddresses,
    setImportResponse,
    setStep,
  } = useImportContext();
  const data = useLazyLoadQuery<ImportPreviewMetadataAccountsQuery>(query, {
    input: {
      mintAddresses: removeDuplicatesWithSet(mintAddressesArray),
    },
  });
  const metadataAccounts =
    data.metadataAccountsForImport?.metadataAccounts ?? [];

  const notPublicKeys = mintAddressesArrayUnfiltered.filter(
    (val) => !isPublicKey(val)
  );
  const onPlatformMints = filterNulls(
    metadataAccounts.map((metadataAccount) =>
      !metadataAccount.nft.isOffPlatform ? metadataAccount.mint : null
    )
  );
  const failedToLoad = mintAddressesArray.filter(
    (mint) =>
      metadataAccounts.find(
        (metadataAccount) => metadataAccount.mint === mint
      ) == null
  );
  const notUpdateAuthority = metadataAccounts
    .filter((metadataAccount) => metadataAccount.updateAuthority !== user?.id)
    .map((metadataAccount) => metadataAccount.mint);
  const hasError =
    notPublicKeys.length > 0 ||
    onPlatformMints.length > 0 ||
    failedToLoad.length > 0 ||
    notUpdateAuthority.length > 0;

  const metadataAccountsToImport = metadataAccounts.filter(
    (metadataAccount) =>
      metadataAccount.nft.isOffPlatform &&
      !removedMintAddresses.has(metadataAccount.mint) &&
      metadataAccount.updateAuthority === user?.id
  );

  const onClick = () =>
    commit({
      onCompleted: (response) => {
        setImportResponse(response);
        setStep(ImportStep.Results);
      },
      onError: (e) => {
        // TODO: make this nicer
        logIfNotProd("error", e);
        notifyUnexpectedError();
      },
      variables: {
        input: {
          mintAddresses: metadataAccountsToImport.map((val) => val.mint),
        },
      },
    });

  return (
    <div className={styles.gridAndErrors}>
      {hasError && (
        <div className={styles.errors}>
          <Body1 colorClass={ColorClass.Error} textAlign="center">
            An error has been detected. Clicking "Import NFTs" will only import
            the NFTs shown below.
          </Body1>
          <ul>
            {notPublicKeys.length > 0 && (
              <li>
                <Body1 colorClass={ColorClass.Error}>
                  Found invalid public keys: {notPublicKeys.join(", ")}
                </Body1>
              </li>
            )}
            {onPlatformMints.length > 0 && (
              <li>
                <Body1 colorClass={ColorClass.Error}>
                  Found NFTs that are already on the platform:{" "}
                  {onPlatformMints
                    .map((mint) => shortenAddress(mint))
                    .join(", ")}
                </Body1>
              </li>
            )}
            {failedToLoad.length > 0 && (
              <li>
                <Body1 colorClass={ColorClass.Error}>
                  Some NFTs failed to load, please make sure these addresses are
                  valid:{" "}
                  {failedToLoad.map((mint) => shortenAddress(mint)).join(", ")}
                </Body1>
              </li>
            )}
            {notUpdateAuthority.length > 0 && (
              <li>
                <Body1 colorClass={ColorClass.Error}>
                  You are not the update authority of these NFTs:{" "}
                  {notUpdateAuthority
                    .map((mint) => shortenAddress(mint))
                    .join(", ")}
                </Body1>
              </li>
            )}
          </ul>
        </div>
      )}
      <NftGridFullWidth className={styles.grid}>
        {metadataAccountsToImport.map((metadataAccount) => (
          <ListingCardForImport
            key={metadataAccount.id}
            metadataAccount={metadataAccount}
          />
        ))}
      </NftGridFullWidth>
      {metadataAccountsToImport.length > 0 && (
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.importButton}
          fontClass={FontClass.NavLink}
          isLoading={inFlight}
          onClick={onClick}
        >
          Import NFTs
        </ButtonWithText>
      )}
    </div>
  );
}

export default function ImportPreview() {
  const { mintAddressesArray, step } = useImportContext();

  if (step !== ImportStep.Preview) {
    return null;
  }

  return (
    <ImportPageGeneric onNext={emptyFunction}>
      <div className={styles.container}>
        <Body1
          className={styles.description}
          colorClass={ColorClass.Secondary}
          textAlign="center"
        >
          Here is a preview of all the NFTs you are about to import. If you
          don&apos;t want to import an NFT, you can remove it by clicking the
          "X" button in the upper right corner of each preview.
        </Body1>
        {mintAddressesArray.length > 0 && (
          <Suspense
            fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
          >
            <ImportPreviewNfts />
          </Suspense>
        )}
      </div>
    </ImportPageGeneric>
  );
}
