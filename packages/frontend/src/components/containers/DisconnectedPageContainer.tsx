import LoadingSpinner from "components/loading/LoadingSpinner";
import MessagePage from "components/pages/common/MessagePage";
import DisconnectedPage from "components/pages/misc/DisconnectedPage";
import useSolanaContext from "hooks/useSolanaContext";
import useUserContext from "hooks/useUserContext";
import ColorValue from "types/enums/ColorValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import DisconnectedPageContent from "components/pages/misc/DisconnectedPageContent";
import isEmployee from "utils/isEmployee";

type Props = {
  adminOnly?: boolean;
  children: any;
  disconnectedMessage?: string;
  fallback?: JSX.Element;
  hidePageHeaderAndFooter?: boolean;
};

export default function DisconnectedPageContainer({
  adminOnly,
  children,
  disconnectedMessage,
  fallback,
  hidePageHeaderAndFooter,
}: Props): Maybe<JSX.Element> {
  const { anchorWallet } = useSolanaContext();
  const { user } = useUserContext();

  if (anchorWallet === undefined || user === undefined) {
    return (
      fallback || (
        <MessagePage>
          <LoadingSpinner colorValue={ColorValue.BrightPurple} />
        </MessagePage>
      )
    );
  }

  if (
    anchorWallet == null ||
    user?.id == null ||
    (adminOnly && !isEmployee(user.id))
  ) {
    return hidePageHeaderAndFooter ? (
      <DisconnectedPageContent disconnectedMessage={disconnectedMessage} />
    ) : (
      <DisconnectedPage disconnectedMessage={disconnectedMessage} />
    );
  }

  return children;
}
