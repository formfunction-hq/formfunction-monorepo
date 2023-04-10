import { Prisma } from "@prisma/client";
import CONVERT_CANDY_MACHINE_INCLUDE from "src/constants/include/ConvertCandyMachineInclude";
import CONVERT_SERIES_INCLUDE from "src/constants/include/ConvertSeriesInclude";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

const CONVERT_NFT_TO_METADATA_INCLUDE = {
  Creator: {
    include: CONVERT_USER_INCLUDE,
  },
  MasterEditionNft: {
    include: {
      NftToCollaborator: {
        include: {
          Request: true,
          User: {
            include: CONVERT_USER_INCLUDE,
          },
        },
      },
    },
  },
  NftDisclosure: true,
  NftListing: {
    include: {
      Currency: true,
      Unlockable: {
        include: {
          Asset: true,
          Currency: true,
          UnlockableWinner: {
            include: {
              User: {
                include: CONVERT_USER_INCLUDE,
              },
            },
          },
        },
      },
    },
  },
  NftMetadata: {
    include: {
      NonstandardAsset: true,
      Video_NftMetadata_videoPlaybackIdToVideo: true,
      Video_NftMetadata_videoPreviewPlaybackIdToVideo: true,
    },
  },
  NftToCollaborator: {
    include: {
      Request: true,
      User: {
        include: CONVERT_USER_INCLUDE,
      },
    },
  },
  Owner: {
    include: CONVERT_USER_INCLUDE,
  },
  PriceLastSoldCurrency: true,
  Series: {
    include: {
      CandyMachine: {
        include: CONVERT_CANDY_MACHINE_INCLUDE,
      },
      ...CONVERT_SERIES_INCLUDE,
    },
  },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.NftInclude;

export default CONVERT_NFT_TO_METADATA_INCLUDE;
