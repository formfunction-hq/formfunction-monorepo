import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import { CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints$key } from "components/pages/campaign/campaign-v1/sections/generative-mint/__generated__/CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints.graphql";
import PriceWithSymbolText from "components/price/PriceWithSymbolText";
import Body2 from "components/text/Body2";
import useCandyMachineViewerInfo from "hooks/candy-machine/useCandyMachineViewerInfo";
import { useFragment } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import useCandyMachineMintPrice from "hooks/candy-machine/useCandyMachineMintPrice";
import useSolanaContext from "hooks/useSolanaContext";
import ConnectWalletButton from "components/buttons/ConnectWalletButton";

const campaignSectionFragment = graphql`
  fragment CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {
    candyMachineInfo(input: $candyMachineInfoInput) {
      candyMachine {
        maxSupply
        totalAmountMinted
        ...useCandyMachineMintPhase_CandyMachineExpress
        ...useCandyMachineMintPrice_CandyMachineExpress
      }
      ...useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo
    }
  }
`;

type Props = {
  campaignSection: CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints$key;
  setIsMintModalShown: (val: boolean) => void;
};

export default function CandyMachinePrimaryCta({
  campaignSection,
  setIsMintModalShown,
}: Props) {
  const { anchorWallet } = useSolanaContext();
  const campaignSectionData = useFragment(
    campaignSectionFragment,
    campaignSection
  );
  const mintPrice = useCandyMachineMintPrice(
    campaignSectionData.candyMachineInfo!.candyMachine
  );
  const { maxSupply, totalAmountMinted } =
    campaignSectionData.candyMachineInfo!.candyMachine;
  const { canMint } = useCandyMachineViewerInfo(
    campaignSectionData.candyMachineInfo!
  );

  if (canMint) {
    return (
      <>
        {anchorWallet == null ? (
          <ConnectWalletButton
            alternateSignInText="Sign in to mint"
            showAccountSetupModal={false}
          />
        ) : (
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            onClick={() => setIsMintModalShown(true)}
          >
            Mint for <PriceWithSymbolText price={mintPrice} />
          </ButtonWithText>
        )}
        <Body2 colorClass={ColorClass.Secondary}>
          {`${maxSupply - totalAmountMinted}/${maxSupply} remaining`}
        </Body2>
      </>
    );
  }

  return null;
}
