import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { Link } from "react-router-dom";
import styles from "css/pages/common/nft/kind-label/NftKindLabel.module.css";
import joinClasses from "utils/joinClasses";
import ColorClass from "types/enums/ColorClass";
import GiftIcon from "components/icons/GiftIcon";
import ColorValue from "types/enums/ColorValue";
import Body1 from "components/text/Body1";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import { PnftStandardEditionKindLabel_MetadataAccount$key } from "components/pages/common/nft/kind-label/__generated__/PnftStandardEditionKindLabel_MetadataAccount.graphql";
import useNftLinkForMetadataAccount from "hooks/useNftLinkForMetadataAccount";

const fragment = graphql`
  fragment PnftStandardEditionKindLabel_MetadataAccount on MetadataAccount {
    nft {
      edition
    }

    ...useNftLinkForMetadataAccount_MetadataAccount
  }
`;

type Props = {
  metadataAccount: PnftStandardEditionKindLabel_MetadataAccount$key;
};

export default function PnftStandardEditionKindLabel({
  metadataAccount,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftLink = useNftLinkForMetadataAccount(metadataAccountData, true);
  const { nft } = metadataAccountData;
  const { edition } = nft;

  return (
    <Link
      to={nftLink}
      className={joinClasses(ColorClass.Primary, styles.pnftLabelRow)}
    >
      <GiftIcon size={24} colorValue={ColorValue.Primary} />
      <Body1 colorClass={ColorClass.Primary} className={styles.pnftLabel}>
        Edition #{edition!} of a participation NFT
      </Body1>
      <ArrowRightIcon colorValue={ColorValue.Secondary} size={24} />
    </Link>
  );
}
