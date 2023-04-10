import styles from "css/listing/ListNftChooseListingType.module.css";
import ListingType from "types/enums/ListingType";
import ColorValue from "types/enums/ColorValue";
import InstantSaleIcon from "components/icons/InstantSaleIcon";
import ListingOption from "components/listing/ListingOption";
import ColorClass from "types/enums/ColorClass";
import Divider from "components/misc/Divider";
import AuctionIcon from "components/icons/AuctionIcon";

type Props = {
  setListingType: (val: ListingType) => void;
};

export default function ListNftChooseListingType({
  setListingType,
}: Props): JSX.Element {
  return (
    <div className={styles.listingOptions}>
      <ListingOption
        onClick={() => setListingType(ListingType.Auction)}
        name="List as an auction"
        description="Set up an auction with a reserve price so collectors can bid on it."
        icon={<AuctionIcon colorValue={ColorValue.Primary} size={32} />}
      />
      <Divider colorClass={ColorClass.Tertiary} />
      <ListingOption
        onClick={() => setListingType(ListingType.InstantSale)}
        name="List as an instant sale"
        description="Set a price so a collector can instantly buy the NFT."
        icon={<InstantSaleIcon colorValue={ColorValue.Primary} />}
      />
    </div>
  );
}
