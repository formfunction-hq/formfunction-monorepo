import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import styles from "css/pages/common/nft/kind-label/NftKindLabel.module.css";
import ColorValue from "types/enums/ColorValue";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import { MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount$key } from "components/pages/common/nft/kind-label/__generated__/MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount.graphql";
import useEditionSupply from "hooks/useEditionSupply";
import LayersIcon from "components/icons/LayersIcon";

const fragment = graphql`
  fragment MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount on MetadataAccount {
    ...useEditionSupply_MetadataAccount
  }
`;

type Props = {
  metadataAccount: MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount$key;
};

export default function MasterEditionWithNonzeroSupplyKindLabel({
  metadataAccount,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const supply = useEditionSupply(metadataAccountData);

  return (
    <div className={styles.label}>
      <LayersIcon colorValue={ColorValue.Primary} size={24} />
      <Body1 colorClass={ColorClass.Primary}>
        Master edition • Supply of {supply}
      </Body1>
    </div>
  );
}
