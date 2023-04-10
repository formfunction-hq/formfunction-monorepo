import styles from "css/series/SeriesNftSelectDnd.module.css";
import { Draggable } from "react-beautiful-dnd";
import GenericDnd from "components/drag-and-drop/GenericDnd";
import { Item } from "components/pages/campaign/edit/funding-tiers/FundingTierNftsContext";
import GenericNftSearchDndRow from "components/nft/GenericNftSearchDndRow";
import useFundingTierNftsContext from "hooks/useFundingTierNftsContext";

// TODO[@bryancho]: share code with SeriesNftSelectDnd by passing in
// items, setItems, removeItem in as params
export default function FundingTierNftSelectDnd() {
  const { items, setItems, removeItem } = useFundingTierNftsContext();

  const renderRow = (item: Item, index: number) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <GenericNftSearchDndRow
            onRemove={removeItem}
            metadataAccount={item.metadataAccount}
          />
        </div>
      )}
    </Draggable>
  );

  return (
    <GenericDnd
      className={styles.container}
      items={items}
      setItems={setItems}
      droppableId="fundingTierNftSelectDnd"
      renderRow={renderRow}
    />
  );
}
