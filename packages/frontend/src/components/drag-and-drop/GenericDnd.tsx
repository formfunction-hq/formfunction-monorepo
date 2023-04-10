import { Maybe } from "graphql/jsutils/Maybe";
import {
  Direction,
  DragDropContext,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

type Item = {
  id: string;
};

type Props<T extends Item> = {
  className: string;
  direction?: Direction;
  droppableId: string;
  endElement?: Maybe<JSX.Element>;
  items: Array<T>;
  renderRow: (item: T, index: number) => JSX.Element;
  setItems: (items: Array<T>, destinationIndex: number) => void;
};

export default function GenericDnd<T extends Item>({
  className,
  direction = "vertical",
  droppableId,
  items,
  endElement = null,
  renderRow,
  setItems,
}: Props<T>) {
  const reorder = (list: Array<T>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setItems(
      reorder(items, result.source.index, result.destination.index),
      result.destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction={direction} droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={className}
          >
            {items.map((item, i) => renderRow(item, i))}
            {provided.placeholder}
            {endElement != null ? endElement : null}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
