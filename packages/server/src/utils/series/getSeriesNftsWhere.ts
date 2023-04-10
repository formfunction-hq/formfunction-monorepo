import { Prisma } from "@prisma/client";
import { NftStatusExpress_Enum } from "src/__generated__/generated";

export default function getSeriesNftsWhere(
  seriesId: string
): Prisma.NftWhereInput {
  return {
    seriesId,
    status: { not: NftStatusExpress_Enum.Burned },
  };
}
