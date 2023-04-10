import MaybeImgix from "components/images/MaybeImgix";
import Body1Medium from "components/text/Body1Medium";
import styles from "css/buttons/ArtistPillButton.module.css";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import formatUsername from "utils/formatUsername";
import joinClasses from "utils/joinClasses";
import ProfileIcon from "components/icons/ProfileIcon";

function ProfileImage({
  className,
  src,
}: {
  className: string;
  src: MaybeUndef<string>;
}) {
  if (src == null) {
    return (
      <div className={className}>
        <ProfileIcon colorValue={ColorValue.White} size={20} />
      </div>
    );
  }

  return (
    <MaybeImgix src={src}>
      <Imgix className={className} src={src} width={64} />
      <img className={className} src={src} />
    </MaybeImgix>
  );
}

export type Props = {
  className?: string;
  collabSrcs?: Array<Maybe<string>>;
  disableLink?: boolean;
  disablePicture?: boolean;
  isLinkExternal?: boolean;
  name: string;
  src?: MaybeUndef<string>;
  truncate?: boolean;
  type?: "standard" | "shadow";
};

export default function ArtistPillButton({
  className,
  collabSrcs = [],
  disableLink = false,
  disablePicture = false,
  isLinkExternal = false,
  truncate = true,
  name,
  src,
  type = "standard",
}: Props): JSX.Element {
  let image;
  const joinedClassName = joinClasses(
    styles.button,
    type === "shadow" ? styles.buttonShadow : null,
    className
  );

  if (disablePicture) {
    image = null;
  } else {
    image = (
      <div style={{ zIndex: collabSrcs.length + 1 }}>
        <ProfileImage className={styles.image} src={src} />
      </div>
    );
  }

  const imageCollabClassName = joinClasses(styles.image, styles.imageCollab);

  const collabImages = collabSrcs.map((collabSrc, index) => (
    <div
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      style={{ zIndex: collabSrcs.length - index }}
    >
      <ProfileImage className={imageCollabClassName} src={collabSrc} />
    </div>
  ));

  const children = (
    <>
      {image}
      {collabImages}
      <Body1Medium
        className={truncate === true ? styles.truncate : ""}
        colorClass={type === "standard" ? ColorClass.Primary : ColorClass.White}
      >
        @{formatUsername(name)!}
      </Body1Medium>
    </>
  );

  if (disableLink) {
    return <div className={joinedClassName}>{children}</div>;
  }

  if (isLinkExternal) {
    return (
      <a
        className={joinedClassName}
        href={getUserProfileLinkRelative(name)}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={joinedClassName} to={getUserProfileLinkRelative(name)}>
      {children}
    </Link>
  );
}
