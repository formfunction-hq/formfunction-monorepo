import styles from "css/pages/common/nft/NftPageUnlockableSection.module.css";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import NftAssetSize from "types/enums/NftAssetSize";
import Header3 from "components/text/Header3";
import NftAsset from "components/images/NftAsset";
import getImgixUrl from "utils/getImgixUrl";
import {
  NftStatusExpress_enum,
  NftPageUnlockableSection_MetadataAccount$key,
  NftPageUnlockableSection_MetadataAccount$data,
} from "components/pages/common/nft/__generated__/NftPageUnlockableSection_MetadataAccount.graphql";
import UnlockableTinyLabel from "components/unlockables/UnlockableTinyLabel";
import useFormattedNftPrice from "hooks/useFormattedNftPrice";
import useNftPriceSymbol from "hooks/useNftPriceSymbol";

const fragment = graphql`
  fragment NftPageUnlockableSection_MetadataAccount on MetadataAccount {
    # eslint-disable-next-line relay/unused-fields
    id
    primarySaleHappened

    nft {
      status
    }

    unlockable {
      activationPrice {
        ...useFormattedNftPrice_Price
        ...useNftPriceSymbol_Price
      }
      category
      description
      name

      asset {
        contentType
        path
      }

      ...UnlockableTinyLabel_UnlockableExpress
    }
  }
`;

function UnlockableDescription({
  status,
  unlockable,
}: {
  status: NftStatusExpress_enum;
  unlockable: NftPageUnlockableSection_MetadataAccount$data["unlockable"];
}): JSX.Element {
  const formattedPrice = useFormattedNftPrice(unlockable?.activationPrice);
  const { shortSymbol, symbol } = useNftPriceSymbol(
    unlockable?.activationPrice
  );
  if (status === "ListedInstantSale") {
    return (
      <Body1 colorClass={ColorClass.Secondary}>
        The buyer of this NFT will receive this unlockable.
      </Body1>
    );
  }

  return unlockable?.activationPrice != null ? (
    <Body1 colorClass={ColorClass.Secondary}>
      The winner of the auction will receive this unlockable if the winning bid
      is at least {formattedPrice} {shortSymbol ?? symbol}.
    </Body1>
  ) : (
    <Body1 colorClass={ColorClass.Secondary}>
      The winner of the auction will receive this unlockable.
    </Body1>
  );
}

type Props = {
  metadataAccount: NftPageUnlockableSection_MetadataAccount$key;
};

export default function NftPageUnlockableSection({ metadataAccount }: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);

  const { nft, unlockable, primarySaleHappened } = metadataAccountData;
  if (unlockable == null || primarySaleHappened) {
    return null;
  }

  const { contentType, path } = unlockable.asset;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.imageContainer}>
          <NftAsset
            assetSrc={getImgixUrl(path)}
            contentType={contentType}
            noBorderRadius
            playbackId={undefined}
            showShimmer={false}
            size={NftAssetSize.Size234}
          />
        </div>
        <div className={styles.content}>
          <UnlockableTinyLabel
            unlockable={unlockable}
            category={unlockable.category}
          />
          <Header3 colorClass={ColorClass.Primary}>{unlockable.name}</Header3>
          <UnlockableDescription unlockable={unlockable} status={nft.status} />
          <Body1 colorClass={ColorClass.Primary}>
            {unlockable.description}
          </Body1>
        </div>
      </div>
    </div>
  );
}
