import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import CreateNotWhitelisted from "components/pages/create/CreateNotWhitelisted";
import ImportInfo from "components/pages/import/ImportInfo";
import ImportPreview from "components/pages/import/ImportPreview";
import ImportResults from "components/pages/import/ImportResults";
import ImportTokenAddresses from "components/pages/import/ImportTokenAddresses";
import { ImportContextProvider } from "context/ImportContext";
import useLogPageView from "hooks/useLogPageView";
import useSetPageTitle from "hooks/useSetPageTitle";
import useUserContext from "hooks/useUserContext";

function Body() {
  const { user } = useUserContext();

  if (user?.isWhitelisted == null || !user.isWhitelisted) {
    return <CreateNotWhitelisted />;
  }

  return (
    <ImportContextProvider>
      <ImportInfo />
      <ImportTokenAddresses />
      <ImportPreview />
      <ImportResults />
    </ImportContextProvider>
  );
}

export default function ImportPage(): JSX.Element {
  useSetPageTitle("Import");
  useLogPageView();

  return (
    <DisconnectedPageContainer>
      <Body />
    </DisconnectedPageContainer>
  );
}
