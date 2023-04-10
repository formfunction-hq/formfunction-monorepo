import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import NftGridFullWidthLoading from "components/grids/nft/NftGridFullWidthLoading";
import isExperimental from "utils/urlparams/isExperimental";
import { LandingHiddenGemsQuery } from "components/pages/landing/__generated__/LandingHiddenGemsQuery.graphql";
import LandingSectionHeader from "components/pages/landing/LandingSectionHeader";
import useNftGridFullWidthColumnCount from "hooks/grids/useNftGridFullWidthColumnCount";

const query = graphql`
  query LandingHiddenGemsQuery {
    metadataAccountsHiddenGems {
      metadataAccounts {
        id

        ...ListingCardForMetadata_MetadataAccount
      }
    }
  }
`;

function Inner(): JSX.Element {
  const data = useLazyLoadQuery<LandingHiddenGemsQuery>(query, {
    input: {
      isExperimental: isExperimental(),
    },
  });
  const hiddenGemsCount = useNftGridFullWidthColumnCount(1);

  return (
    <NftGridFullWidth>
      {data.metadataAccountsHiddenGems?.metadataAccounts
        // We want to display at least 2 gems, even on mobile
        .slice(0, Math.max(hiddenGemsCount, 2))
        .map((metadataAccount) => (
          <ListingCardForMetadata
            key={metadataAccount.id}
            metadataAccount={metadataAccount}
          />
        ))}
    </NftGridFullWidth>
  );
}

export default function LandingHiddenGems(): JSX.Element {
  return (
    <ResponsiveContainer>
      <LandingSectionHeader description="These auctions are waiting for their first bids—make an artist's day by being the first bidder!">
        Hidden Gems
      </LandingSectionHeader>
      <Suspense fallback={<NftGridFullWidthLoading />}>
        <Inner />
      </Suspense>
    </ResponsiveContainer>
  );
}
