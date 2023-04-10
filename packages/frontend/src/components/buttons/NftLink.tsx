import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function NftLink({
  assetHeight,
  assetWidth,
  buttonTheme = TextButtonTheme.Primary,
  className,
  fontClass = FontClass.Body1,
  mint,
  name,
  username,
}: {
  assetHeight: Maybe<number>;
  assetWidth: Maybe<number>;
  buttonTheme?: TextButtonTheme;
  className?: string;
  fontClass?: FontClass;
  mint: string;
  name: string;
  username?: string;
}) {
  return (
    <TextButton
      buttonThemeOrColorClass={buttonTheme}
      className={className}
      display="inline"
      fontClass={fontClass}
      href={getNftLinkRelative(username, mint, assetWidth, assetHeight)}
      type="link_internal"
    >
      {name}
    </TextButton>
  );
}
