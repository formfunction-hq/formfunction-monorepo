import {
  Asset,
  Currency,
  Nft,
  NftDisclosure,
  NftListing,
  NftMetadata,
  NftToCollaborator,
  Request,
  Unlockable,
  Video,
} from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertCandyMachineType from "src/types/convert/ConvertCandyMachineType";
import ConvertSeriesType from "src/types/convert/ConvertSeriesType";
import ConvertUnlockableWinnerType from "src/types/convert/ConvertUnlockableWinnerType";
import ConvertUserType from "src/types/convert/ConvertUserType";

type ConvertNftToMetadataAccountType = Nft & {
  Creator: ConvertUserType;
  MasterEditionNft: Maybe<
    Nft & {
      NftToCollaborator: Array<
        NftToCollaborator & {
          Request: Maybe<Request>;
          User: ConvertUserType;
        }
      >;
    }
  >;
  NftDisclosure: Array<NftDisclosure>;
  NftListing: Maybe<
    NftListing & {
      Currency: Currency;
      Unlockable: Maybe<
        Unlockable & {
          Asset: Asset;
          Currency: Maybe<Currency>;
          UnlockableWinner: Array<ConvertUnlockableWinnerType>;
        }
      >;
    }
  >;
  NftMetadata: NftMetadata & {
    NonstandardAsset: Maybe<Asset>;
    Video_NftMetadata_videoPlaybackIdToVideo: Maybe<Video>;
    Video_NftMetadata_videoPreviewPlaybackIdToVideo: Maybe<Video>;
  };
  NftToCollaborator: Array<
    NftToCollaborator & {
      Request: Maybe<Request>;
      User: ConvertUserType;
    }
  >;
  Owner: ConvertUserType;
  PriceLastSoldCurrency: Maybe<Currency>;
  Series: Maybe<
    ConvertSeriesType & {
      CandyMachine: Maybe<ConvertCandyMachineType>;
    }
  >;
};

export default ConvertNftToMetadataAccountType;
