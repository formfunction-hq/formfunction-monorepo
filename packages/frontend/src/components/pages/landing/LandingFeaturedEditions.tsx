import graphql from "babel-plugin-relay/macro";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import Header2 from "components/text/Header2";
import styles from "css/pages/landing/LandingFeaturedEditions.module.css";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import { LandingFeaturedEditionsQuery } from "components/pages/landing/__generated__/LandingFeaturedEditionsQuery.graphql";
import NftAssetForMetadataAccount from "components/images/NftAssetForMetadataAccount";
import NftAssetSize from "types/enums/NftAssetSize";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ArtistPillButton from "components/buttons/ArtistPillButton";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import Body1 from "components/text/Body1";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import Price from "components/text/Price";
import useBreakpoint from "hooks/useBreakpoint";
import LandingFeaturedEditionsSkeleton from "components/pages/landing/loading/LandingFeaturedEditionsSkeleton";
import LandingSectionHeader from "components/pages/landing/LandingSectionHeader";
import PriceWithSymbol from "components/price/PriceWithSymbol";

const query = graphql`
  query LandingFeaturedEditionsQuery {
    metadataAccountsFeaturedEditions {
      metadataAccounts {
        assetHeight
        assetWidth
        mint

        nft {
          creatorId
          maxSupply
          numberOfStandardEditionsMinted
          priceV2 {
            ...PriceWithSymbol_Price
          }
          priceLastSoldV2 {
            ...PriceWithSymbol_Price
          }
          status

          Creator {
            username

            ProfilePhoto {
              photoUrl
            }
          }
        }

        data {
          name
        }

        offchainData {
          description
        }

        ...NftAssetForMetadataAccount_MetadataAccount
      }
    }
  }
`;

/**
 * Keep in sync with LandingFeaturedEditionsSkeleton.
 */
function Inner(): Maybe<JSX.Element> {
  const { isMobileBreakpoint } = useBreakpoint();
  const data = useLazyLoadQuery<LandingFeaturedEditionsQuery>(query, {});
  const edition = data.metadataAccountsFeaturedEditions?.metadataAccounts[0];
  const { priceV2, priceLastSoldV2 } = edition?.nft || {
    priceLastSoldV2: null,
    priceV2: null,
  };

  if (edition == null) {
    return null;
  }

  const { description } = edition.offchainData;
  const { Creator, creatorId, maxSupply, numberOfStandardEditionsMinted } =
    edition.nft;

  const soldOut =
    edition.nft.status === "SoldOutEditions" ||
    edition.nft.status === "OwnedStoppedMintingForEditions";
  const shouldShowPrice = !soldOut && edition.nft.status !== "Owned";

  return (
    <div className={styles.featuredEditionsCard}>
      <div className={styles.imageContainer}>
        <NftAssetForMetadataAccount
          metadataAccount={edition}
          size={
            isMobileBreakpoint ? NftAssetSize.Size320 : NftAssetSize.Size480
          }
        />
      </div>
      <div className={styles.content}>
        <Header2 colorClass={ColorClass.Primary}>{edition.data.name}</Header2>
        <div>
          <ArtistPillButton
            name={Creator?.username ?? creatorId}
            src={Creator?.ProfilePhoto?.photoUrl ?? null}
          />
        </div>
        <div className={styles.flexContainer}>
          {shouldShowPrice && (
            <NftLabelAndContent label="Buy Now">
              <PriceWithSymbol price={priceV2 ?? priceLastSoldV2} />
            </NftLabelAndContent>
          )}
          <NftLabelAndContent label="Editions Sold">
            <Price colorClass={ColorClass.Primary}>
              {maxSupply == null
                ? numberOfStandardEditionsMinted
                : `${numberOfStandardEditionsMinted}/${maxSupply}`}
            </Price>
          </NftLabelAndContent>
        </div>
        {description != null && description.length > 0 && (
          <NftLabelAndContent label="Description">
            <Body1
              className={styles.description}
              colorClass={ColorClass.Primary}
              truncateLines={2}
            >
              {description}
            </Body1>
          </NftLabelAndContent>
        )}
        <div className={styles.button}>
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            href={getNftLinkRelative(
              Creator?.username,
              edition.mint,
              edition.assetWidth,
              edition.assetHeight
            )}
            type="link_internal"
          >
            See the editions
          </ButtonWithText>
        </div>
      </div>
    </div>
  );
}

export default function LandingFeaturedEditions(): JSX.Element {
  return (
    <ResponsiveContainer className={styles.container}>
      <LandingSectionHeader>Featured Editions</LandingSectionHeader>
      <Suspense fallback={<LandingFeaturedEditionsSkeleton />}>
        <Inner />
      </Suspense>
    </ResponsiveContainer>
  );
}
