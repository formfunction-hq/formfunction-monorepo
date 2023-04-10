import graphql from "babel-plugin-relay/macro";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import { useFragment } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import styles from "css/pages/common/nft/NftAttributes.module.css";
import { NftAttributes_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftAttributes_MetadataAccount.graphql";
import Body1 from "components/text/Body1";
import Body1Medium from "components/text/Body1Medium";
import ColorClass from "types/enums/ColorClass";
import formatIntegerWithCommas from "formfn-shared/dist/utils/numbers/formatIntegerWithCommas";

const fragment = graphql`
  fragment NftAttributes_MetadataAccount on MetadataAccount {
    data {
      attributes {
        traitType
        value
      }
    }
    nft {
      seriesRarityRanking

      CandyMachine {
        maxSupply
      }
    }
  }
`;

function Attribute({ traitType, value }: { traitType: string; value: string }) {
  return (
    <div className={styles.attribute}>
      <Body1Medium colorClass={ColorClass.Primary}>{traitType}:</Body1Medium>
      <Body1 colorClass={ColorClass.Primary} className={styles.traitValue}>
        {value}
      </Body1>
    </div>
  );
}

type Props = {
  metadataAccount: NftAttributes_MetadataAccount$key;
};

export default function NftAttributes({
  metadataAccount,
}: Props): Maybe<JSX.Element> {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { attributes } = metadataAccountData.data;
  const { nft } = metadataAccountData;
  const { seriesRarityRanking } = nft;

  if (attributes == null || attributes.length === 0) {
    return null;
  }

  return (
    <NftLabelAndContent label="Attributes">
      <div>
        {seriesRarityRanking != null && nft.CandyMachine != null && (
          <Attribute
            traitType="Rarity"
            value={`${seriesRarityRanking + 1} of ${formatIntegerWithCommas(
              nft.CandyMachine.maxSupply
            )}`}
          />
        )}
        {attributes.map((attribute) => {
          const { traitType, value } = attribute;
          const key = `${traitType}-${value}`;
          return <Attribute key={key} traitType={traitType} value={value} />;
        })}
      </div>
    </NftLabelAndContent>
  );
}
