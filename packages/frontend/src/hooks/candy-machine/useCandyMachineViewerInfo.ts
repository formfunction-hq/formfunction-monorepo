/* eslint-disable relay/unused-fields */
import { CandyMachineMintPhase } from "@formfunction-hq/formfunction-candy-machine";
import graphql from "babel-plugin-relay/macro";
import RELAY_FUTURE_UNION_VALUE from "constants/RelayFutureUnionValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import useCandyMachineIsSoldOut from "hooks/candy-machine/useCandyMachineIsSoldOut";
import useCandyMachineMintPhase from "hooks/candy-machine/useCandyMachineMintPhase";
import {
  useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo$data,
  useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo$key,
} from "hooks/candy-machine/__generated__/useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo.graphql";
import { useFragment } from "react-relay";

const candyMachineInfoFragment = graphql`
  fragment useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo on CampaignSectionWithGenerativeMintsCandyMachineInfo {
    candyMachine {
      limitPerAddress
      ...useCandyMachineMintPhase_CandyMachineExpress
      ...useCandyMachineIsSoldOut_CandyMachineExpress
    }
    isViewerOmniMinter
    viewerAllowlistInfo {
      __typename
      ... on CandyMachineMerkleAllowlistInfoForViewerExpress {
        amountAllowed
        amountMinted
        merkleRootIndexForProof
        proof
      }
      ... on CandyMachineTokenAllowlistInfoForViewer {
        allowlistTokenAccount
        allowlistTokenMint
        allowlistTokenAmount
        amountMinted
      }
    }
    viewerAmountMinted
  }
`;

function getAllowlistAmountMinted(
  viewerAllowlistInfo: useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo$data["viewerAllowlistInfo"]
): number {
  if (viewerAllowlistInfo == null) {
    return 0;
  }

  switch (viewerAllowlistInfo.__typename) {
    case "CandyMachineTokenAllowlistInfoForViewer":
    case "CandyMachineMerkleAllowlistInfoForViewerExpress":
      return viewerAllowlistInfo.amountMinted;
    case RELAY_FUTURE_UNION_VALUE:
      return 0;
    default:
      return assertUnreachable(viewerAllowlistInfo);
  }
}

export default function useCandyMachineViewerInfo(
  candyMachineInfo: useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo$key
): {
  allowlistInfo?: useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo$data["viewerAllowlistInfo"];
  canMint: boolean;
  numberAvailableToMint?: number;
} {
  const candyMachineInfoData = useFragment(
    candyMachineInfoFragment,
    candyMachineInfo
  );
  const mintPhase = useCandyMachineMintPhase(candyMachineInfoData.candyMachine);
  const isSoldOut = useCandyMachineIsSoldOut(candyMachineInfoData.candyMachine);
  const {
    candyMachine: { limitPerAddress },
    isViewerOmniMinter,
    viewerAllowlistInfo,
    viewerAmountMinted,
  } = candyMachineInfoData;

  const viewerAllowlistAmountMinted =
    getAllowlistAmountMinted(viewerAllowlistInfo);
  const viewerPublicPhaseAmountMinted =
    (viewerAmountMinted ?? 0) - viewerAllowlistAmountMinted;

  if (mintPhase === CandyMachineMintPhase.Expired) {
    return { canMint: false };
  }

  if (isViewerOmniMinter) {
    return { canMint: !isSoldOut };
  }

  switch (mintPhase) {
    case CandyMachineMintPhase.Allowlist:
    case CandyMachineMintPhase.Premint: {
      if (isViewerOmniMinter) {
        return { canMint: !isSoldOut };
      }

      if (viewerAllowlistInfo == null) {
        return { canMint: false };
      }

      switch (viewerAllowlistInfo.__typename) {
        case "CandyMachineMerkleAllowlistInfoForViewerExpress": {
          const { amountAllowed, amountMinted } = viewerAllowlistInfo;
          return {
            allowlistInfo: viewerAllowlistInfo,
            canMint:
              mintPhase === CandyMachineMintPhase.Allowlist &&
              amountMinted < amountAllowed &&
              !isSoldOut,
            numberAvailableToMint: amountAllowed - amountMinted,
          };
        }
        case "CandyMachineTokenAllowlistInfoForViewer": {
          const { allowlistTokenAmount } = viewerAllowlistInfo;
          return {
            allowlistInfo: viewerAllowlistInfo,
            canMint:
              mintPhase === CandyMachineMintPhase.Allowlist &&
              allowlistTokenAmount > 0 &&
              !isSoldOut,
            numberAvailableToMint: allowlistTokenAmount,
          };
        }
        case RELAY_FUTURE_UNION_VALUE:
          return { canMint: false };
        default:
          return assertUnreachable(viewerAllowlistInfo);
      }
    }
    case CandyMachineMintPhase.Public: {
      const canMint =
        !isSoldOut &&
        viewerPublicPhaseAmountMinted <
          (limitPerAddress === 0 ? Number.MAX_SAFE_INTEGER : limitPerAddress);
      const numberAvailableToMint =
        limitPerAddress === 0
          ? undefined
          : limitPerAddress - viewerPublicPhaseAmountMinted;
      return {
        canMint,
        numberAvailableToMint,
      };
    }
    default:
      return assertUnreachable(mintPhase);
  }
}
