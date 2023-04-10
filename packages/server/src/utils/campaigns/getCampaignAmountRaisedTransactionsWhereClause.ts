import { Prisma } from "@prisma/client";
import { CampaignConfig } from "formfn-shared/dist/types/CampaignsConfig";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

export default function getCampaignAmountRaisedTransactionsWhereClause(
  campaignConfig: CampaignConfig
) {
  const nftMints = campaignConfig.sections.reduce(
    (acc: Array<string>, currVal) => [...acc, ...currVal.nftMints],
    []
  );
  const candyMachineIds = campaignConfig.sections
    .filter((section) => section.candyMachineId != null)
    .map(({ candyMachineId }) => candyMachineId as string);

  const where: Prisma.NftTransactionFindManyArgs["where"] = {
    OR: [
      {
        mint: {
          in: nftMints,
        },
        type: {
          in: [
            NftTransactionTypeExpress_Enum.Sold,
            NftTransactionTypeExpress_Enum.SoldAcceptedOffer,
            NftTransactionTypeExpress_Enum.SoldInstantSale,
          ],
        },
      },
      {
        Nft: {
          masterEditionMint: {
            in: nftMints,
          },
        },
        type: NftTransactionTypeExpress_Enum.SoldEditionPrimary,
      },
      ...candyMachineIds.map((candyMachineId) => ({
        Nft: { Series: { CandyMachine: { id: candyMachineId } } },
        type: NftTransactionTypeExpress_Enum.SoldGenerativeMint,
      })),
    ],
    // We only want primary sales
    auctionCount: 0,
  };

  return where;
}
