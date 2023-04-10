import ColorValue from "types/enums/ColorValue";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import styles from "css/images/ProfilePhotoCircle.module.css";
import Imgix from "react-imgix";
import joinClasses from "utils/joinClasses";
import MaybeImgix from "components/images/MaybeImgix";
import { Link } from "react-router-dom";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import ProfileIcon from "components/icons/ProfileIcon";

type Props = {
  borderWidth?: number;
  className?: string;
  hasBorder?: boolean;
  hasShadow?: boolean;
  hideIcon?: boolean;
  squared?: boolean;
  src: MaybeUndef<string>;
  username?: string;
  width?: number;
};

export default function ProfilePhotoCircle({
  borderWidth = 2,
  className,
  hasBorder = false,
  hasShadow = false,
  hideIcon,
  squared = false,
  src,
  username,
  width = 32,
}: Props): JSX.Element {
  const style = {
    border: hasBorder ? `${borderWidth}px solid var(--color-white)` : undefined,
    borderRadius: squared ? "8px" : "50%",
    boxShadow: hasShadow ? "var(--box-shadow-button)" : undefined,
    boxSizing: "content-box" as const,
    height: width,
    width,
  };

  const content =
    src == null || src === "" ? (
      <div className={styles.image} style={style}>
        {hideIcon === true ? null : (
          <ProfileIcon colorValue={ColorValue.White} size={20} />
        )}
      </div>
    ) : (
      <MaybeImgix src={src}>
        <Imgix
          className={joinClasses(
            styles.image,
            className,
            squared ? styles.squared : ""
          )}
          src={src}
          sizes="100vw"
          width={width * 2}
          height={width * 2}
          htmlAttributes={{ style }}
        />
        <img className={styles.image} src={src} style={style} />
      </MaybeImgix>
    );

  return username != null ? (
    <Link to={getUserProfileLinkRelative(username)}>{content}</Link>
  ) : (
    content
  );
}
