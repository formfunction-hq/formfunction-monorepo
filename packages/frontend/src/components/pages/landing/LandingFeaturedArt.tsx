import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import { LandingFeaturedArtQuery } from "components/pages/landing/__generated__/LandingFeaturedArtQuery.graphql";
import styles from "css/pages/landing/LandingFeaturedArt.module.css";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import NftGridFullWidthLoading from "components/grids/nft/NftGridFullWidthLoading";
import isExperimental from "utils/urlparams/isExperimental";
import ButtonWithText from "components/buttons/ButtonWithText";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import LandingSectionHeader from "components/pages/landing/LandingSectionHeader";
import useNftGridFullWidthColumnCount from "hooks/grids/useNftGridFullWidthColumnCount";

const NUM_ROWS = 2;

const query = graphql`
  query LandingFeaturedArtQuery($input: MetadataAccountsFeaturedInput) {
    metadataAccountsFeatured(input: $input) {
      id

      ...ListingCardForMetadata_MetadataAccount
    }
  }
`;

function Inner(): JSX.Element {
  const data = useLazyLoadQuery<LandingFeaturedArtQuery>(query, {
    input: {
      isExperimental: isExperimental(),
    },
  });
  const featuredArtCount = useNftGridFullWidthColumnCount(NUM_ROWS);

  return (
    <NftGridFullWidth>
      {data.metadataAccountsFeatured
        .slice(0, featuredArtCount)
        .map((metadataAccount) => (
          <ListingCardForMetadata
            key={metadataAccount.id}
            metadataAccount={metadataAccount}
          />
        ))}
    </NftGridFullWidth>
  );
}

export default function LandingFeaturedArt(): JSX.Element {
  return (
    <ResponsiveContainer>
      <LandingSectionHeader>Trending Art</LandingSectionHeader>
      <Suspense fallback={<NftGridFullWidthLoading multiple={NUM_ROWS} />}>
        <Inner />
      </Suspense>
      <div className={styles.buttonContainer}>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          href="/explore"
          icon={<ArrowRightIcon colorValue={ColorValue.White} size={24} />}
          type="link_internal"
        >
          See all ongoing auctions
        </ButtonWithText>
      </div>
    </ResponsiveContainer>
  );
}
