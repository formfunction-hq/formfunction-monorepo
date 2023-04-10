import styles from "css/pages/common/nft/kind-label/NftKindLabel.module.css";
import ColorValue from "types/enums/ColorValue";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import LayersIcon from "components/icons/LayersIcon";
import graphql from "babel-plugin-relay/macro";
import { MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount$key } from "components/pages/common/nft/kind-label/__generated__/MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import useEditionSupply from "hooks/useEditionSupply";
import shouldShowOpenEditionsCopy from "utils/nft/shouldShowOpenEditionsCopy";

const fragment = graphql`
  fragment MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount on MetadataAccount {
    nft {
      status
    }

    ...useEditionSupply_MetadataAccount
  }
`;

type Props = {
  metadataAccount: MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount$key;
};

export default function MasterEditionWithUnlimitedSupplyKindLabel({
  metadataAccount,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const supply = useEditionSupply(metadataAccountData);

  return (
    <div className={styles.label}>
      <LayersIcon colorValue={ColorValue.Primary} size={24} />
      <Body1 colorClass={ColorClass.Primary}>
        Master edition •{" "}
        {shouldShowOpenEditionsCopy(metadataAccountData.nft.status)
          ? "Open editions"
          : `Supply of ${supply}`}
      </Body1>
    </div>
  );
}
