import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { Link } from "react-router-dom";
import styles from "css/pages/common/nft/kind-label/NftKindLabel.module.css";
import joinClasses from "utils/joinClasses";
import ColorClass from "types/enums/ColorClass";
import GiftIcon from "components/icons/GiftIcon";
import ColorValue from "types/enums/ColorValue";
import Body1 from "components/text/Body1";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import { useNftPagePnftAuctionNftsQuery } from "hooks/nft-page/__generated__/useNftPagePnftAuctionNftsQuery.graphql";
import { pnftAuctionNftsQuery } from "hooks/nft-page/useNftPagePnftAuctionNfts";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";

type Props = {
  pnftAuctionNftsQueryRef: PreloadedQuery<useNftPagePnftAuctionNftsQuery>;
};

export default function PnftMasterEditionKindLabel({
  pnftAuctionNftsQueryRef,
}: Props) {
  const queryData = usePreloadedQuery<useNftPagePnftAuctionNftsQuery>(
    pnftAuctionNftsQuery,
    pnftAuctionNftsQueryRef
  );

  return (
    <>
      {queryData.pnftAuctionNfts.metadataAccounts.map((auctionNft, index) => (
        <Link
          key={auctionNft.id}
          to={getNftLinkRelative(
            auctionNft.nft.Creator!.username,
            auctionNft.nft.mint,
            auctionNft.assetWidth,
            auctionNft.assetHeight
          )}
          className={joinClasses(ColorClass.Primary, styles.pnftLabelRow)}
        >
          {index === 0 && (
            <GiftIcon size={24} colorValue={ColorValue.Primary} />
          )}
          <Body1 colorClass={ColorClass.Primary} className={styles.pnftLabel}>
            Participation NFT for {auctionNft.data.name}
          </Body1>
          <ArrowRightIcon colorValue={ColorValue.Secondary} size={24} />
        </Link>
      ))}
    </>
  );
}
