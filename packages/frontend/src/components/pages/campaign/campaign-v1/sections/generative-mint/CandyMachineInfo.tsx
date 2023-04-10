import styles from "css/pages/campaign/campaign-v1/sections/generative-mint/CandyMachineInfo.module.css";
import graphql from "babel-plugin-relay/macro";
import CandyMachineSaleDate from "components/pages/campaign/campaign-v1/sections/generative-mint/CandyMachineSaleDate";
import { CandyMachineInfo_CampaignSectionWithGenerativeMints$key } from "components/pages/campaign/campaign-v1/sections/generative-mint/__generated__/CandyMachineInfo_CampaignSectionWithGenerativeMints.graphql";
import Body1 from "components/text/Body1";
import Body1Medium from "components/text/Body1Medium";
import Header3 from "components/text/Header3";
import TinyLabel from "components/text/TinyLabel";
import HUMAN_READABLE_MINT_PHASE from "constants/HumanReadableMintPhase";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import useCandyMachineMintPhase from "hooks/candy-machine/useCandyMachineMintPhase";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import useCandyMachineViewerInfo from "hooks/candy-machine/useCandyMachineViewerInfo";
import useUserContext from "hooks/useUserContext";
import pluralize from "formfn-shared/dist/utils/pluralize";
import { CandyMachineMintPhase } from "@formfunction-hq/formfunction-candy-machine";
import useCandyMachineIsSoldOut from "hooks/candy-machine/useCandyMachineIsSoldOut";

const campaignSectionFragment = graphql`
  fragment CandyMachineInfo_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {
    description
    title
    candyMachineInfo(input: $candyMachineInfoInput) {
      candyMachine {
        allowlistSaleStartTime
        limitPerAddress
        publicSaleStartTime
        omniMintWallets

        ...useCandyMachineMintPhase_CandyMachineExpress
        ...useCandyMachineIsSoldOut_CandyMachineExpress
      }
      ...useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo
    }
  }
`;

function getAllowlistTooltipText(
  isUserLoggedIn: boolean,
  isUserOmniMinter: boolean,
  mintPhase: CandyMachineMintPhase,
  viewerInfo: ReturnType<typeof useCandyMachineViewerInfo>
) {
  if (isUserOmniMinter || mintPhase === CandyMachineMintPhase.Public) {
    return null;
  }

  if (!isUserLoggedIn) {
    return "Please sign in to see if you are on the allowlist";
  }

  if (viewerInfo.allowlistInfo == null) {
    return "You are not on the allowlist, please wait for the public sale";
  }

  const { numberAvailableToMint = 0 } = viewerInfo;
  if (numberAvailableToMint > 0) {
    const nftsPluralized = pluralize("NFT", numberAvailableToMint);
    if (mintPhase === CandyMachineMintPhase.Premint) {
      return `You are on the allowlist, and can mint up to ${numberAvailableToMint} ${nftsPluralized} once the allowlist phase begins!`;
    }
    return `You are on the allowlist, and can mint up to ${numberAvailableToMint} ${nftsPluralized}!`;
  }

  return "You have already used all your allotted allowlist mints";
}

function getLimitPerAddressTooltipText(
  mintPhase: CandyMachineMintPhase,
  isUserOmniMinter: boolean,
  limitPerAddress: number,
  numberAvailableToMint?: number
) {
  if (
    isUserOmniMinter ||
    limitPerAddress === 0 ||
    numberAvailableToMint === undefined ||
    mintPhase !== CandyMachineMintPhase.Public
  ) {
    return null;
  }

  if (numberAvailableToMint === 0 && limitPerAddress > 0) {
    return "You have already minted all of your allowed public sale mints";
  }

  return `You can mint up to ${numberAvailableToMint} ${pluralize(
    "NFT",
    numberAvailableToMint
  )} in the public sale`;
}

type Props = {
  campaignSection: CandyMachineInfo_CampaignSectionWithGenerativeMints$key;
};

export default function CandyMachineInfo({ campaignSection }: Props) {
  const { user } = useUserContext();
  const campaignSectionData = useFragment(
    campaignSectionFragment,
    campaignSection
  );
  const { candyMachine } = campaignSectionData.candyMachineInfo!;
  const mintPhase = useCandyMachineMintPhase(candyMachine);
  const isSoldOut = useCandyMachineIsSoldOut(candyMachine);
  const { title, description, candyMachineInfo } = campaignSectionData;
  const viewerInfo = useCandyMachineViewerInfo(candyMachineInfo!);
  const {
    candyMachine: {
      omniMintWallets,
      allowlistSaleStartTime,
      limitPerAddress,
      publicSaleStartTime,
    },
  } = candyMachineInfo!;
  const allowlistSaleStartTimeDayjs =
    allowlistSaleStartTime != null ? dayjs(allowlistSaleStartTime) : null;
  const publicSaleStartTimeDayjs = dayjs(publicSaleStartTime);

  const isUserOmniMinter = omniMintWallets.some((val) => val === user?.id);

  const titleAndDescription = (
    <>
      <Header3 colorClass={ColorClass.Primary}>{title}</Header3>
      <div className={styles.candyMachineSpecifications}>
        <Body1Medium textAlign="center" colorClass={ColorClass.Primary}>
          Description
        </Body1Medium>
        <Body1 colorClass={ColorClass.Primary}>{description}</Body1>
      </div>
    </>
  );

  if (isSoldOut) {
    return (
      <>
        <TinyLabel textTransform="uppercase" colorClass={ColorClass.Secondary}>
          Status: Sold Out
        </TinyLabel>
        {titleAndDescription}
      </>
    );
  }

  const labelForPhase = (
    <TinyLabel textTransform="uppercase" colorClass={ColorClass.Secondary}>
      {HUMAN_READABLE_MINT_PHASE[mintPhase]}
    </TinyLabel>
  );

  switch (mintPhase) {
    case CandyMachineMintPhase.Premint:
    case CandyMachineMintPhase.Allowlist:
    case CandyMachineMintPhase.Public:
      return (
        <>
          {labelForPhase}
          <Header3 colorClass={ColorClass.Primary}>{title}</Header3>
          <div className={styles.candyMachineSpecifications}>
            {allowlistSaleStartTimeDayjs != null && (
              <CandyMachineSaleDate
                label="Allowlist sale"
                date={allowlistSaleStartTimeDayjs}
                tooltip={getAllowlistTooltipText(
                  user != null,
                  isUserOmniMinter,
                  mintPhase,
                  viewerInfo
                )}
              />
            )}
            <CandyMachineSaleDate
              label="Public sale"
              date={publicSaleStartTimeDayjs}
              tooltip={getLimitPerAddressTooltipText(
                mintPhase,
                isUserOmniMinter,
                limitPerAddress,
                viewerInfo.numberAvailableToMint
              )}
            />
          </div>
        </>
      );
    case CandyMachineMintPhase.Expired:
      return (
        <>
          {labelForPhase}
          {titleAndDescription}
        </>
      );
    default:
      return assertUnreachable(mintPhase);
  }
}
