import BottomTabs from "components/bottom-tabs/BottomTabs";
import { BottomTabsProvider } from "context/BottomTabsContext";
import useBottomTabsContext from "hooks/useBottomTabsContext";

function Inner({ children }: { children: any }) {
  const { hasBottomTabs, hideBottomTabs } = useBottomTabsContext();

  return (
    <>
      {hasBottomTabs && !hideBottomTabs && <BottomTabs />}
      {children}
    </>
  );
}

type Props = {
  children: any;
  hideBottomTabs?: boolean;
};

export default function PageWithBottomTabs({
  children,
  hideBottomTabs = false,
}: Props): JSX.Element {
  return (
    <BottomTabsProvider hideBottomTabs={hideBottomTabs}>
      <Inner>{children}</Inner>
    </BottomTabsProvider>
  );
}
