import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import CreateDetails from "components/pages/create/CreateDetails";
import CreateListed from "components/pages/create/CreateListed";
import CreateMedia from "components/pages/create/CreateMedia";
import CreateMint from "components/pages/create/CreateMint";
import CreateNotWhitelisted from "components/pages/create/CreateNotWhitelisted";
import CreateType from "components/pages/create/CreateType";
import CreateNftContextProvider from "context/CreateNftContextProvider";
import useLogPageView from "hooks/useLogPageView";
import useSetPageTitle from "hooks/useSetPageTitle";
import useUserContext from "hooks/useUserContext";

function Body() {
  const { user } = useUserContext();

  if (user?.isWhitelisted == null || !user.isWhitelisted) {
    return <CreateNotWhitelisted />;
  }

  return (
    <CreateNftContextProvider>
      <PageWithHeaderAndFooter hideBottomTabs>
        <CreateType />
        <CreateMedia />
        <CreateDetails />
        <CreateMint />
        <CreateListed />
      </PageWithHeaderAndFooter>
    </CreateNftContextProvider>
  );
}

export default function CreatePage(): JSX.Element {
  useSetPageTitle("Create");
  useLogPageView();

  return (
    <DisconnectedPageContainer>
      <Body />
    </DisconnectedPageContainer>
  );
}
