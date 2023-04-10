import { NextFunction, Request, Response } from "express";
import isNumber from "formfn-shared/dist/utils/numbers/isNumber";
import toObject from "formfn-shared/dist/utils/toObject";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import CONVERT_SERIES_INCLUDE from "src/constants/include/ConvertSeriesInclude";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import getPrisma from "src/utils/prisma/getPrisma";

function getIncludeFromNumber(num: number) {
  switch (num) {
    case 0:
      return undefined;
    case 1:
      return CONVERT_NFT_TO_METADATA_INCLUDE;
    case 2:
      return {
        NftTransaction: {
          include: {
            From: {
              include: CONVERT_USER_INCLUDE,
            },
          },
          orderBy: NFT_TRANSACTION_ORDER_BY,
          // TODO: may want to increase this. In the beginning, shouldn't really matter
          take: 100,
        },
      };
    case 3:
      return {
        Creator: {
          include: CONVERT_USER_INCLUDE,
        },
        NftMetadata: {
          include: {
            Video_NftMetadata_videoPlaybackIdToVideo: true,
            Video_NftMetadata_videoPreviewPlaybackIdToVideo: true,
          },
        },
        NftToAttribute: {
          include: {
            Attribute: true,
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
        NftToTag: {
          include: {
            Tag: true,
          },
        },
        Owner: {
          include: CONVERT_USER_INCLUDE,
        },
        Series: {
          include: CONVERT_SERIES_INCLUDE,
        },
      };
    case 4:
      return {
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
        NftListing: true,
        NftMetadata: {
          include: {
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
      };
    case 5:
      return {
        Creator: {
          include: CONVERT_USER_INCLUDE,
        },
        NftListing: true,
        NftMetadata: {
          include: {
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
      };
    default:
      return undefined;
  }
}

export default async function loadNftEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { count, shouldInclude } = req.query;
  const countAsNumber =
    count != null && isNumber(String(count)) ? Number(count) : 10;
  const prisma = getPrisma();
  const nfts = await prisma.nft.findMany({
    include: getIncludeFromNumber(Number(shouldInclude ?? 0)),
    take: countAsNumber,
  });

  res.json({
    // converted: nfts.map((nft) => toObject(convertNftToMetadataAccount(nft))),
    nfts: toObject(nfts),
    success: true,
  });
}
