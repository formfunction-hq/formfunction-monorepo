import OnlyDesktopErrorPage from "components/error/OnlyDesktopErrorPage";
import useBreakpoint from "hooks/useBreakpoint";
import OnlyDesktopDescription from "types/enums/OnlyDesktopDescription";

type Props = {
  children: any;
  description: OnlyDesktopDescription;
};

export default function OnlyDesktopContainer({ children, description }: Props) {
  const { isTabletWideBreakpoint } = useBreakpoint();
  if (isTabletWideBreakpoint) {
    return <OnlyDesktopErrorPage description={description} />;
  }

  return children;
}
