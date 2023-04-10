import graphql from "babel-plugin-relay/macro";
import { AccountSetupModalContainerUserQuery } from "components/modal/__generated__/AccountSetupModalContainerUserQuery.graphql";
import useSolanaContext from "hooks/useSolanaContext";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import NewAccountSetupModal from "components/modal/NewAccountSetupModal";

const query = graphql`
  query AccountSetupModalContainerUserQuery($id: String!) {
    User_by_pk(id: $id) {
      # eslint-disable-next-line relay/unused-fields
      id
      hasCompletedSignup
    }
  }
`;

function AccountSetupModalContainerInner(): Maybe<JSX.Element> {
  const { anchorWallet } = useSolanaContext();
  const data = useLazyLoadQuery<AccountSetupModalContainerUserQuery>(query, {
    id: anchorWallet?.publicKey.toString() ?? "",
  });

  if (data.User_by_pk != null && data.User_by_pk.hasCompletedSignup === true) {
    return null;
  }

  return <NewAccountSetupModal isShown onHide={emptyFunction} />;
}

/**
 * Displays AccountSetupModal if necessary
 */
export default function AccountSetupModalContainer(): Maybe<JSX.Element> {
  return (
    <Suspense fallback={null}>
      <AccountSetupModalContainerInner />
    </Suspense>
  );
}
