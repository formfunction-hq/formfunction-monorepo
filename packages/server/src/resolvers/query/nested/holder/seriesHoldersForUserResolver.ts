import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  SeriesHoldersForUserInput,
  SeriesHoldersForUserResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import CONVERT_SERIES_INCLUDE from "src/constants/include/ConvertSeriesInclude";
import groupBy from "formfn-shared/dist/utils/array/groupBy";
import ConvertUserType from "src/types/convert/ConvertUserType";
import ConvertSeriesType from "src/types/convert/ConvertSeriesType";
import { Nft } from "@prisma/client";
import convertSeries from "src/utils/convert/convertSeries";
import convertUser from "src/utils/convert/convertUser";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";

function getSeriesHoldersForNfts(
  nfts: Array<
    Nft & {
      MasterEditionNft: Maybe<Nft & { Series: Maybe<ConvertSeriesType> }>;
      Owner: ConvertUserType;
      Series: Maybe<ConvertSeriesType>;
    }
  >
) {
  const series = (nfts[0].Series ?? nfts[0].MasterEditionNft?.Series)!;

  return {
    __typename: Typename.SeriesHolders as const,
    holders: nfts.map((nft) => ({
      __typename: Typename.Holder as const,
      user: convertUser(nft.Owner),
    })),
    series: convertSeries(series)!,
  };
}

export default async function seriesHoldersForUserResolver(
  context: MyContext,
  input: SeriesHoldersForUserInput
): Promise<SeriesHoldersForUserResponse> {
  const { verifiedPublicKey } = context;
  const { userId } = input;
  const viewerId = verifiedPublicKey?.toString();
  if (verifiedPublicKey == null || userId !== viewerId) {
    // Can't see holders if you're logged out or not looking
    // at your own holders
    return {
      __typename: Typename.SeriesHoldersForUserResponse,
      seriesHolders: null,
    };
  }

  const nftsInSeries = await getPrisma().nft.findMany({
    include: {
      MasterEditionNft: {
        include: { Series: { include: CONVERT_SERIES_INCLUDE } },
      },
      Owner: { include: CONVERT_USER_INCLUDE },
      Series: { include: CONVERT_SERIES_INCLUDE },
    },
    where: {
      AND: [
        { Creator: { id: userId } },
        {
          OR: [
            {
              // Account for editions that have been purchased where only the
              // master edition NFT is part of the series. Also accounts for pNFTs
              // where the master edition pNFT is in the series.
              MasterEditionNft: { Series: { User: { id: userId } } },
            },
            {
              Series: { User: { id: userId } },
            },
          ],
        },
        { Owner: { id: { not: { equals: userId } } } },
      ],
    },
  });
  const nftsGroupedBySeries = groupBy(
    nftsInSeries,
    (nft) => (nft.seriesId ?? nft.MasterEditionNft?.seriesId)!
  );
  const seriesHolders = Object.values(nftsGroupedBySeries).map((nfts) => {
    const deduped = removeDuplicatesWithComparison(
      nfts,
      (a, b) => a.Owner.id === b.Owner.id
    );
    return getSeriesHoldersForNfts(deduped);
  });

  return {
    __typename: Typename.SeriesHoldersForUserResponse,
    seriesHolders,
  };
}
