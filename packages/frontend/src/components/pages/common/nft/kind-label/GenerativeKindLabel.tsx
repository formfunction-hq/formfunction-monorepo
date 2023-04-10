import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import styles from "css/pages/common/nft/kind-label/NftKindLabel.module.css";
import ColorValue from "types/enums/ColorValue";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import { GenerativeKindLabel_MetadataAccount$key } from "components/pages/common/nft/kind-label/__generated__/GenerativeKindLabel_MetadataAccount.graphql";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import { Link } from "react-router-dom";
import useSeriesLinkRelativeForSeriesExpress from "hooks/useSeriesLinkRelativeForSeriesExpress";
import formatIntegerWithCommas from "formfn-shared/dist/utils/numbers/formatIntegerWithCommas";
import LayersIcon from "components/icons/LayersIcon";

const fragment = graphql`
  fragment GenerativeKindLabel_MetadataAccount on MetadataAccount {
    nft {
      CandyMachine {
        maxSupply
      }

      Series {
        ...useSeriesLinkRelativeForSeriesExpress_SeriesExpress
      }
    }
  }
`;

type Props = {
  metadataAccount: GenerativeKindLabel_MetadataAccount$key;
};

export default function GenerativeKindLabel({ metadataAccount }: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const seriesLink = useSeriesLinkRelativeForSeriesExpress(
    metadataAccountData.nft.Series!
  );

  return (
    <Link className={styles.label} to={seriesLink}>
      <LayersIcon colorValue={ColorValue.Primary} size={24} />
      <Body1 colorClass={ColorClass.Primary}>
        {formatIntegerWithCommas(
          metadataAccountData.nft.CandyMachine!.maxSupply
        )}{" "}
        supply
      </Body1>
      <ArrowRightIcon colorValue={ColorValue.Secondary} size={24} />
    </Link>
  );
}
