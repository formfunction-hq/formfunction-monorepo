import PlainButton from "components/buttons/PlainButton";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ArtName from "components/text/ArtName";
import styles from "css/pages/common/nft/NftGenericSupplementaryItem.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import useBreakpoint from "hooks/useBreakpoint";
import { Link } from "react-router-dom";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import NftGenericSupplementaryItemType from "types/NftGenericSupplementaryItemType";

function LinkWrapper({
  link,
  children,
  onClick,
}: {
  children: any;
  link?: Maybe<string>;
  onClick?: () => void;
}) {
  if (link != null) {
    return (
      <Link onClick={onClick != null ? onClick : emptyFunction} to={link}>
        {children}
      </Link>
    );
  }

  if (onClick != null) {
    return <PlainButton onClick={onClick}>{children}</PlainButton>;
  }

  return children;
}

function getColumnGap(
  componentType: NftGenericSupplementaryItemType,
  isMobileBreakpoint: boolean
) {
  switch (componentType) {
    case "standard":
      return isMobileBreakpoint ? 32 : 16;
    case "subtle":
      return isMobileBreakpoint ? 24 : 12;
    default:
      return assertUnreachable(componentType);
  }
}

type Props = {
  actionButton?: Maybe<JSX.Element>;
  componentType: NftGenericSupplementaryItemType;
  description?: Maybe<JSX.Element>;
  image: JSX.Element;
  link?: Maybe<string>;
  onClick?: () => void;
  secondaryTitle?: Maybe<string>;
  title: JSX.Element;
};

export default function NftGenericSupplementaryItem({
  actionButton,
  componentType,
  description,
  link,
  image,
  secondaryTitle,
  onClick,
  title,
}: Props) {
  const { isMobileBreakpoint } = useBreakpoint();
  return (
    <div
      className={styles.container}
      style={{ columnGap: getColumnGap(componentType, isMobileBreakpoint) }}
    >
      <LinkWrapper link={link} onClick={onClick}>
        <div className={styles.imageContainer}>{image}</div>
      </LinkWrapper>
      <div className={styles.content}>
        <LinkWrapper link={link} onClick={onClick}>
          <div className={styles.row}>
            {title}
            {componentType === "subtle" && link != null && (
              <ArrowRightIcon colorValue={ColorValue.Secondary} size={20} />
            )}
          </div>
          {secondaryTitle != null && (
            <ArtName
              className={styles.secondaryTitle}
              colorClass={ColorClass.Primary}
            >
              {secondaryTitle}
            </ArtName>
          )}
        </LinkWrapper>
        {description != null && <div className={styles.row}>{description}</div>}
        {actionButton != null && (
          <div className={styles.actionButton}>{actionButton}</div>
        )}
      </div>
    </div>
  );
}
