import graphql from "babel-plugin-relay/macro";
import LinkWithIcon, { LinkWithIconProps } from "components/link/LinkWithIcon";
import { LinkWithIconForLink_Link$key } from "components/link/__generated__/LinkWithIconForLink_Link.graphql";
import { useFragment } from "react-relay";

type Props = {
  link: LinkWithIconForLink_Link$key;
} & Omit<LinkWithIconProps, "href" | "text">;

const fragment = graphql`
  fragment LinkWithIconForLink_Link on Link {
    href
    text
  }
`;

export default function LinkWithIconForLink({
  link,
  icon,
  iconPosition,
  maxWidth = 400,
}: Props) {
  const linkData = useFragment(fragment, link);

  return (
    <LinkWithIcon
      href={linkData.href}
      icon={icon}
      iconPosition={iconPosition}
      text={linkData.text}
      maxWidth={maxWidth}
    />
  );
}
