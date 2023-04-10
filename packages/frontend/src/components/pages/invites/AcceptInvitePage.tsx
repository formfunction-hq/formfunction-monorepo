import ConnectWalletButton from "components/buttons/ConnectWalletButton";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import LoadingSpinner from "components/loading/LoadingSpinner";
import GenericPageBodyWithGraphic from "components/misc/GenericPageBodyWithGraphic";
import Page404 from "components/pages/errors/Page404";
import AcceptInviteBody from "components/pages/invites/AcceptInviteBody";
import useSolanaContext from "hooks/useSolanaContext";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import ColorValue from "types/enums/ColorValue";
import getImgixUrl from "utils/getImgixUrl";

function DisconnectedBody() {
  const img = getImgixUrl("illustrations/wallet-cropped.png");
  return (
    <GenericPageBodyWithGraphic
      button={<ConnectWalletButton showAccountSetupModal={false} />}
      imgSrc={img}
      primaryText={
        "You've been invited to be a creator on Formfunction!" +
        " Sign in with your wallet to continue."
      }
    />
  );
}

export default function AcceptInvitePage() {
  const { anchorWallet } = useSolanaContext();
  const params = useParams();
  const { inviteLinkToken } = params;
  if (inviteLinkToken == null) {
    return <Page404 />;
  }

  const bodyContent =
    // Wait until wallet has had a chance to load and we have
    // fetched information about the user
    anchorWallet == null ? (
      <DisconnectedBody />
    ) : (
      <Suspense
        fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
      >
        <AcceptInviteBody inviteLinkToken={inviteLinkToken} />
      </Suspense>
    );

  return (
    <PageWithHeaderAndFooter showAccountSetupModal={false}>
      <ResponsivePageBody>{bodyContent}</ResponsivePageBody>
    </PageWithHeaderAndFooter>
  );
}
