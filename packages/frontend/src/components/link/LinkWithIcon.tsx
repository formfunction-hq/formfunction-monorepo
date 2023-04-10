import TextButton from "components/buttons/TextButton";
import LinkIcon from "components/icons/LinkIcon";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

export type LinkWithIconProps = {
  href: string;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  maxWidth?: number;
  text: string;
};

export default function LinkWithIcon({
  href,
  icon,
  iconPosition = "left",
  maxWidth,
  text,
}: LinkWithIconProps) {
  return (
    <TextButton
      href={href}
      type="link_external"
      icon={icon ?? <LinkIcon colorValue={ColorValue.BrightPurple} />}
      iconPosition={iconPosition}
    >
      <Body1
        colorClass={ColorClass.BrightPurple}
        truncateLines={1}
        style={{ maxWidth }}
      >
        {text ?? href}
      </Body1>
    </TextButton>
  );
}
