import ListingCardGeneric from "components/auction/ListingCardGeneric";
import ListingCardImage from "components/auction/ListingCardImage";
import ViewerArtistPillButton from "components/buttons/ViewerArtistPillButton";
import ArtName from "components/text/ArtName";
import ColorClass from "types/enums/ColorClass";
import styles from "css/pages/create/CreateListingPreview.module.css";
import isFileVideo from "utils/isFileVideo";
import SearchIcon from "components/icons/SearchIcon";
import ColorValue from "types/enums/ColorValue";
import ImageModal from "components/modal/ImageModal";
import { useState } from "react";
import VolumeOffIcon from "components/icons/VolumeOffIcon";
import VolumeOnIcon from "components/icons/VolumeOnIcon";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import useCreateContext from "hooks/useCreateContext";
import CreateEditionType from "types/enums/CreateEditionType";
import ListingCardPill from "components/auction/ListingCardPill";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import CreateMintType from "types/enums/CreateMintType";
import OverlayContainer from "components/containers/OverlayContainer";
import OverlayButton from "components/buttons/OverlayButton";
import LayersIcon from "components/icons/LayersIcon";
import getFileMediaType from "utils/files/getFileMediaType";

function Pill({
  editionType,
  supply,
}: {
  editionType: CreateEditionType;
  supply: Maybe<number>;
}) {
  if (editionType === CreateEditionType.UnlimitedEditions) {
    return (
      <ListingCardPill
        icon={<LayersIcon colorValue={ColorValue.BrightPurple} size={24} />}
        text="Open editions"
      />
    );
  }

  return (
    <ListingCardPill
      icon={<LayersIcon colorValue={ColorValue.BrightPurple} size={24} />}
      text={`${supply ?? "?"} editions`}
    />
  );
}

export default function CreateListingPreview(): JSX.Element {
  const { createMintType } = useCreateContext();
  const { file, fileDataUrl, title, editionSupply, editionType } =
    useCreateNftDetailsContext();
  const [isImageModalShown, setIsImageModalShown] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const image = (
    <div className={styles.imageContainer}>
      <ListingCardImage
        isMuted={isMuted || isImageModalShown}
        mediaType={file == null ? "unknown" : getFileMediaType(file)}
        src={fileDataUrl}
        pills={
          createMintType === CreateMintType.Editions
            ? [<Pill editionType={editionType!} supply={editionSupply} />]
            : undefined
        }
      />
      <OverlayContainer alignItems="flex-start" className={styles.imageOverlay}>
        {isFileVideo(file) &&
          (isMuted || isImageModalShown ? (
            <OverlayButton onClick={() => setIsMuted(false)}>
              <VolumeOffIcon colorValue={ColorValue.White} />
            </OverlayButton>
          ) : (
            <OverlayButton onClick={() => setIsMuted(true)}>
              <VolumeOnIcon colorValue={ColorValue.White} />
            </OverlayButton>
          ))}
        <OverlayButton onClick={() => setIsImageModalShown(true)}>
          <SearchIcon colorValue={ColorValue.White} size={24} />
        </OverlayButton>
      </OverlayContainer>
    </div>
  );

  const titleElem = (
    <ArtName
      className={styles.title}
      colorClass={title.length > 0 ? ColorClass.Primary : ColorClass.Ghost}
    >
      {title.length > 0 ? title : "Title will go here"}
    </ArtName>
  );

  return (
    <>
      <ListingCardGeneric
        artistPillButton={<ViewerArtistPillButton />}
        enableMaxWidth
        image={image}
        title={titleElem}
      />
      <ImageModal
        isMuted={isMuted}
        isShown={isImageModalShown}
        isVideo={isFileVideo(file)}
        onHide={() => setIsImageModalShown(false)}
        setIsMuted={setIsMuted}
        src={fileDataUrl!}
      />
    </>
  );
}
