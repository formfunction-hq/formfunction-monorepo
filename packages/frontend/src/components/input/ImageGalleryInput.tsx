import GenericDnd from "components/drag-and-drop/GenericDnd";
import { Draggable } from "react-beautiful-dnd";
import styles from "css/input/ImageGalleryInput.module.css";
import Imgix from "react-imgix";
import RemoveIcon from "components/icons/RemoveIcon";
import ColorValue from "types/enums/ColorValue";
import AspectRatioContainer from "components/containers/AspectRatioContainer";
import PlusIcon from "components/icons/PlusIcon";
import GenericDropzone from "components/input/GenericDropzone";
import BYTES_PER_MEGABYTE from "formfn-shared/dist/constants/BytesPerMegabyte";
import UploadMediaInput from "components/input/UploadMediaInput";
import { useState } from "react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { AssetInput } from "components/pages/campaign/edit/__generated__/CampaignGalleryModalMutation.graphql";
import MaybeImgix from "components/images/MaybeImgix";
import MediaType from "types/enums/MediaType";

export type AssetInputItem = {
  asset: AssetInput;
  id: string;
};
export type ImageGalleryFile = {
  file: File;
  id: string;
};

export type ImageGalleryItem = AssetInputItem | ImageGalleryFile;

const UPLOAD_ACCEPT = [MediaType.ImageJpeg, MediaType.ImagePng];

function MiniImageCard({
  imageObject,
  onClick,
  onRemove,
}: {
  imageObject: ImageGalleryItem;
  onClick: () => void;
  onRemove: () => void;
}) {
  const isFile = "file" in imageObject;
  const src = isFile
    ? URL.createObjectURL(imageObject.file)
    : (imageObject as AssetInputItem).asset.downloadUrl;

  const onRemoveHandler = (
    // eslint-disable-next-line no-undef
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div className={styles.miniCard}>
      <div
        onClick={onClick}
        onKeyDown={onClick}
        className={styles.miniImageCard}
        role="button"
        tabIndex={0}
      >
        <div
          className={styles.removeIconContainer}
          onClick={onRemoveHandler}
          onKeyDown={onRemoveHandler}
          role="button"
          tabIndex={0}
        >
          <RemoveIcon
            strokeColorValue={ColorValue.White}
            fillColorValue={ColorValue.Secondary}
          />
        </div>
        <AspectRatioContainer width={18} height={11}>
          <MaybeImgix src={src}>
            <Imgix src={src} className={styles.img} />
            <img src={src} className={styles.img} />
          </MaybeImgix>
        </AspectRatioContainer>
      </div>
    </div>
  );
}

function MiniUploadCard({ addFile }: { addFile: (file: File) => void }) {
  return (
    <GenericDropzone
      accept={UPLOAD_ACCEPT}
      disableHoverStyle
      onDropAccepted={(files) => {
        if (files.length === 0) {
          return;
        }
        addFile(files[0]);
      }}
      maxSize={5 * BYTES_PER_MEGABYTE}
    >
      <div className={styles.miniCard}>
        <div className={styles.uploadCard}>
          <PlusIcon colorValue={ColorValue.Ghost} />
        </div>
      </div>
    </GenericDropzone>
  );
}

function DraggableMiniImageCard({
  item,
  index,
  setLargeImageIndex,
  onRemoveItem,
}: {
  index: number;
  item: ImageGalleryItem;
  onRemoveItem: (index: number) => void;
  setLargeImageIndex: (index: number) => void;
}) {
  const identifier = item instanceof File ? item.name : item.id;

  return (
    <Draggable key={identifier} draggableId={identifier} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <MiniImageCard
            onClick={() => setLargeImageIndex(index)}
            imageObject={item}
            onRemove={() => onRemoveItem(index)}
          />
        </div>
      )}
    </Draggable>
  );
}
const getLargeImageInfo = (
  largeImage: ImageGalleryItem
): [Maybe<File>, Maybe<string>] => [
  (largeImage as ImageGalleryFile)?.file ?? null,
  (largeImage as AssetInputItem)?.asset?.downloadUrl ?? null,
];

export default function ImageGalleryInput({
  items,
  setItems,
}: {
  items: Array<ImageGalleryItem>;
  setItems: (items: Array<ImageGalleryItem>) => void;
}) {
  const [largeImageIndex, setLargeImageIndex] = useState(0);

  const onRemoveItem = (indexToRemove: number) => {
    const itemsCopy = [...items];
    itemsCopy.splice(indexToRemove, 1);
    setItems(
      items.filter((item: ImageGalleryItem, index) => index !== indexToRemove)
    );
    if (largeImageIndex === indexToRemove) {
      setLargeImageIndex(0);
    }
  };

  const renderRow = (item: ImageGalleryItem, index: number) => (
    <DraggableMiniImageCard
      key={item.id}
      item={item}
      index={index}
      onRemoveItem={onRemoveItem}
      setLargeImageIndex={setLargeImageIndex}
    />
  );

  const addFile = (file: File) => {
    setItems([...items, { file, id: file.name }]);
  };

  const dndSetItems = (
    dndItems: Array<ImageGalleryItem>,
    destinationIndex: number
  ) => {
    if (destinationIndex === 0) {
      setLargeImageIndex(0);
    }
    setItems(dndItems);
  };

  const [file, photoUrl] = getLargeImageInfo(items[largeImageIndex]);

  return (
    <div>
      <UploadMediaInput
        file={file}
        asset={
          photoUrl == null
            ? null
            : {
                // Technically not always correct, but we don't care about the exact
                // media type in this scenario, we just care that it is an image.
                mediaType: MediaType.ImageJpeg,
                url: photoUrl,
              }
        }
        setFile={addFile}
      />
      <GenericDnd
        className={styles.dnd}
        direction="horizontal"
        droppableId="image-gallery-input-droppable-id"
        items={items}
        endElement={<MiniUploadCard addFile={addFile} />}
        renderRow={renderRow}
        setItems={dndSetItems}
      />
    </div>
  );
}
