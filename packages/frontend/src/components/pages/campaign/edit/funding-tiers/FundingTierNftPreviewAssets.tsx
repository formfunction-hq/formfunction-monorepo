import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import NftAssetSize from "types/enums/NftAssetSize";
import NftAssetForMetadataAccount from "components/images/NftAssetForMetadataAccount";
import styles from "css/pages/campaign/edit/funding-tiers/FundingTierNftPreviewAssets.module.css";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import { FundingTierNftPreviewAssets_MetadataAccount$key } from "components/pages/campaign/edit/funding-tiers/__generated__/FundingTierNftPreviewAssets_MetadataAccount.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { range } from "formfn-shared/dist/utils/range";
import SquareContainer from "components/containers/SquareContainer";

const fragment = graphql`
  fragment FundingTierNftPreviewAssets_MetadataAccount on MetadataAccount
  @relay(plural: true) {
    id

    ...NftAssetForMetadataAccount_MetadataAccount
  }
`;

type Props = {
  metadataAccounts: Maybe<FundingTierNftPreviewAssets_MetadataAccount$key>;
};

export default function FundingTierNftPreviewAssets({
  metadataAccounts,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccounts);
  const colorScheme = useCampaignColorScheme();
  const backgroundColorAttribute = {
    backgroundColor: colorScheme.background.colorValue,
  };

  const assets = (metadataAccountData ?? []).slice(0, 3).map((item) => (
    <SquareContainer key={item.id}>
      <NftAssetForMetadataAccount
        metadataAccount={item}
        size={NftAssetSize.Size100Percent}
      />
    </SquareContainer>
  ));
  const assetsWithPlaceholders = [
    ...assets,
    ...range(Math.max(3 - assets.length, 0)).map((i) => (
      <SquareContainer key={i}>
        <div
          className={styles.imagePlaceholder}
          style={backgroundColorAttribute}
        />
      </SquareContainer>
    )),
  ];

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{assetsWithPlaceholders}</>;
}
