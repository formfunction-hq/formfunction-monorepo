import MaybeImgix from "components/images/MaybeImgix";
import Imgix from "react-imgix";
import styles from "css/images/GrayProfilePhotoCircle.module.css";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import joinClasses from "utils/joinClasses";

type Props = {
  className?: MaybeUndef<string>;
  profilePhotoSrc?: MaybeUndef<string>;
};

export default function GrayProfilePhotoCircle({
  className,
  profilePhotoSrc,
}: Props) {
  if (profilePhotoSrc == null || profilePhotoSrc.length === 0) {
    return null;
  }
  return (
    <MaybeImgix src={profilePhotoSrc}>
      <Imgix
        className={joinClasses(className, styles.profilePhoto)}
        src={profilePhotoSrc}
        sizes="50vw"
      />
      <img
        className={joinClasses(className, styles.profilePhoto)}
        src={profilePhotoSrc}
      />
    </MaybeImgix>
  );
}
