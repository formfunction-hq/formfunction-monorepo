import styles from "css/pages/campaign/campaign-v1/sections/generative-mint/CandyMachinePreviewAssetMarquee.module.css";
import graphql from "babel-plugin-relay/macro";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import { CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo$key } from "components/pages/campaign/campaign-v1/sections/generative-mint/__generated__/CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo.graphql";
import useCandyMachineMintPhase from "hooks/candy-machine/useCandyMachineMintPhase";
import Marquee from "react-fast-marquee";
import { useFragment } from "react-relay";
import FullViewportWidth from "components/containers/FullViewportWidth";
import { CandyMachineMintPhase } from "@formfunction-hq/formfunction-candy-machine";

const candyMachineInfoFragment = graphql`
  fragment CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo on CampaignSectionWithGenerativeMintsCandyMachineInfo {
    candyMachine {
      ...useCandyMachineMintPhase_CandyMachineExpress
    }
    premintPreviewAssets {
      ...AssetForAssetExpress_AssetExpress
    }
  }
`;

type Props = {
  candyMachineInfo: CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo$key;
};

export default function CandyMachinePreviewAssetMarquee({
  candyMachineInfo,
}: Props) {
  const candyMachineInfoData = useFragment(
    candyMachineInfoFragment,
    candyMachineInfo
  );
  const mintPhase = useCandyMachineMintPhase(candyMachineInfoData.candyMachine);
  const { premintPreviewAssets } = candyMachineInfoData;
  if (
    premintPreviewAssets == null ||
    mintPhase !== CandyMachineMintPhase.Premint
  ) {
    return null;
  }
  return (
    <FullViewportWidth>
      <Marquee className={styles.marquee} gradient={false} speed={85}>
        {/* Double up on the assets to ensure they span the entire screen width */}
        {[...premintPreviewAssets, ...premintPreviewAssets].map(
          (asset, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className={styles.premintPreviewAssetContainer}>
              <AssetForAssetExpress
                showDropShadow
                borderRadius={16}
                asset={asset}
                height={400}
                width={400}
                objectFit="cover"
              />
            </div>
          )
        )}
      </Marquee>
    </FullViewportWidth>
  );
}
