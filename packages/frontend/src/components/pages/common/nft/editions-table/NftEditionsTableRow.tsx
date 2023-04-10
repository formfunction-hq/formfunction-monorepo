import graphql from "babel-plugin-relay/macro";
import styles from "css/pages/common/nft/editions-table/NftEditionsTableRow.module.css";
import ColorClass from "types/enums/ColorClass";
import ProfileLink from "components/pages/common/nft/ProfileLink";
import Body1 from "components/text/Body1";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ColorValue from "types/enums/ColorValue";
import { Link } from "react-router-dom";
import { NftStatusExpress_enum } from "components/auction/__generated__/NftOtherInfo_MetadataAccount.graphql";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftEditionsTableStructure from "components/pages/common/nft/editions-table/NftEditionsTableStructure";
import { NftEditionsTableRow_MetadataAccount$key } from "components/pages/common/nft/editions-table/__generated__/NftEditionsTableRow_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import NftAssetForMetadataAccount from "components/images/NftAssetForMetadataAccount";
import NftAssetSize from "types/enums/NftAssetSize";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import useBreakpoint from "hooks/useBreakpoint";
import useNftLinkForMetadataAccount from "hooks/useNftLinkForMetadataAccount";
import useFormattedNftPrice from "hooks/useFormattedNftPrice";
import useNftPriceSymbol from "hooks/useNftPriceSymbol";

export const editionsRowFragment = graphql`
  fragment NftEditionsTableRow_MetadataAccount on MetadataAccount {
    nft {
      edition
      status
      priceV2 {
        ...useFormattedNftPrice_Price
        ...useNftPriceSymbol_Price
      }

      Owner {
        id
        username

        ProfilePhoto {
          photoUrl
        }
      }
    }

    ...useNftLinkForMetadataAccount_MetadataAccount
    ...useEditionSupply_MetadataAccount
    ...useNftKind_MetadataAccount
    ...NftAssetForMetadataAccount_MetadataAccount
  }
`;

function getEditionAvailability(
  status: NftStatusExpress_enum,
  formattedPrice: string,
  symbol: string
) {
  const priceLabel = `• ${formattedPrice} ${symbol}`;
  switch (status) {
    case "Auction":
      return `In auction ${priceLabel}`;
    case "Listed":
      return `Reserve price ${priceLabel}`;
    case "ListedInstantSale":
      return `Instant sale ${priceLabel}`;
    case "ListingScheduled":
      return "Scheduled for listing";
    case "Owned":
      return "Not listed";
    case "Burned":
      return "Burned";
    case "AirdropCompleted":
    case "AirdropInProgress":
    case "SoldOutEditions":
    case "ListedEditions":
    case "OwnedStoppedMintingForEditions":
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(status);
  }
}

type RowProps = {
  metadataAccount: NftEditionsTableRow_MetadataAccount$key;
};

export default function NftEditionsTableRow({ metadataAccount }: RowProps) {
  const { isMobileBreakpoint } = useBreakpoint();
  const metadataAccountData = useFragment(editionsRowFragment, metadataAccount);
  const nftLink = useNftLinkForMetadataAccount(metadataAccountData);
  const { nft } = metadataAccountData;
  const formattedPrice = useFormattedNftPrice(nft.priceV2);
  const { shortSymbol, symbol } = useNftPriceSymbol(nft.priceV2);

  return (
    <Link to={nftLink}>
      <NftEditionsTableStructure>
        <div className={styles.imageContainer}>
          {!isMobileBreakpoint && (
            <NftAssetForMetadataAccount
              size={NftAssetSize.Size32}
              metadataAccount={metadataAccountData}
            />
          )}
          <Body1 colorClass={ColorClass.Primary}>#{nft.edition}</Body1>
        </div>
        <ProfileLink
          className={styles.profileLink}
          hideProfilePhoto={isMobileBreakpoint}
          photoSrc={nft.Owner?.ProfilePhoto?.photoUrl}
          username={nft.Owner!.username}
          userAddress={nft.Owner!.id}
        />
        <Body1 colorClass={ColorClass.Primary}>
          {getEditionAvailability(
            nft.status,
            formattedPrice,
            shortSymbol ?? symbol
          )}
        </Body1>
        <ArrowRightIcon colorValue={ColorValue.Secondary} size={20} />
      </NftEditionsTableStructure>
    </Link>
  );
}
