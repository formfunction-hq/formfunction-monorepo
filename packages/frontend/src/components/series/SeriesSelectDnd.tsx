import styles from "css/series/SeriesSelectDnd.module.css";
import { Draggable } from "react-beautiful-dnd";
import { SeriesDndRow_Series$key } from "components/series/__generated__/SeriesDndRow_Series.graphql";
import SeriesDndRow from "components/series/SeriesDndRow";
import GenericDnd from "components/drag-and-drop/GenericDnd";

export type Item = {
  id: string;
  series: SeriesDndRow_Series$key;
  seriesMint: string;
};

type Props = {
  items: Array<Item>;
  onBurnCompleted: (deletedSeriesMint: string) => void;
  setItems: (items: Array<Item>) => void;
};

export default function SeriesSelectDnd({
  items,
  onBurnCompleted,
  setItems,
}: Props) {
  const renderRow = (item: Item, index: number) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <SeriesDndRow
            onBurnCompleted={onBurnCompleted}
            series={item.series}
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
      droppableId="seriesSelectDnd"
      renderRow={renderRow}
    />
  );
}
