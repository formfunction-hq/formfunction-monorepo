import PlainButton from "components/buttons/PlainButton";
import FilterIcon from "components/icons/FilterIcon";
import NavLink from "components/text/NavLink";
import styles from "css/buttons/FiltersButton.module.css";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import joinClasses from "utils/joinClasses";

type IconSize = 20 | 24;

type Props = {
  hideLabel?: boolean;
  iconSize?: IconSize;
  onClick?: () => void;
};

export default function FiltersButton({
  hideLabel = false,
  iconSize = 24,
  onClick,
}: Props): JSX.Element {
  const children = (
    <>
      <FilterIcon colorValue={ColorValue.Primary} size={iconSize} />
      {!hideLabel && <NavLink colorClass={ColorClass.Primary}>Filters</NavLink>}
    </>
  );
  const className = joinClasses(
    styles.button,
    hideLabel ? null : styles.buttonWithLabel,
    iconSize === 20 ? styles.buttonSmallIcon : null
  );

  if (onClick != null) {
    return (
      <PlainButton className={className} onClick={onClick}>
        {children}
      </PlainButton>
    );
  }

  return <div className={className}>{children}</div>;
}
