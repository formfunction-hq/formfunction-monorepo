import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import DisconnectedPageContent from "components/pages/misc/DisconnectedPageContent";

type Props = {
  disconnectedMessage?: string;
};

export default function DisconnectedPage({
  disconnectedMessage = "Sign in with your wallet to continue",
}: Props): JSX.Element {
  return (
    <PageWithHeaderAndFooter>
      <DisconnectedPageContent disconnectedMessage={disconnectedMessage} />
    </PageWithHeaderAndFooter>
  );
}
