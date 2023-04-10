import styles from "css/pages/common/nft/editions-table/NftEditionsTableHeader.module.css";
import TinyLabel from "components/text/TinyLabel";
import ColorClass from "types/enums/ColorClass";
import NftEditionsTableStructure from "components/pages/common/nft/editions-table/NftEditionsTableStructure";

export default function NftEditionsTableHeader() {
  return (
    <NftEditionsTableStructure className={styles.tableHeader}>
      <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
        Edition
      </TinyLabel>
      <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
        Owner
      </TinyLabel>
      <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
        Availability
      </TinyLabel>
    </NftEditionsTableStructure>
  );
}
