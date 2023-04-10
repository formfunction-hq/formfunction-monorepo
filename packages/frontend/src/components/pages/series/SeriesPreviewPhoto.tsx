import NftAsset from "components/images/NftAsset";
import NftAssetSize from "types/enums/NftAssetSize";
import styles from "css/series/SeriesPreviewPhoto.module.css";

type Props = {
  previewPhotoUrl: string;
};

export default function SeriesPreviewPhoto({ previewPhotoUrl }: Props) {
  return (
    <NftAsset
      assetSrc={previewPhotoUrl}
      contentType="image"
      className={styles.seriesPreviewPhoto}
      size={NftAssetSize.Size72}
    />
  );
}
