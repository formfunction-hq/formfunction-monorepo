import graphql from "babel-plugin-relay/macro";
import styles from "css/pages/common/nft/NftLeftInfo.module.css";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import { NftLeftInfo_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftLeftInfo_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import stripTrailingDecimals from "formfn-shared/dist/utils/stripTrailingDecimals";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";
import SolanaExplorerIcon from "components/icons/SolanaExplorerIcon";
import ColorValue from "types/enums/ColorValue";
import SolscanIcon from "components/icons/SolscanIcon";
import NftTags from "components/pages/common/nft/NftTags";
import getSolanaNetwork from "utils/env/getSolanaNetwork";
import dayjs from "utils/dates/dayjsex";
import SeriesInfoCard from "components/pages/series/SeriesInfoCard";
import NftAttributes from "components/pages/common/nft/NftAttributes";
import NftLeftInfoEditionInfo from "components/pages/common/nft/NftLeftInfoEditionInfo";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";
import DEFAULT_PRICE_INCREMENT_PERCENTAGE from "constants/DefaultPriceIncrementPercentage";
import useNftPriceSymbol from "hooks/useNftPriceSymbol";
import getSolscanNftLink from "utils/solana/explorer/getSolscanNftLink";
import useNftPageContext from "hooks/useNftPageContext";
import CampaignInfoCard from "components/pages/common/nft/CampaignInfoCard";

const fragment = graphql`
  fragment NftLeftInfo_MetadataAccount on MetadataAccount {
    mint

    data {
      name
      sellerFeeBasisPoints
    }

    nft {
      auctionDurationInSeconds
      status
      timeExtensionDurationInSeconds

      priceV2 {
        ...useNftPriceSymbol_Price
        currencyInfo {
          decimals
        }
      }

      tickSizeInfo {
        tickSizeConstantInLamports
      }

      Series {
        name
        slug
        type

        AvatarPhoto {
          photoUrl
        }

        Creator {
          username
        }
      }
    }

    ...NftLeftInfoEditionInfo_MetadataAccount
    ...NftTags_MetadataAccount
    ...NftAttributes_MetadataAccount
  }
`;

type Props = {
  metadataAccount: NftLeftInfo_MetadataAccount$key;
};

export default function NftLeftInfo({ metadataAccount }: Props) {
  const { nftCampaignQueryRef } = useNftPageContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { mint, nft } = metadataAccountData;
  const { shortSymbol, symbol } = useNftPriceSymbol(nft.priceV2);
  const {
    status,
    tickSizeInfo: { tickSizeConstantInLamports },
  } = nft;
  const auctionTime = dayjs.duration(
    metadataAccountData.nft.auctionDurationInSeconds,
    "second"
  );
  const endTime = dayjs.duration(
    metadataAccountData.nft.timeExtensionDurationInSeconds,
    "second"
  );
  const formattedTickSize =
    nft.priceV2 != null
      ? formatDecimals(
          // TODO(@bryancho): use PriceGqlType for ticksize
          Number(tickSizeConstantInLamports),
          nft.priceV2?.currencyInfo.decimals
        )
      : null;

  const auctionInfo = (
    <NftLabelAndContent label="Auction Info">
      <Body1 colorClass={ColorClass.Primary}>
        {auctionTime.asHours()} hour auction • {endTime.asMinutes()} minute end
        time •
        {tickSizeConstantInLamports == null && nft.priceV2 != null
          ? ` ${DEFAULT_PRICE_INCREMENT_PERCENTAGE}% increment`
          : ` ${formattedTickSize} ${shortSymbol ?? symbol} increment`}
      </Body1>
    </NftLabelAndContent>
  );

  const creatorRoyalties = (
    <NftLabelAndContent label="Creator Royalties">
      <Body1 colorClass={ColorClass.Primary}>
        {stripTrailingDecimals(
          metadataAccountData.data.sellerFeeBasisPoints / 100
        )}
        %
      </Body1>
    </NftLabelAndContent>
  );

  const { Series } = metadataAccountData.nft;
  const seriesInfoCard =
    Series != null ? (
      <SeriesInfoCard
        username={Series.Creator.username}
        slug={Series.slug}
        previewPhotoUrl={Series.AvatarPhoto.photoUrl}
        name={Series.name}
        type={Series.type}
      />
    ) : null;
  const campaignInfoCard =
    nftCampaignQueryRef != null ? (
      <CampaignInfoCard nftCampaignQueryRef={nftCampaignQueryRef} />
    ) : null;

  const links = (
    <div className={styles.links}>
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Secondary}
        fontClass={FontClass.NavLink}
        href={`https://explorer.solana.com/address/${mint}?cluster=${getSolanaNetwork()}`}
        icon={<SolanaExplorerIcon colorValue={ColorValue.Secondary} />}
        type="link_external"
      >
        View on Solana Explorer
      </TextButton>
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Secondary}
        fontClass={FontClass.NavLink}
        href={getSolscanNftLink(mint)}
        icon={<SolscanIcon colorValue={ColorValue.Secondary} />}
        type="link_external"
      >
        View on Solscan
      </TextButton>
    </div>
  );

  return (
    <div className={styles.container}>
      {["Listed", "Auction"].includes(status) && auctionInfo}
      <NftLeftInfoEditionInfo metadataAccount={metadataAccountData} />
      <NftAttributes metadataAccount={metadataAccountData} />
      <NftTags metadataAccount={metadataAccountData} />
      {creatorRoyalties}
      {seriesInfoCard}
      {campaignInfoCard}
      {links}
    </div>
  );
}
