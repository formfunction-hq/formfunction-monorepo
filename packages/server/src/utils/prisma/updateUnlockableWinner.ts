import {
  Prisma,
  Asset,
  Nft,
  NftListing,
  NftMetadata,
  Unlockable,
  UnlockableWinner,
  User,
} from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import ConvertUserType from "src/types/convert/ConvertUserType";
import getPrisma from "src/utils/prisma/getPrisma";

export type UpdateUnlockableWinnerPrismaResult = UnlockableWinner & {
  Unlockable: Unlockable & {
    Asset: Asset;
    NftListing: Maybe<
      NftListing & {
        Nft_NftToNftListing_nftId: Nft & {
          Creator: User;
          NftMetadata: NftMetadata;
        };
      }
    >;
  };
  User: ConvertUserType;
};

export default async function updateUnlockableWinner({
  data,
  unlockableId,
  unlockableWinnerUserId,
}: {
  data: Prisma.UnlockableWinnerUpdateArgs["data"];
  unlockableId: string;
  unlockableWinnerUserId: string;
}): Promise<UpdateUnlockableWinnerPrismaResult> {
  return getPrisma().unlockableWinner.update({
    data,
    include: {
      Unlockable: {
        include: {
          Asset: true,
          NftListing: {
            include: {
              Nft_NftToNftListing_nftId: {
                include: {
                  Creator: true,
                  NftMetadata: true,
                },
              },
            },
          },
        },
      },
      User: {
        include: CONVERT_USER_INCLUDE,
      },
    },
    where: {
      unlockableId_userId: {
        unlockableId,
        userId: unlockableWinnerUserId,
      },
    },
  });
}
