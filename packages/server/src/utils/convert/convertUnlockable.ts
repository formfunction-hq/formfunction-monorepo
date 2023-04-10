import Typename from "src/types/enums/Typename";
import { Asset, Currency, Unlockable } from "@prisma/client";
import bigintToNumber from "src/utils/bigintToNumber";
import convertAsset from "src/utils/convert/convertAsset";
import {
  UnlockableExpress,
  UnlockableCategory,
} from "src/__generated__/generated";
import convertUnlockableWinner from "src/utils/convert/convertUnlockableWinner";
import ConvertUnlockableWinnerType from "src/types/convert/ConvertUnlockableWinnerType";
import convertPrice from "src/utils/convert/convertPrice";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function convertUnlockable(
  prismaUnlockable: Unlockable & {
    Asset: Asset;
    Currency: Maybe<Currency>;
    UnlockableWinner: Array<ConvertUnlockableWinnerType>;
  }
): UnlockableExpress {
  return {
    __typename: Typename.Unlockable,
    activationPrice: convertPrice(
      bigintToNumber(prismaUnlockable.activationPriceInLamports),
      prismaUnlockable.Currency
    ),
    activationPriceInLamports: bigintToNumber(
      prismaUnlockable.activationPriceInLamports
    ),
    asset: convertAsset(prismaUnlockable.Asset),
    category: prismaUnlockable.category as UnlockableCategory,
    description: prismaUnlockable.description,
    id: prismaUnlockable.id,
    name: prismaUnlockable.name,
    timeCreated: prismaUnlockable.timeCreated,
    unlockableWinners: prismaUnlockable.UnlockableWinner.map((winner) =>
      convertUnlockableWinner(winner)
    ),
  };
}
