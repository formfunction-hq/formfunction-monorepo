import graphql from "babel-plugin-relay/macro";
import GenerativeKindLabel from "components/pages/common/nft/kind-label/GenerativeKindLabel";
import MasterEditionWithNonzeroSupplyKindLabel from "components/pages/common/nft/kind-label/MasterEditionWithNonzeroSupplyKindLabel";
import MasterEditionWithUnlimitedSupplyKindLabel from "components/pages/common/nft/kind-label/MasterEditionWithUnlimitedSupplyKindLabel";
import OneOfOneKindLabel from "components/pages/common/nft/kind-label/OneOfOneKindLabel";
import PnftMasterEditionKindLabel from "components/pages/common/nft/kind-label/PnftMasterEditionKindLabel";
import PnftStandardEditionKindLabel from "components/pages/common/nft/kind-label/PnftStandardEditionKindLabel";
import StandardEditionPrintNonzeroSupplyKindLabel from "components/pages/common/nft/kind-label/StandardEditionPrintNonzeroSupplyKindLabel";
import StandardEditionPrintUnlimitedSupplyKindLabel from "components/pages/common/nft/kind-label/StandardEditionPrintUnlimitedSupplyKindLabel";
import { NftKindLabel_MetadataAccount$key } from "components/pages/common/nft/kind-label/__generated__/NftKindLabel_MetadataAccount.graphql";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { useNftPagePnftAuctionNftsQuery } from "hooks/nft-page/__generated__/useNftPagePnftAuctionNftsQuery.graphql";
import useNftKind from "hooks/useNftKind";
import { PreloadedQuery, useFragment } from "react-relay";

const fragment = graphql`
  fragment NftKindLabel_MetadataAccount on MetadataAccount {
    ...useNftKind_MetadataAccount

    ...GenerativeKindLabel_MetadataAccount
    ...MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount
    ...MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount
    ...PnftStandardEditionKindLabel_MetadataAccount
    ...StandardEditionPrintNonzeroSupplyKindLabel_MetadataAccount
    ...StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount
  }
`;

type Props = {
  metadataAccount: NftKindLabel_MetadataAccount$key;
  pnftAuctionNftsQueryRef: PreloadedQuery<useNftPagePnftAuctionNftsQuery>;
};

export default function NftKindLabel({
  metadataAccount,
  pnftAuctionNftsQueryRef,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);

  switch (nftKind) {
    case NftKind.MasterEditionWithNonzeroSupply:
      return (
        <MasterEditionWithNonzeroSupplyKindLabel
          metadataAccount={metadataAccountData}
        />
      );
    case NftKind.MasterEditionWithUnlimitedSupply:
      return (
        <MasterEditionWithUnlimitedSupplyKindLabel
          metadataAccount={metadataAccountData}
        />
      );
    case NftKind.Generative:
      return <GenerativeKindLabel metadataAccount={metadataAccountData} />;
    case NftKind.OneOfOne:
      return <OneOfOneKindLabel />;
    case NftKind.StandardEditionPrintNonzeroSupply:
      return (
        <StandardEditionPrintNonzeroSupplyKindLabel
          metadataAccount={metadataAccountData}
        />
      );
    case NftKind.StandardEditionPrintUnlimitedSupply:
      return (
        <StandardEditionPrintUnlimitedSupplyKindLabel
          metadataAccount={metadataAccountData}
        />
      );
    case NftKind.PnftMasterEdition:
      return (
        <PnftMasterEditionKindLabel
          pnftAuctionNftsQueryRef={pnftAuctionNftsQueryRef}
        />
      );
    case NftKind.PnftStandardEdition:
      return (
        <PnftStandardEditionKindLabel metadataAccount={metadataAccountData} />
      );
    default:
      assertUnreachable(nftKind);
  }
}
