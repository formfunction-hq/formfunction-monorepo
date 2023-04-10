import ArtName from "components/text/ArtName";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import styles from "css/buttons/ClickableArea.module.css";
import ColorValue from "types/enums/ColorValue";
import joinClasses from "utils/joinClasses";
import FlexBox from "components/layout/FlexBox";
import useBreakpoint from "hooks/useBreakpoint";

type Props = {
  className?: string;
  colorOverrides?: {
    background?: ColorValue;
    border?: ColorValue;
    subtitle?: ColorClass;
    title?: ColorClass;
  };
  disabled?: boolean;
  height: number | string;
  icon: JSX.Element;
  onClick?: () => void;
  subtitle?: string;
  title: string;
  width?: number | string;
};

export default function ClickableArea({
  className,
  colorOverrides,
  disabled,
  height,
  icon,
  onClick,
  subtitle,
  title,
  width,
}: Props) {
  const { isMobileBreakpoint } = useBreakpoint();
  const {
    background: backgroundValueClassOverride,
    border: borderColorValueOverride,
    title: titleColorClassOverride,
    subtitle: subtitleColorClassOverride,
  } = colorOverrides ?? {};

  return (
    <button
      disabled={disabled}
      type="button"
      style={{
        backgroundColor: backgroundValueClassOverride,
        borderColor: borderColorValueOverride,
        height,
        width,
      }}
      className={joinClasses(
        styles.container,
        disabled ? styles.disabled : undefined,
        className
      )}
      onClick={onClick}
    >
      <FlexBox
        flexDirection="column"
        alignItems="center"
        gap={isMobileBreakpoint ? 12 : 20}
      >
        {icon}
        <FlexBox flexDirection="column" gap={8}>
          <ArtName colorClass={titleColorClassOverride ?? ColorClass.Primary}>
            {title}
          </ArtName>
          <FlexBox padding="0 36px">
            <Body2
              colorClass={subtitleColorClassOverride ?? ColorClass.Secondary}
            >
              {subtitle ?? null}
            </Body2>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </button>
  );
}
