import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CampaignSectionWithGenerativeMintsCandyMachineInfo,
  CampaignSectionWithGenerativeMintsCandyMachineInfoInput,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import CONVERT_CANDY_MACHINE_INCLUDE from "src/constants/include/ConvertCandyMachineInclude";
import convertCandyMachine from "src/utils/convert/convertCandyMachine";
import convertCandyMachineMerkleAllowlistInfo from "src/utils/convert/convertCandyMachineMerkleAllowlistInfo";
import convertAsset from "src/utils/convert/convertAsset";
import { Prisma, CandyMachine } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { PublicKey } from "@solana/web3.js";
import getConnection from "src/utils/solana/getConnection";
import getViewerId from "src/utils/auth/getViewerId";

async function getTokenAllowlistInfo(
  viewerId: Maybe<string>,
  candyMachine: CandyMachine,
  totalMintedInAllowlistPhase: number
) {
  if (viewerId == null || candyMachine.allowlistTokenMint == null) {
    return null;
  }

  // We use getParsedTokenAccountsByOwner b/c it is possible (although unlikely)
  // that a token account other than the ATA holds allowlist tokens.
  const tokenAccounts = await getConnection().getParsedTokenAccountsByOwner(
    new PublicKey(viewerId),
    { mint: new PublicKey(candyMachine.allowlistTokenMint) }
  );
  const amount = tokenAccounts.value.reduce(
    (acc, currVal) =>
      acc + Number(currVal.account.data.parsed.info.tokenAmount.amount),
    0
  );
  const tokenAccount = tokenAccounts.value.find(
    (val) => Number(val.account.data.parsed.info.tokenAmount.amount) > 0
  );

  if (tokenAccounts.value.length === 0) {
    return null;
  }

  return {
    __typename: Typename.CandyMachineTokenAllowlistInfoForViewer as const,
    allowlistTokenAccount: tokenAccount?.pubkey.toString(),
    allowlistTokenAmount: amount,
    allowlistTokenMint: candyMachine.allowlistTokenMint,
    amountMinted: totalMintedInAllowlistPhase,
  };
}

export default async function candyMachineInfoForCampaignSectionResolver(
  input: CampaignSectionWithGenerativeMintsCandyMachineInfoInput,
  context: MyContext,
  candyMachineId: string
): Promise<CampaignSectionWithGenerativeMintsCandyMachineInfo> {
  const prisma = getPrisma();
  const viewerId = getViewerId(context, input.viewerId);
  const [candyMachine, candyMachineMerkleAllowlistInfo, premintPreviewAssets] =
    await Promise.all([
      prisma.candyMachine.findUnique({
        include: CONVERT_CANDY_MACHINE_INCLUDE,
        where: { id: candyMachineId },
      }),
      viewerId != null
        ? prisma.candyMachineMerkleAllowlistInfo.findUnique({
            where: {
              userId_candyMachineId: {
                candyMachineId,
                userId: viewerId.toString() ?? "",
              },
            },
          })
        : null,

      prisma.asset.findMany({
        where: { PremintPreviewAssetCandyMachine: { id: candyMachineId } },
      }),
    ]);

  if (candyMachine == null) {
    throw new Error(`CandyMachine with id: ${candyMachineId} does not exist!`);
  }

  const { allowlistSaleStartTime, publicSaleStartTime } = candyMachine;
  const nftTransactionWhereClause: Prisma.NftTransactionWhereInput = {
    Nft: { Series: { CandyMachine: { id: candyMachineId } } },
    To: { id: viewerId?.toString() },
    type: NftTransactionTypeExpress_Enum.SoldGenerativeMint,
  };
  const [totalMintedInAllowlistPhase, totalMintedInPublicPhase] =
    await Promise.all([
      viewerId != null && allowlistSaleStartTime != null
        ? prisma.nftTransaction.count({
            where: {
              ...nftTransactionWhereClause,
              timeCreated: {
                gte: allowlistSaleStartTime,
                lt: publicSaleStartTime,
              },
            },
          })
        : 0,
      viewerId != null
        ? prisma.nftTransaction.count({
            where: {
              ...nftTransactionWhereClause,
              timeCreated: {
                gte: publicSaleStartTime,
              },
            },
          })
        : 0,
    ]);

  const totalMintedByViewer =
    totalMintedInAllowlistPhase + totalMintedInPublicPhase;

  const merkleAllowlistInfo = convertCandyMachineMerkleAllowlistInfo(
    candyMachineMerkleAllowlistInfo,
    totalMintedInAllowlistPhase
  );
  const tokenAllowlistInfo = await getTokenAllowlistInfo(
    viewerId ?? null,
    candyMachine,
    totalMintedInAllowlistPhase
  );

  return {
    __typename: Typename.CampaignSectionWithGenerativeMintCandyMachineInfo,
    candyMachine: convertCandyMachine(candyMachine),
    id: `${candyMachine.id}-info`,
    isViewerOmniMinter:
      viewerId != null
        ? (candyMachine.omniMintWallets as Array<string>).includes(
            viewerId.toString()
          )
        : null,
    mintPreviewAsset:
      candyMachine.MintPreviewAsset != null
        ? convertAsset(candyMachine.MintPreviewAsset)
        : null,
    premintPreviewAssets: premintPreviewAssets.map(convertAsset),
    viewerAllowlistInfo: merkleAllowlistInfo ?? tokenAllowlistInfo,
    viewerAmountMinted: viewerId != null ? totalMintedByViewer : null,
  };
}
