import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";

export default function UsernameLink({
  buttonTheme = TextButtonTheme.PurpleGradient,
  className,
  fontClass,
  username,
}: {
  buttonTheme?: TextButtonTheme;
  className?: string;
  fontClass?: FontClass;
  username: string;
}) {
  return (
    <TextButton
      buttonThemeOrColorClass={buttonTheme}
      className={className}
      display="inline"
      fontClass={fontClass}
      href={getUserProfileLinkRelative(username)}
      type="link_internal"
    >
      @{username}
    </TextButton>
  );
}
