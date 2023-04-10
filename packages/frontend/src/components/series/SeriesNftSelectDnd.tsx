import styles from "css/series/SeriesNftSelectDnd.module.css";
import { useContext } from "react";
import {
  SeriesSelectedNftsContext,
  Item,
} from "context/SeriesSelectedNftsContext";
import { Draggable } from "react-beautiful-dnd";
import GenericDnd from "components/drag-and-drop/GenericDnd";
import GenericNftSearchDndRow from "components/nft/GenericNftSearchDndRow";

export default function SeriesNftSelectDnd() {
  const {
    items,
    setItems,
    removeItem,
    shouldExecuteOperation,
    triggerMaxActionsPopover,
  } = useContext(SeriesSelectedNftsContext);
  const onRemove = (metadataAccountId: string) => {
    if (!shouldExecuteOperation(metadataAccountId, "remove")) {
      triggerMaxActionsPopover();
      return;
    }

    removeItem(metadataAccountId);
  };
  const renderRow = (item: Item, index: number) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <GenericNftSearchDndRow
            onRemove={onRemove}
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
      droppableId="seriesNftSelectDnd"
      renderRow={renderRow}
    />
  );
}
