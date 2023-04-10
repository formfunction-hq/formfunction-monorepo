import styles from "css/listing/ListNftChooseListingType.module.css";
import ColorValue from "types/enums/ColorValue";
import ListingOption from "components/listing/ListingOption";
import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
import DollarSignIcon from "components/icons/DollarSignIcon";
import TrendingUpIcon from "components/icons/TrendingUpIcon";
import Divider from "components/misc/Divider";
import ColorClass from "types/enums/ColorClass";
import BarChartIcon from "components/icons/BarChartIcon";

type Props = {
  setPriceFunctionType: (val: PriceFunctionType) => void;
};

export default function EditionsChoosePriceFunctionType({
  setPriceFunctionType,
}: Props): JSX.Element {
  return (
    <div className={styles.listingOptions}>
      <ListingOption
        onClick={() => setPriceFunctionType(PriceFunctionType.Constant)}
        name="Set price"
        description="Every edition will be listed at the same price."
        icon={<DollarSignIcon colorValue={ColorValue.Primary} />}
      />
      <Divider colorClass={ColorClass.Tertiary} />
      <ListingOption
        onClick={() => setPriceFunctionType(PriceFunctionType.Linear)}
        name="Incrementing price"
        description="Set a starting price, and editions will incrementally increase in price as they are minted."
        icon={<TrendingUpIcon colorValue={ColorValue.Primary} />}
      />
      <Divider colorClass={ColorClass.Tertiary} />
      <ListingOption
        onClick={() => setPriceFunctionType(PriceFunctionType.Minimum)}
        name="Flexible price (pay what you want)"
        description="Set a minimum price, and people can pay anything at or above that for an edition."
        icon={<BarChartIcon colorValue={ColorValue.Primary} size={32} />}
      />
    </div>
  );
}
