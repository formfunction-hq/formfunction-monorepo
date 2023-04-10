import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import styles from "css/pages/common/nft/kind-label/NftKindLabel.module.css";
import ColorValue from "types/enums/ColorValue";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import { StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount$key } from "components/pages/common/nft/kind-label/__generated__/StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount.graphql";
import { Link } from "react-router-dom";
import useEditionSupply from "hooks/useEditionSupply";
import useNftLinkForMetadataAccount from "hooks/useNftLinkForMetadataAccount";
import LayersIcon from "components/icons/LayersIcon";

const fragment = graphql`
  fragment StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount on MetadataAccount {
    nft {
      edition
      isImported
    }

    ...useEditionSupply_MetadataAccount
    ...useNftLinkForMetadataAccount_MetadataAccount
  }
`;

type Props = {
  metadataAccount: StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount$key;
};

export default function StandardEditionPrintUnlimitedSupplyKindLabel({
  metadataAccount,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { nft } = metadataAccountData;
  const nftLink = useNftLinkForMetadataAccount(metadataAccountData, true);
  const supply = useEditionSupply(metadataAccountData);

  if (nft.isImported) {
    // To handle cases like https://formfunction.xyz/@EWtFrhK15VKxRD4i2Aafd7QWVh5JHpzvT1HSqVwv7VrH/3zBBvyjdjvv2zm6LzLAbFtvetufG8WeKtB6tt7KbUgSA,
    // i.e. an imported edition that is meant to be a 1/1
    return null;
  }

  return (
    <Link className={styles.label} to={nftLink}>
      <LayersIcon colorValue={ColorValue.Primary} size={24} />
      <Body1 colorClass={ColorClass.Primary}>
        Edition #{nft.edition} / {supply}
      </Body1>
      <ArrowRightIcon colorValue={ColorValue.Secondary} size={24} />
    </Link>
  );
}
