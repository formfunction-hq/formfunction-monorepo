import graphql from "babel-plugin-relay/macro";
import { CreateNftDetailsContextProvider } from "context/CreateNftDetailsContext";
import { CreateUnlockableContextProvider } from "context/CreateUnlockableContext";
import { ListingContextProvider } from "context/ListingContext";
import { ListNftContextProvider_MetadataAccount$key } from "context/__generated__/ListNftContextProvider_MetadataAccount.graphql";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment ListNftContextProvider_MetadataAccount on MetadataAccount {
    ...ListingContext_MetadataAccount
  }
`;

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  metadataAccount: ListNftContextProvider_MetadataAccount$key;
};

export default function ListNftContextProvider({
  children,
  metadataAccount,
}: ProviderProps) {
  const metadataAccountData = useFragment(fragment, metadataAccount);

  return (
    <CreateNftDetailsContextProvider>
      <ListingContextProvider metadataAccount={metadataAccountData}>
        <CreateUnlockableContextProvider>
          {children}
        </CreateUnlockableContextProvider>
      </ListingContextProvider>
    </CreateNftDetailsContextProvider>
  );
}
