import TinyLabel from "components/text/TinyLabel";
import ColorClass from "types/enums/ColorClass";
import styles from "css/pages/common/nft/NftInfoCard.module.css";
import { Link } from "react-router-dom";
import ArtName from "components/text/ArtName";
import SeriesPreviewPhoto from "components/pages/series/SeriesPreviewPhoto";

type Props = {
  href: string;
  label: string;
  name: string;
  previewPhotoUrl: string;
};

export default function NftInfoCard({
  href,
  label,
  name,
  previewPhotoUrl,
}: Props) {
  return (
    // Max width needed for wide asset layout
    <Link style={{ maxWidth: 543 }} to={href}>
      <div className={styles.container}>
        <SeriesPreviewPhoto previewPhotoUrl={previewPhotoUrl} />
        <div className={styles.right}>
          <TinyLabel
            colorClass={ColorClass.Secondary}
            textTransform="uppercase"
          >
            {label}
          </TinyLabel>
          <ArtName colorClass={ColorClass.Primary}>{name}</ArtName>
        </div>
      </div>
    </Link>
  );
}
