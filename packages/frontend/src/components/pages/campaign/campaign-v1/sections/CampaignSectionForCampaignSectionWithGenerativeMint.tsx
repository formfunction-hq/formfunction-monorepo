import styles from "css/pages/campaign/campaign-v1/sections/CampaignSectionForCampaignSectionWithGenerativeMint.module.css";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints$key } from "components/pages/campaign/campaign-v1/sections/__generated__/CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints.graphql";
import { useState } from "react";
import MintGenerativeSeriesModal from "components/modal/MintGenerativeSeriesModal";
import NftAsset from "components/images/NftAsset";
import NftAssetSize from "types/enums/NftAssetSize";
import CandyMachineInfo from "components/pages/campaign/campaign-v1/sections/generative-mint/CandyMachineInfo";
import CandyMachinePreviewAssetMarquee from "components/pages/campaign/campaign-v1/sections/generative-mint/CandyMachinePreviewAssetMarquee";
import CandyMachineMetadataAccounts from "components/pages/campaign/campaign-v1/sections/generative-mint/CandyMachineMetadataAccounts";
import CandyMachinePrimaryCta from "components/pages/campaign/campaign-v1/sections/generative-mint/CandyMachinePrimaryCta";
import CandyMachineSeeAllButton from "components/pages/campaign/campaign-v1/sections/generative-mint/CandyMachineSeeAllButton";
import HideIfEmpty from "components/containers/HideIfEmpty";
import NftAssetQuestionMark from "components/images/NftAssetQuestionMark";
import useAreCandyMachineNftsShown from "hooks/candy-machine/useAreCandyMachineNftsShown";
import useCandyMachineIsSoldOut from "hooks/candy-machine/useCandyMachineIsSoldOut";
import useCandyMachineMintPhase from "hooks/candy-machine/useCandyMachineMintPhase";
import { CandyMachineMintPhase } from "@formfunction-hq/formfunction-candy-machine";

const campaignSectionFragment = graphql`
  fragment CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {
    title
    id
    candyMachineInfo(input: $candyMachineInfoInput) {
      candyMachine {
        ...CandyMachineSeeAllButton_CandyMachineExpress
        ...useCandyMachineIsSoldOut_CandyMachineExpress
        ...useCandyMachineMintPhase_CandyMachineExpress
      }
      mintPreviewAsset {
        contentType
        downloadUrl
      }

      ...CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo
      ...MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo
    }

    metadataAccountsForSection: previewMetadataAccounts(
      first: $firstForSections
    ) {
      __id
      edges {
        __typename
      }
    }

    ...CandyMachineInfo_CampaignSectionWithGenerativeMints
    ...CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints
    ...CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints
    ...useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints
  }
`;

type Props = {
  campaignSection: CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints$key;
};

export default function CampaignSectionForCampaignSectionWithGenerativeMint({
  campaignSection,
}: Props) {
  const [isMintModalShown, setIsMintModalShown] = useState(false);
  const campaignSectionData = useFragment(
    campaignSectionFragment,
    campaignSection
  );
  const showNfts = useAreCandyMachineNftsShown(campaignSectionData);
  const { id, title, candyMachineInfo, metadataAccountsForSection } =
    campaignSectionData;
  const { candyMachine } = candyMachineInfo!;
  const { mintPreviewAsset } = candyMachineInfo!;
  const isSoldOut = useCandyMachineIsSoldOut(candyMachine);
  const mintPhase = useCandyMachineMintPhase(candyMachine);
  const soldOutOrExpired =
    isSoldOut || mintPhase === CandyMachineMintPhase.Expired;

  const numNfts = metadataAccountsForSection?.edges.length ?? 0;
  const seeAllButton =
    numNfts > 0 ? (
      <CandyMachineSeeAllButton candyMachine={candyMachine} />
    ) : null;

  return (
    <>
      <MintGenerativeSeriesModal
        connectionId={metadataAccountsForSection?.__id ?? ""}
        title={title}
        candyMachineInfo={candyMachineInfo!}
        isShown={isMintModalShown}
        onHide={() => setIsMintModalShown(false)}
        previewImageAsset={
          mintPreviewAsset == null ? (
            <NftAssetQuestionMark size={NftAssetSize.Size320} />
          ) : (
            <NftAsset
              showShimmer={false}
              contentType={mintPreviewAsset.contentType}
              assetSrc={mintPreviewAsset.downloadUrl}
              size={NftAssetSize.Size320}
            />
          )
        }
      />
      <div id={id}>
        <div className={styles.body}>
          <CandyMachineInfo campaignSection={campaignSectionData} />
          <CandyMachinePrimaryCta
            campaignSection={campaignSectionData}
            setIsMintModalShown={setIsMintModalShown}
          />
        </div>
        <HideIfEmpty>
          {soldOutOrExpired && (
            <HideIfEmpty className={styles.seeAllButtonTop}>
              {seeAllButton}
            </HideIfEmpty>
          )}
          <div className={styles.nftsContainer}>
            <CandyMachineMetadataAccounts
              campaignSection={campaignSectionData}
            />
          </div>
          {!soldOutOrExpired && (
            <HideIfEmpty className={styles.seeAllButtonBottom}>
              {seeAllButton}
            </HideIfEmpty>
          )}
        </HideIfEmpty>
        {!showNfts && (
          <HideIfEmpty className={styles.marqueeContainer}>
            <CandyMachinePreviewAssetMarquee
              candyMachineInfo={campaignSectionData.candyMachineInfo!}
            />
          </HideIfEmpty>
        )}
      </div>
    </>
  );
}
